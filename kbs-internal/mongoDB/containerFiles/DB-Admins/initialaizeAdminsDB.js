const { MongoClient } = require("mongodb");
var prompt = require('prompt');
const stringify = require('stringify-object');
const { InsertUser } = require('../../../internalSystem/containerFiles/public/home/UsersService/sign-up/signup');
const { dbConfig } = require("../../../mainConfig/db.config");
const { GetDatabase, CloseConnection } = require(".././mongo");
//const { roleConfig } = require("../../mainConfig/roles.config");
//const dbUrl = "mongodb://localhost:27017/admin";
//const dbUrl = `${dbConfig.HOST}/${dbConfig.PORT}:${dbConfig.NAME}/`;

//const dbUrl = Stringfy(process.env.DBHOST + ":" + process.env.DBPORT + "/");

async function ConstructDatabases() {
    let qcollName, collName, database;
    const collectionsArr = [
        `${dbConfig.USERS_DBADMINCOLL}`,
        `${dbConfig.USERS_USERADMINCOLL}`,
        `${dbConfig.USERS_DBOWNERCOLL}`,
    ];
    //const database = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });

    database = await GetDatabase();

    let i;


    for (i = 0; i < collectionsArr.length; i++) {
        qcollName = await stringify(collectionsArr[i]);
        collName = await qcollName.replace(/['"]+/g, '');


        //let collCreation = await conn.createCollection(collName, { capped: false });

        let collCreation = await database.createCollection(collectionsArr[i]);


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

    SetdbOwnerInfo();
    //conn.close();
    //CloseConnection();
    return true;
}

async function SetdbOwnerInfo() {
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
            InsertUser(result, 001);
        }
        return 1;
    });
    return 1;
}

ConstructDatabases();