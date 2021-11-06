const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateSalesDB(db) {
   console.log(`Creating ${dbConfig.SALES}...`);
   db.createCollection(dbConfig.SALES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Product_ID ", "Number_Of_Meters","Total_Price", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Product_ID: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Number_Of_Meters: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Total_Price: {
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

module.exports = { CreateSalesDB };