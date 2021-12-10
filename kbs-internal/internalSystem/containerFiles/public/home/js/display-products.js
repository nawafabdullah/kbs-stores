const {GetDatabase} = require ("../../../../../mongoDB/containerFiles/mongo");

async function DisplayProducts() {
    let database;
    database = await GetDatabase();
    let products = await database.collection(`${dbConfig.PRODUCTS}`).find({  }).toArray();
        //   console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
        console.log("PRINTING::::::::" + products[1]);
        //   console.log("LETTER CODE::::::::::::::::: " + returnedLetterCode);
        return products;
    }

    module.exports = {DisplayProducts};