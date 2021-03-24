const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const { Decrypt } = require('../../../../../encryptionHandler/Decrypt');

async function RetrieveUser(userData, dbPath) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  let password = await Decrypt(userData.password);

  try {
    const { insertedId } = await database.collection(`${dbPath}`).insertOne(userData);
    console.log(" DataBase User Inserted Succesfully With ID: " + insertedId);
    CloseConnection();
  } catch (error) {
    console.log("An Error Occured, Could Not Insert The New Database User " + error);
  }
  return 1;
}

async function RetrieveUser(dbPath) {
  const database = await GetDatabase(dbConfig.ADMINDB);
  let userExists = await database.collection(`${dbPath}`).findOne(
    { username: "khalid omar  " }
    //,{ _id: 0, 'name.first': 0, birth: 0 }
  );
  console.log("Users Array Contains: " + userExists);
  if (userExists) {
    return userExists;
  } else {
    alert("User Does Not Exist");
    return 0;
  }
}

module.exports = {
  RetrieveUser
};
