const { MongoClient } = require("mongodb");
const stringify = require('stringify-object');
const { dbConfig } = require("../../dbConfig/db.config");
const { roleConfig } = require("../../dbConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;


ConstructDatabases();

async function ConstructDatabases() {

    const collectionsArr = [
        `${dbConfig.DBADMINCOLL}`,
        `${dbConfig.USERADMINCOLL}`,
        `${dbConfig.DBOWNERCOLL}`,
    ];

    let qcollName, collName;
    const conn = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    const db = await conn.db(`${dbConfig.ADMINDB}`);
    let i;
    for (i = 0; i < collectionsArr.length; i++) {
        qcollName = await stringify(collectionsArr[i]);
        collName = await qcollName.replace(/['"]+/g, '');
        let collCreation = await db.createCollection(collName, { capped: false });
        console.log("Created? " + collCreation);
        console.log(`${collName} Collection Created Successfully.... \n`);
        console.log(
            "=========================================================================="
        );
        /*
        if (error) {
            console.log(
                `An Error Occurred While Creating ${collName} collection.. \n\n+${error} \n `
            );
            console.log(
                "=========================================================================="
            );
        }
        */
    }
    console.log("AFTER LOOP");
    conn.close();
    return 1;
}


/*
if (err instanceof TypeError) {
 // statements to handle TypeError exceptions
} else if (err instanceof RangeError) {
 // statements to handle RangeError exceptions
} else if (err instanceof EvalError) {
 // statements to handle EvalError exceptions
} else {
 // statements to handle any unspecified exceptions
 logMyErrors(e); // pass exception object to error handler
}
*/

/*
} finally {
    console.log("FINALLY");
    /*
      conn.close();
      console.log(
          "** Connection has been closed from this end ** \n\n** A fresh connection will be passed upon execution... ** \n"
      );
      console.log(
          "==========================================================================\n"
      );

    return;
}
}
*/
