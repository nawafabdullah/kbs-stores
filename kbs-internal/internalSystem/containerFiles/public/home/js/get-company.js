const {
    GetDatabase,
    CloseConnection,
} = require("../../../../../mongoDB/containerFiles/mongo");
const { dbConfig } = require("../../../../../mainConfig/db.config");
const {
    Fabric,
} = require("../../../../../mongoDB/containerFiles/Models/fabric-model");


async function GetACompany(_id) {
    let database = await GetDatabase();
    let codeCursorFromDB = await database.collection(`${dbConfig.COMPANIES}`).find({ _id: _id }).sort({ Entry_Date: -1 }).toArray();
    return codeCursorFromDB;
}

module.exports = { GetACompany };