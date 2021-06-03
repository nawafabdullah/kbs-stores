const { MongoClient } = require('mongodb');
const { dbConfig } = require("../../mainConfig/db.config");
let database = null;
let connection = null;
async function StartDatabase(flag) {
    // if (flag == 000) { 
    // Recognaize where to connect - flags are better than passing dbNames along 
    // define flags in the config file and follow standards 
    const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.NAME}`;
    connection = await MongoClient.connect(dbUrl, { useUnifiedTopology: true }, { useNewUrlParser: true });
    database = connection.db();
}

async function GetDatabase(flag) {
    if (!database) await StartDatabase();
    return database;
}

async function CloseConnection() {
    if (!connection) {
        console.log("No Active Connections");
        return;
    }
    console.log("closing connection...");
    connection.close();
}

module.exports = {
    GetDatabase,
    StartDatabase,
    CloseConnection
};