const { GetDatabase } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const dbAminsCollection = `${dbConfig.HOST}:${dbConfig.PORT}/`;
const dbOwenersCollections = `${dbConfig.DBOWNERCOLL}`;


async function InsertUser(userData) {
  const database = await GetDatabase();


  try {
    const { insertedId } = await database.collection(dbAminsCollection).insertOne(userData);
    console.log(" User Inserted Succesfully With ID" + insertedId);
    return insertedId;
  } catch (error) {
    console.log("An Error Occured, Could Not Insert The New User");
  }
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
  getAds,
};





