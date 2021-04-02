const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const { Encrypt } = require('../../../../../encryptionHandler/Encrypt');
//const admin = "admin"; 

async function InsertUser(userData, dbPath) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  let password = await Encrypt(userData.password);
  userData['password'] = password;
  try {
    const { insertedId } = await database.collection(`${dbPath}`).insertOne(userData);
    console.log(" DataBase User Inserted Succesfully With ID: " + insertedId);
    CloseConnection();
  } catch (error) {
    console.log("An Error Occured, Could Not Insert The New Database User " + error);
  }
  return 1;
}



async function CompareToAuthorize(obj) {

  const database = await GetDatabase();
  await database.collection(collectionName).find({}).toArray();





}

module.exports = {
  InsertUser
};





