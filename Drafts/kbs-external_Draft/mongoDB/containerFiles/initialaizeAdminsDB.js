const { MongoClient } = require("mongodb");
var prompt = require('prompt');
const stringify = require('stringify-object');
const { dbConfig } = require("../../dbConfig/db.config");
const { roleConfig } = require("../../dbConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;


ConstructDatabases();

async function GetdbOwnerInfo() {

    // This json object is used to configure what data will be retrieved from command line.
    var prompt_attributes = [
        {
            // The fist input text is assigned to username variable.
            name: 'username',
            // The username must match below regular expression.
            validator: /^[a-zA-Z\s\-]+$/,
            // If username is not valid then prompt below message.
            warning: 'Username is not valid, it can only contains letters, spaces, or dashes'
        },
        {
            // The second input text is assigned to password variable.
            name: 'password',
            // Do not show password when user input.
            hidden: true
        }
        /*
        ,
        {
            // The third input text is assigned to email variable.
            name: 'email',
            // Display email address when user input.
            hidden: false
        }
        */
    ];
    // Start the prompt to read user input.
    prompt.start();
    // Prompt and get user input then display those data in console.
    prompt.get(prompt_attributes, function (err, result) {
        if (err) {
            console.log(err);
            return 1;
        } else {
            console.log('Command-line received data:');
            // Get user input from result object.
            var username = result.username;
            var password = result.password;
            //var email = result.email;
            var message = "  Username : " + username + " , Password : " + password;
            // Display user input in console log.
            console.log(message);
        }
    });

}

async function ConstructDatabases() {
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
        let collCreation = await db.createCollection(collName, { capped: false });
        console.log("Created? " + collCreation);

        if (collCreation) {
            console.log(`${collName} Collection Created Successfully.... \n`);
            console.log(
                "=========================================================================="
            );
        } else {
            console.log(`Could not create ${collName}`);

        }
    }
    console.log("AFTER LOOP");

    conn.close();
    return 1;
}

async function InsertDBOwner(userData) {
    const database = await getDatabase();


    try {
        const { insertedId } = await database.collection(dbAminsCollection).insertOne(userData);
        console.log(" User Inserted Succesfully With ID" + insertedId);
        return insertedId;
    } catch (error) {
        console.log("An Error Occured, Could Not Insert The New User");
    }
}

