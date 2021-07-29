const { MongoClient } = require('mongodb');
const { dbConfig } = require("../../mainConfig/db.config");
let database = null;
let connection = null;
async function StartDatabase() {
    // if (flag == 001) { 
    // Recognaize where to connect - flags are better than passing dbNames along 
    // define flags in the config file and follow standards 

    try {
        const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.NAME}`;
        connection = await MongoClient.connect(dbUrl, { useUnifiedTopology: true }, { useNewUrlParser: true });
        database = connection.db();
    } catch (error) {
        console.log("Failed to Start Connection \n Error: " + error);
    }

}
async function GetDatabase() {
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
    CloseConnection
};
