const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateSalesDB(db) {
   console.log(`Creating ${dbConfig.SALES}...`);
   db.createCollection(dbConfig.SALES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "ReciptDetails"],
            properties: {
               _id: {
                  bsonType: "number",
                  description: "recipt number"
               },
               ReciptDetails: {
                  bsonType: "object",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   return true;
}

module.exports = { CreateSalesDB };