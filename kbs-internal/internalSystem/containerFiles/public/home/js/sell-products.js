const { GetDatabase } = require("../../../../../mongoDB/containerFiles/mongo");


async function MakeSales(products) {
    const inventoryShortage = "لايـوجدأمتـار تكفي في المستودع للقطـعه ";
    let i = 0;
    let productInfo = [];
    try {
        for (i; i < products.productCode.length; i++) {
            productInfo[i] = await RetrieveInfo(products.productCode[i]);
            if (await CheckMetersAvailability(await productInfo[i].Number_Of_Meters, await products.metersSold[i])) {
                console.log("GOOD!!!!!!!!!!!!");
                if (i == (products.productCode.length - 1)) {
                    console.log ("Checked All Availabilities!!!!!!!!");
                    for (let j = 0; j < products.productCode.length; j++) {
                        await DeductMeters(await productInfo[j].Number_Of_Meters, await products.metersSold[j], await products.productCode[j]);
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


async function DeductMeters(available, metersBought, productCode) {
    let database = await GetDatabase();
    let newAvailable = await available - metersBought;
    let updateResult = await database.collection(`${dbConfig.PRODUCTS}`).updateOne({ _id: productCode }, { $set: { "Number_Of_Meters": newAvailable } });
    console.log("Update Result is::::: " + updateResult);
    return true;
}


async function CalculatePrice(price, metersBought) {
    try {
        console.log(" The price for the product is::: " + price * metersBought);
        return true;
    }
    catch (error) {
        console.error("Could not calculate price");
        return false;
    }
}

module.exports = { MakeSales };