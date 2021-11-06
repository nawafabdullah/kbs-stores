const { MongoClient } = require("mongodb");
const stringify = require('stringify-object')
const { dbConfig } = require("../../dbConfig/db.config");
const { roleConfig } = require("../../dbConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;

async function DeleteAll() {
    let qcollName, collName;
    const collectionsArr = [
        `${dbConfig.DBADMINCOLL}`,
        `${dbConfig.USERADMINCOLL}`,
        `${dbConfig.DBOWNERCOLL}`,
    ];

    const conn = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    const db = await conn.db(`${dbConfig.ADMINDB}`);

    let i;
    for (i = 0; i < collectionsArr.length; i++) {
        qcollName = await stringify(collectionsArr[i]);
        collName = await qcollName.replace(/['"]+/g, '');
        let collDeletion = await db.dropCollection(collName, { capped: false });
        console.log("deleted? " + collDeletion);
        if (collDeletion) {
            console.log(`${collName} Collection Deleted Successfully.... \n`);
            console.log(
                "=========================================================================="
            );

            console.log(
                "=========================================================================="
            );

        } else {
            console.log(`Could not delete ${collName}`);
        }
    }
    conn.close();
    return 1;

}


DeleteAll();
//ConstructDatabases(dbsArr);
