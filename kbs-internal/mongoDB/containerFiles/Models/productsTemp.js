const { dbConfig } = require("../../../mainConfig/db.config");
async function CreateProductsDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS}...`);
   db.createCollection(dbConfig.PRODUCTS, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Design_Number", "Primary_Type", "Secondary_Type", "Quality", "Color", "Number_Of_Meters", "Price", "Company_Code", "Entry_Date"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Design_Number: {
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
               Quality: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Color: {
                  bsonType: "string",
                  description: "must be a double and is required"
               }, 
               Price: {
                  bsonType: "double",
                  description: "must be a double and is required"
               },
               Number_Of_Meters: {
                  bsonType: "double",
                  description: "must be a double and is required"
               },
               Company_Code: {
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
