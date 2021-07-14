const { dbConfig } = require("../../../mainConfig/db.config");
async function CreateUsersDB(db) {
   console.log(`Creating ${dbConfig.INTERNAL_USERS}...`);
   db.createCollection(dbConfig.INTERNAL_USERS, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["_id", "Name ", "Password", "Role"],
            properties: {
               _id: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Name: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Password: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               Role: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   return true;
}

module.exports = { CreateUsersDB };
