const { MongoClient } = require('mongodb');
const { dbConfig } = require('../../mainConfig/db.config');
let database = null;
let connection = null;
async function StartDatabase(dbName) {
    const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/${dbName}`;
    connection = await MongoClient.connect(dbUrl,{ useUnifiedTopology: true }, { useNewUrlParser: true });
    database = connection.db();
}

async function GetDatabase(dbName) {
    if (!database) await StartDatabase(dbName);
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