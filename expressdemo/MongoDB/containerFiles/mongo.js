const { MongoClient } = require('mongodb');
const { dbConfig } = require '../';
let database = null;

async function startDatabase() {
    const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;
    const connection = await MongoClient.connect(mongodbUrl, { useNewUrlParser: true });
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};