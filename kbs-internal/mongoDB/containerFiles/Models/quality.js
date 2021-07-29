const { dbConfig } = require("../../../mainConfig/db.config");

async function CreateFabricQualityDB(db) {
   console.log(`Creating ${dbConfig.PRODUCTS_SECONDARYCATAGORIES}...`);
   db.createCollection(dbConfig.PRODUCTS_QUALITY, {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["Catagory_Type"],
            properties: {
               Catagory_Type: {
                  bsonType: "string",
                  description: "must be a string and is required"
               }
            }
         }
      }, validationAction: "warn"
   })
   InsertQualityTypes(db);
   return true;
}


async function InsertQualityTypes(db) {
   let quality = [
      { type: "Plain", _id: "B01" },
      { type: "Chiffon", _id: "B02" },
      { type: "Cotton", _id: "B03" },
      { type: "Crepe", _id: "B04" },
      { type: "Denim", _id: "B05" },
      { type: "Lace", _id: "B06" },
      { type: "Leather", _id: "B07" },
      { type: "Linen", _id: "B08" },
      { type: "Satin", _id: "B09" },
      { type: "Silk", _id: "B10" },
      { type: "Synthetics", _id: "B11" },
      { type: "Velvet", _id: "B12" },
      { type: "Wool", _id: "B13" }
   ];
   try {
      for (type in quality) {
         let { insertedID } = await db.collection(`${dbConfig.PRODUCTS_QUALITY}`).insertOne(quality[type]);
         //  console.log(`Country #: ${country} had been inserted..`);
      }
   } catch (error) {
      console.error("failed to insert quality to the Database \n Error: " + error);
      return false;
   }
}

module.exports = { CreateFabricQualityDB };

