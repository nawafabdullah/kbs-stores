const { MongoClient } = require("mongodb");
var prompt = require('prompt');
const stringify = require('stringify-object');
const { dbConfig } = require("../../mainConfig/db.config");
const { GetDatabase, CloseConnection } = require("./mongo");
const { CreateSalesDB } = require("./Models/sales");


const dbUrl = `${dbConfig.HOST}/${dbConfig.PORT}:${dbConfig.NAME}`;

async function ConstructDatabases() {
  database = await GetDatabase();
  await CreateSalesDB(database);
  return true;
}

ConstructDatabases();
