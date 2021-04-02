const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const { Decrypt } = require('../../../../../encryptionHandler/Decrypt');

async function RetrieveUser(userData, dbPath) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  const username = userData.username;
  let password = userData.password;
  password = await Decrypt(userData, dbPath);

  if (password == )
  try {
    const { retrievedID } = await database.collection(`${dbPath}`).insertOne(userData);
    console.log(" DataBase User Found With ID: " + retrievedID);
    CloseConnection();
  } catch (error) {
    console.log("An Error Occured, Could Not Retrieve The Requested Database User " + error);
  }
  return 1;
}

async function RetrieveUser(dbPath, userData) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  const username = userData.username;
  const password = userData.password;
  
  
}

module.exports = {
  RetrieveUser
};
