const { GetDatabase } = require("../../../../../mongoDB/containerFiles/mongo");
const { GenerateRecipt } = require("./generate-recipt");

let items = [];

async function MakeSales(products) {
    const inventoryShortage = "لايـوجدأمتـار تكفي في المستودع للقطـعه ";
    let i = 0;
    let productInfo = [];
    let iterations = products.productCode.length;
    try {
        for (i; i < iterations; i++) {
            productInfo[i] = await RetrieveInfo(products.productCode[i]);
            if (await CheckMetersAvailability(await productInfo[i].Number_Of_Meters, await products.metersSold[i])) {
                console.log("GOOD!!!!!!!!!!!!");
                if (i == (iterations - 1)) {
                    console.log("Checked All Availabilities!!!!!!!!");
                    for (let j = 0; j < iterations; j++) {
                        await DeductMeters(await productInfo[j].Number_Of_Meters, await products.metersSold[j], await products.productCode[j], productInfo[j].Price, iterations, j);
                    }
                    return true;
                }

            } else {
                console.log(inventoryShortage);
                break;
            }

        }

        return inventoryShortage + products.productCode[i];

    } catch (error) {
        console.error("Could not extract information from object \n" + error);
    }

}

async function RetrieveInfo(element) {

    try {
        let database = await GetDatabase();
        await element.toString().toUpperCase()
        console.log("HERE!!!!!! " + element);
        let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find({ _id: element }).toArray();
        console.log("RETRIVED FROM DB: " + numCursorFromDB[0]);
        return numCursorFromDB[0];
    } catch (error) {
        console.error("Could not retrieve object \n" + error);
        return false;
    }
}

async function CheckMetersAvailability(metersAvailable, metersBought) {
    try {
        //console.log("METERS AVAILABLKE ARE:::: " + productInfo[0].Number_Of_Meters);

        if (metersAvailable >= metersBought && metersAvailable > 0) {
            return true;
        } else {
            console.log("NOPE!!!!!!!!!!!");
            return false;
        }
    } catch (error) {
        console.error("Could not check product availability " + error);
    }

}


async function DeductMeters(available, metersBought, productCode, price, iterations, counter) {
    let database = await GetDatabase();
    let newAvailable = await available - metersBought;
    let updateResult = await database.collection(`${dbConfig.PRODUCTS}`).updateOne({ _id: productCode }, { $set: { "Number_Of_Meters": newAvailable } });
    //console.log("Update Result is::::: " + updateResult);

    PrepareReciptParams(productCode, metersBought, price, iterations,counter);
    return true;
}


async function CalculateVAT(price, metersBought) {
    try {
        console.log(" The price for the product is::: " + price * metersBought);
        return (price * metersBought) * 0.15;
    }
    catch (error) {
        console.error("Could not calculate price");
        return false;
    }
}


async function GetReciptNumber() {
    let database = await GetDatabase();
    let codeCursorFromDB = await database.collection(`${dbConfig.SALES}`).find().sort({ Entry_Date: -1 }).limit(1).toArray();
    let numCode = await codeCursorFromDB[0]._id.toString().substr(2);
    numCode = await parseInt(numCode);
    let numCodeAdded = numCode + 1;

    console.log ("RECIPTTTTT::::: " + await numCodeAdded);
    return (numCodeAdded);
}

async function PrepareReciptParams(productCode, metersBought, price, iterations, counter) {
    items[counter] = {
        description: productCode,
        quantity: metersBought,
        price: price,
        tax: await CalculateVAT(price, metersBought)
    }
    if (counter == (iterations - 1)) {
        let invoiceData = {
            invoiceNumber: await GetReciptNumber(),
            items: items
        }
        console.log (invoiceData);
        GenerateRecipt(invoiceData);
    }
   
    
    return true;
    

}
module.exports = { MakeSales };