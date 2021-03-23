const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');

//const admin = "admin";

async function InsertUser(userData, dbPath) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  try {
    const { insertedId } = await database.collection(`${dbPath}`).insertOne(userData);
    console.log(" DataBase Owner Inserted Succesfully With ID: " + insertedId);
    CloseConnection();
  } catch (error) {
    console.log("An Error Occured, Could Not Insert The New Database User " + error);
  }
  return 1;
}

async function getAds() {
  const database = await GetDatabase();
  return await database.collection(collectionName).find({}).toArray();
}


async function AuthorizeEntry() {

  let userName = prompt("Mr. Khalid, please enter your USERNAME");
  let password = prompt("Mr. Khalid, please enter your PASSWORD");





}

async function CompareToAuthorize(obj) {

  const database = await GetDatabase();
  await database.collection(collectionName).find({}).toArray();





}

module.exports = {
  InsertUser,
  getAds
};





