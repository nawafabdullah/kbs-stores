const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017";

let conn;


MongoClient.connect("mongodb://localhost:27017/integration_test", { useUnifiedTopology: true }, function (err, database) {
    if (err) throw err;
    conn = database;
    app.listen(8120);
    //app.use("/", router);
    console.log(`DB Server is running`);
});

exports.conn = conn;


/*
const conn = async function EstablishConnection() {
    const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log("Established Connection to DB");
        return client;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = conn;


//EstablishConnection().catch(console.error);

//console.log ("Value returned from calling the function is: " + EstablishConnection());


/*
function EstablishConnection() {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
    });
}

db = EstablishConnection();

exports.db;
*/

/*
mClient = new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useUnifiedTopology: true }, new Promise(function (err, db) {
        if (!err) {

            resolve("Connection to DB Succesful");
        } else {
            throw err;
            reject("Could not establish connection");

        })
        });
    }
}


    /*try {
        let mClient = MongoClient.connect(url, { useUnifiedTopology: true });
        console.log(" Succesful Connection to DB ");
        return mClient;
    }
    catch (err) {
        console.log("Could not establish connection \n Error code: " + err);
    }
    }
    */
//const connDescriptor = await EstablishConnection().then(result => result.data);

//EstablishConnection();

//exports.EstablishConnection;