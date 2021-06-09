const { MongoClient } = require("mongodb");
var prompt = require('prompt');
const stringify = require('stringify-object');
const { InsertUser } = require('../../internalSystem/containerFiles/public/UsersService/sign-up/signup');
const { dbConfig } = require("../../mainConfig/db.config");
const { GetDatabase, CloseConnection } = require("./mongo");
//const { roleConfig } = require("../../mainConfig/roles.config");
//const dbUrl = "mongodb://localhost:27017/admin";
const dbUrl = `${dbConfig.HOST}/${dbConfig.PORT}:${dbConfig.NAME}`;

//const dbUrl = Stringfy(process.env.DBHOST + ":" + process.env.DBPORT + "/");

async function ConstructDatabases() {
  let qcollName, collName, database;
  const collectionsArr = [
    dbConfig.PRODUCTS_MAINCATAGORIES,
    dbConfig.PRODUCTS_SECONDARYCATAGORIES,
    dbConfig.PRODUCTS_COMPANIES,
  ];
  //const database = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });

  database = await GetDatabase("Products");

  let i;

  //let conn = await database.db(`${dbConfig.ADMINDB}`);


  for (i = 0; i < collectionsArr.length; i++) {
    qcollName = await stringify(collectionsArr[i]);
    collName = await qcollName.replace(/['"]+/g, '');


    //let collCreation = await conn.createCollection(collName, { capped: false });

    let collCreation = await database.createCollection(collectionsArr[i]);


    console.log("Created? " + collCreation);
    if (collCreation) {
      console.log(`${collName} Collection Created Successfully.... \n`);
      console.log(
        "=========================================================================="
      );
    } else {
      console.log(`Could not create ${collName}`);
    }
  }


  //conn.close();
  CloseConnection();
  return true;
}



ConstructDatabases();