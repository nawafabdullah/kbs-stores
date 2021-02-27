const { MongoClient } = require("mongodb");
const stringify = require('stringify-object')
const { dbConfig } = require("../../dbConfig/db.config");
const { roleConfig } = require("../../dbConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;

async function DeleteAll() {
    let qcollName, collName;
    const dbsArr = [
        `${dbConfig.DBADMINCOLL}`,
        `${dbConfig.USERADMINCOLL}`,
        `${dbConfig.DBOWNERCOLL}`,
    ];

    const conn = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    const db = await conn.db(`${dbConfig.ADMINDB}`);

    dbsArr.forEach(async (dbElement) => {
        qcollName = await stringify(dbElement);
        collName = await qcollName.replace(/['"]+/g, '')
        db.collection(collName).drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log(`${collName} Collection deleted`);
            conn.close();
        });
    });
}

DeleteAll();
//ConstructDatabases(dbsArr);
