const { dbConfig } = require("../../../mainConfig/db.config");
async function CreateProductsDB(db) {
   db.createCollection(dbConfig.PRODUCTS, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Company_ID ", "Number_Of_Meters", "Primary_Type", "Secondary_Type", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Company_ID: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Number_Of_Meters: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Primary_Type: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Secondary_Type: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Entry_Date: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   return true;
}

module.exports = { CreateProductsDB };
