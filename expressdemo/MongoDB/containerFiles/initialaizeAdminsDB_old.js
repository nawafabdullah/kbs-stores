const { MongoClient } = require("mongodb");

const { dbConfig } = require("../../dbConfig/db.config");
const { roleConfig } = require("../../dbConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;

const collectionsArr = [
    `${dbConfig.DBADMINCOLL}`,
    `${dbConfig.USERADMINCOLL}`,
    `${dbConfig.DBOWNERCOLL}`,
];

async function ConstructDatabases(collectionsArr) {
    let i;
    const client = await MongoClient.connect(
        dbUrl,
        { useUnifiedTopology: true },
        async function (err, database) {
            if (err) throw err;
            let conn = await database.db(`${dbConfig.ADMINDB}`);
            console.log(
                "\n==========================================================================\n"
            );
            console.log("Switched to Admins Database Successfully... \n");
            console.log(
                "==========================================================================\n"
            );
            collectionsArr.forEach(async (collElement) => {
                try {

                    let collCreated = await conn.createCollection(JSON.stringify(collElement));
                    console.log(`${collElement} Collection Created Successfully.... \n`);
                    console.log(
                        "=========================================================================="
                    );
                } catch (err) {
                    //console.log("==========================================================================");
                    console.log(
                        `An Error Occurred While Creating ${collElement} collection.. \n\n+${err} \n `
                    );
                    console.log(
                        "=========================================================================="
                    );
                } finally {
                    console.log("Finally");
                    database.close();
                    console.log(
                        "** Connection has been closed from this end ** \n\n** A fresh connection will be passed upon execution... ** \n"
                    );
                    console.log(
                        "==========================================================================\n"
                    );
                }
            });
        }
    );
}
ConstructDatabases(collectionsArr);
