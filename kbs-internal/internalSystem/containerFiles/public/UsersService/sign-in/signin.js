const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const {Decrypt} = require('../../../../../encryptionHandler/Decrypt');

async function RetrieveUser(userData, dbPath) {
    const database = await GetDatabase(dbConfig.ADMINDB);
    let password = await Decrypt(userData.username, userData.password);
    
    try {
      const { insertedId } = await database.collection(`${dbPath}`).insertOne(userData);
      console.log(" DataBase User Inserted Succesfully With ID: " + insertedId);
      CloseConnection();
    } catch (error) {
      console.log("An Error Occured, Could Not Insert The New Database User " + error);
    }
    return 1;
  }