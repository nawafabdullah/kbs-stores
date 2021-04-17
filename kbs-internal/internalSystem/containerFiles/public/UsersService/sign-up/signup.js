const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
//const { dbConfig } = require('../../../../../mainConfig/db.config');
const { Encrypt } = require('../../../../../encryptionHandler/Encrypt');
const { RetrieveUser } = require('../sign-in/signin');
//const admin = "admin"; 

async function InsertUser(userData, dbPath) {
  const database = await GetDatabase(process.env.ADMINDB);
  let password = await Encrypt(userData.password);
  userData['password'] = password;
  let ownerData = AuthoraizeInsertion();
  RetrieveUser(ownerData, process.env.DBOWNERCOLL);

  if (RetrieveUser) {
    try {
      const { insertedId } = await database.collection(`${dbPath}`).insertOne(userData);
      console.log(" DataBase User Inserted Succesfully With ID: " + insertedId);
      //CloseConnection();
    } catch (error) {
      console.log("An Error Occured, Could Not Insert The New Database User " + error);
      return false;
    }
    return true;
  } else {
    console.log("Mr. Khalid's Email Does Not Match ");
  }
}

async function AuthoraizeInsertion() {
  let email = prompt("Mr.Khalid Please Enter Your Registered Email Address");
  let password = prompt("Mr.Khalid Please Enter Your Registered Password");
  let ownerData = {};
  ownerData['email'] = email;
  ownerData['password'] = password;
  return ownerData;
}


module.exports = {
  InsertUser
};