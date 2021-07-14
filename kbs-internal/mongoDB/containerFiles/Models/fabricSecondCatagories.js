const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateFabricSecondaryCatagoriesDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS_SECONDARYCATAGORIES}...`);
   db.createCollection(dbConfig.PRODUCTS_SECONDARYCATAGORIES, {
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

   module.exports = { CreateFabricSecondaryCatagoriesDB};

