const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateSalesDB(db) {
   console.log(`Creating ${dbConfig.SALES}...`);
   db.createCollection(dbConfig.SALES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Description ", "Quantity","Total_Price", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "recipt number"
               },
               Description: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Quantity: {
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