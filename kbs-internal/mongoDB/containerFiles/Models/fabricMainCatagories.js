const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateFabricMainCatagoriesDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS_MAINCATAGORIES}...`);
   db.createCollection(dbConfig.PRODUCTS_MAINCATAGORIES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["Catagory_Type"],
            properties: {
               Catagory_Type: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   InsertPrimaryTypes(db);
   return true;
}


async function InsertPrimaryTypes(db) {
   let primaryTypes = [
      { type: "Sahrah", _id: "A01" },
      { type: "Sadah", _id: "A02" },
      { type: "Moshajar", _id: "A03" }
   ];
   try {
      for (type in primaryTypes) {
         let { insertedID } = await db.collection(`${dbConfig.PRODUCTS_MAINCATAGORIES}`).insertOne(primaryTypes[type]);
         //  console.log(`Country #: ${country} had been inserted..`);
      }
   } catch (error) {
      console.error("failed to insert primary types to the Database \n Error: " + error);
      return false;
   }
}

module.exports = { CreateFabricMainCatagoriesDB };

