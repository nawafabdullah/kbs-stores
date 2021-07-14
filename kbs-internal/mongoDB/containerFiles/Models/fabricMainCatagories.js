const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateFabricMainCatagoriesDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS_MAINCATAGORIES}...`);
   db.createCollection(dbConfig.PRODUCTS_MAINCATAGORIES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Company_Name ", "Company_Origin", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Catagory_Type: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   return true;
}

module.exports = { CreateFabricMainCatagoriesDB };

