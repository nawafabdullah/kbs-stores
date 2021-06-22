const { GetDatabase, CloseConnection } = require('../../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../../mainConfig/db.config');
const { Encrypt } = require('../../../../../../encryptionHandler/Encrypt');
const { RetrieveUser } = require('../sign-in/signin');
const prompt = require('prompt');
//const admin = "admin"; 

async function InsertUser(userData, flag) {
  let database;
  if (flag == 001) {
    try {
      //database = await GetDatabase(dbConfig.DBOWNERCOLL);
      database = await GetDatabase();
      let password = await Encrypt(userData.password);
      userData['password'] = password;
      const { insertedId } = await database.collection(dbConfig.USERS_DBOWNERCOLL).insertOne(userData);
      console.log(`Welcome ${userData.username}.. you have become the database owner! `);
      CloseConnection();
    } catch (error) {
      console.error("Could Not Add DB Owner .. \n error:" + error);
    }
  }
  else if (flag == 002) {
    database = await GetDatabase();

    let password = await Encrypt(userData.password);
    userData['password'] = password;
    let ownerData = AuthoraizeInsertion();
    RetrieveUser(ownerData, 001);

    if (RetrieveUser) {
      try {
        const { insertedId } = await database.collection(`${dbConfig.ADMINDB}`).insertOne(userData);
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