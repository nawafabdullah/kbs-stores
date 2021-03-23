const { MongoClient } = require("mongodb");
var prompt = require('prompt');
const stringify = require('stringify-object');
const {InsertUser, admin} = require('../../internalSystem/containerFiles/public/UsersService/sign-up/signup');
const { dbConfig } = require("../../mainConfig/db.config");
const { GetDatabase, CloseConnection } = require("./mongo");
const { roleConfig } = require("../../mainConfig/roles.config");
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;

async function ConstructDatabases() {
    let qcollName, collName;
    const collectionsArr = [
        `${dbConfig.DBADMINCOLL}`,
        `${dbConfig.USERADMINCOLL}`,
        `${dbConfig.DBOWNERCOLL}`,
    ];
    const conn = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    const db = await GetDatabase(admin);
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

    GetdbOwnerInfo();
    conn.close();
    //CloseConnection();
    return 1;
}

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
    ];
    // Start the prompt to read user input.
    prompt.start();
    // Prompt and get user input then display those data in console.
    prompt.get(prompt_attributes, async function (err, result) {
        if (err) {
            console.log(err);
            return 0;
        } else {
            console.log('Command-line received data:');
            // Get user input from result object.
            InsertUser(result,dbConfig.DBOWNERCOLL);
        }
        return 1;
    });
    return 1;
}

ConstructDatabases();