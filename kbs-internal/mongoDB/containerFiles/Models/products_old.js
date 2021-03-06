const { dbConfig } = require("../../../mainConfig/db.config");
async function CreateProductsDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS}...`);
   db.createCollection(dbConfig.PRODUCTS, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Company_ID ", "Number_Of_Meters", "Primary_Type", "Secondary_Type"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Company_ID: {
                  bsonType: Schema.Types.ObjectId,
                  ref: 'companies',
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
               }
            }
         }
      }
   })
   return true;
}

module.exports = { CreateProductsDB };