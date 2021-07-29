const { dbConfig } = require("../../../mainConfig/db.config");
async function CreateProductsDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS}...`);
   db.createCollection(dbConfig.PRODUCTS, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Company_Name ", "Number_Of_Meters", "Primary_Type", "Quality", "Entry_Date", "Price"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Company_Name: {
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
               Quality: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Price: {
                  bsonType: "double",
                  description: "must be a double and is required"
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
