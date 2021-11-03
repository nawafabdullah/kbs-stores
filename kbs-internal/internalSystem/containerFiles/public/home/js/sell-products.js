const {GetDatabase} = require ("../../../../../mongoDB/containerFiles/mongo");
async function Sales(prooducts){

    let database = await GetDatabase();
    let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find().sort({ Entry_Date: -1 }).limit(1).toArray();

}




