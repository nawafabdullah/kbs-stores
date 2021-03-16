const { MongoClient } = require("mongodb");

const { dbConfig } = require("../../dbConfig/db.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;
const collName = `${dbConfig.USERCOLL}`;
//let conn;

MongoClient.connect(
  dbUrl,
  { useUnifiedTopology: true },
  async function (err, database) {
    if (err) throw err;

    let conn = await database.db(`${dbConfig.APPDB}`);
    //  AssignConn(conn);

    /*
    let retrnedColls = await conn.listCollections({}, { nameOnly: true }).toArray();
    console.log(JSON.stringify(retrnedColls));
*/
    console.log("\n==========================================================================\n");
    console.log("Application DataBase Created Successfully... \n");
    console.log("==========================================================================\n");

    try {
      let collCreated = await conn.createCollection(collName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["email", "name", "password"],
            properties: {
              name: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              email: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              address: {
                bsonType: "object",
                required: ["city"],
                properties: {
                  street: {
                    bsonType: "string",
                    description: "must be a string if the field exists",
                  },
                  city: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                },
              },
            },
          },
        },

        //validationLevel: "strict",
      });
      // console.log("==========================================================================");
      console.log("Users Collection Created Successfully.... \n");
      console.log("==========================================================================\n");
    } catch (err) {
      //console.log("==========================================================================");
      console.log(`An Error Occurred While Creating ${collName} collection.. \n\n+${err} \n `);
      console.log("==========================================================================\n");
    } finally {
      await database.close();
      console.log("** Connection has been closed from this end ** \n\n** A fresh connection will be passed upon execution... ** \n");
      console.log("==========================================================================\n");
    }
  }
);

/*
async function AssignConn(conn) {
  conn = conn;
  console.log("descriptor has value:" + conn);
  return conn;
}
*/
//exports.AssignConn = AssignConn;

//exports.User = User;
