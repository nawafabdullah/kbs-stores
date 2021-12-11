const { dbConfig } = require("../../../mainConfig/db.config");
const {GetDatabase} = require("../mongo");

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

   let database = await GetDatabase();
   let status = await database.collection(`${dbConfig.SALES}`).insertOne({_id:1000000});

   return true;
}


module.exports = { CreateSalesDB };