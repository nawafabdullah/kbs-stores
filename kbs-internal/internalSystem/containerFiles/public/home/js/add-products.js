const { GetDatabase } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');

function InsertCompany(companyObj) {

    let companyName = companyObj.name;
    let companyOrgin = companyObj.orgin;
    let companyCode;

    let database = GetDatabase();
    const { insertedId } = await database.collection(dbConfig.PRODUCTS_COMPANIES).find().sort({ age: -1 }).limit(1)





    return companyCode;

}