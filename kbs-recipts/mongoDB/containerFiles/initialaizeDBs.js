const { dbConfig } = require("../../mainConfig/db.config");
const { GetDatabase, CloseConnection } = require("./mongo");
const { CreateSalesDB } = require("./Models/sales");
async function ConstructAll() {

  try {
    let database = await GetDatabase();
    //  await database.createCollection(dbConfig.SALES, { capped: false });

    await CreateSalesDB(database);
    EXIT();
  } catch (error) {
    console.error("Could Not Create Database /n Error: " + error);
  }
}

async function EXIT() {
  CloseConnection();
}



ConstructAll();
/*
async function DeleteAll() {
    let qcollName, collName, database;
    const collectionsArr = [
        `${dbConfig.USERS_DBADMINCOLL}`,
        `${dbConfig.USERS_USERADMINCOLL}`,
        `${dbConfig.USERS_DBOWNERCOLL}`,
        `${dbConfig.PRODUCTS_MAINCATAGORIES}`,
        `${dbConfig.PRODUCTS_SECONDARYCATAGORIES}`,
        `${dbConfig.PRODUCTS_COMPANIES}`,
        `${dbConfig.COUNTRIES}`,
    ];

    /*
     const conn = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
     const db = await conn.db(`${dbConfig.ADMINDB}`);
    */

/*
database = await GetDatabase();
let i;
for (i = 0; i < collectionsArr.length; i++) {
   qcollName = await stringify(collectionsArr[i]);
   collName = await qcollName.replace(/['"]+/g, '');
   let collDeletion = await database.dropCollection(collName, { capped: false });
   console.log("deleted? " + collDeletion);
   if (collDeletion) {
       console.log(`${collName} Collection Deleted Successfully.... \n`);
       console.log(
           "=========================================================================="
       );
       console.log(
           "=========================================================================="
       );
   } else {
       console.log(`Could not delete ${collName}`);
   }
}


CloseConnection();
return 1;
}

DeleteAll();
ConstructDatabases(dbsArr);
*/
