const { GetDatabase } = require("../../../../../mongoDB/containerFiles/mongo");
const { GenerateRecipt } = require("./generate-recipt");

let items = [];

async function MakeSales(products) {
    //const inventoryShortage = "لايـوجدأمتـار تكفي في المستودع للقطـعه ";
    let i = 0;
    let productInfo = [];
    let iterations = products.productCode.length;
    try {
        for (i; i < iterations; i++) {
            PrepareReciptParams(products.productCode [i], products.metersBought[i], products.meterPrice[i], iterations,counter);
        }

      //  return inventoryShortage + products.productCode[i];

    } catch (error) {
        console.error("Could not extract information from object \n" + error);
    }

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