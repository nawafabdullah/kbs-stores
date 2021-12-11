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
            PrepareReciptParams(await products.productCode[i], await products.metersSold[i], await products.meterPrice[i], iterations, i);
        }
        return true;
        //  return inventoryShortage + products.productCode[i];

    } catch (error) {
        console.error("Could not extract information from object \n" + error);
    }

}

/*
async function CalculateVAT(price, metersBought) {
    try {
        let productPrice = await price*metersBought;

        const taxPercentage = 0.15;
        let totalPrice = (productPrice * taxPercentage);        
        //return totalPrice;

        return 0.15;
    }
    catch (error) {
        console.error("Could not calculate price");
        return false;
    }
}

*/

async function GetReciptNumber() {
    let database = await GetDatabase();
    let numCursorFromDB = await database.collection(`${dbConfig.SALES}`).find().sort({ _id: -1 }).limit(1).toArray();

    numCode = await parseInt(numCursorFromDB[0]._id);
    let numCodeAdded = numCode + 1;

    console.log("RECIPTTTTT::::: " + await numCodeAdded);
    return numCodeAdded;
}

async function PrepareReciptParams(productCode, metersBought, price, iterations, counter) {
    items[counter] = {
        description: productCode,
        quantity: metersBought,
        price: price,
        tax: 15
    }
    if (counter == (iterations - 1)) {
        let invoiceData = {
            invoiceNumber: await GetReciptNumber(),
            items: items
        }
        console.log(invoiceData);
        GenerateRecipt(invoiceData);
    }


    return true;


}
module.exports = { MakeSales };