const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateCompaniesDB(db) {
   console.log("Creating DB.....");
   db.createCollection(dbConfig.COMPANIES, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Company_Name ", "Company_Origin", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Company_Name: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Company_Origin: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Entry_Date: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }
   })
   return true;
}

module.exports = { CreateCompaniesDB };