const { GetDatabase } = require("../../../../../mongoDB/containerFiles/mongo");


async function MakeSales(prooducts) {
    let inventoryShortage = "لايـوجدأمتـار تكفي في المستودع";

    try {
        let loopResult = prooducts.productCode.forEach(async (code, index) => {
            let meters = await prooducts.metersSold[index];
            if (await CheckMetersAvailability(await code, await meters)) {
                return true;
            } else {
                return inventoryShortage;
            }
        })

        return loopResult;


        //console.log ("INSIDE MAIN:::: " + retrievedProduct);

        //CheckMetersAvailability (retrievedProduct, products)
    } catch (error) {
        console.error("Could not extract information from object \n" + error);
    }

}

async function RetrieveInfo(element) {
    let database = await GetDatabase();
    await element.toString().toUpperCase()
    console.log("HERE!!!!!!");
    let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find({ _id: element }).toArray();
    console.log(numCursorFromDB);
    return numCursorFromDB;
}

async function CheckMetersAvailability(productCode, metersBought) {

    try {
        let productInfo = await RetrieveInfo(productCode);
        console.log("METERS AVAILABLKE ARE:::: " + productInfo[0].Number_Of_Meters);


        if (productInfo[0].Number_Of_Meters > metersBought && productInfo[0].Number_Of_Meters > 0) {

            console.log("GOOD!!!!!!!!!!!!");

            if (await DeductMeters(productInfo[0].Number_Of_Meters, metersBought, productCode));

            return true;
        } else {
            console.log("NOPE!!!!!!!!!!!");
            return false;
        }
    } catch (error) {
        console.error("Could not check product availability " + error);
    }

}


async function DeductMeters(available, bought, productCode) {
    let database = await GetDatabase();
    let newAvailable = await available - bought;
    let updateResult = await database.collection(`${dbConfig.PRODUCTS}`).updateOne({ _id: productCode }, { $set: { "Number_Of_Meters": newAvailable } });
    console.log("Update Result is::::: " + updateResult);
    return true;
}

module.exports = { MakeSales };