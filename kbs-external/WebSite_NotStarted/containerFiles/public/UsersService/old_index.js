const express = require("express");
const path = require("path");
const { MongoClient, Mongo } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const port = 8123;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//const {conn} = require("../../MongoDB/containerFiles/DBServer/index.js");
const { dbConfig } = require('../../config/db.config');

let conn;


MongoClient.connect("mongodb://dbConfig.HOST:dbConfig.PORT/dbConfig.DB", { useUnifiedTopology: true }, function (err, database) {
  if (err) throw err;
  conn = database;
  app.listen(port);
  app.use("/", router);
  console.log(` listening at http://localhost:${port}`);
});




/*
async function EstablishUsersConnection() {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  try {
    const conn_descriptor = await (await client.connect()).db("Users");

    console.log("Established Connection to DB");
    return conn_descriptor;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

*/

//const conn = EstablishUsersConnection();
//console.log("connection descriptor has: " + conn);

/*
async function listDatabases() {
  databasesList = await conn.admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

*/
//listDatabases();


router.route("/")
  .get(function (req, res) {
    res.sendFile(path.join(__dirname + "/public/"));
  })

router.route("/signup")
  .get(function (req, res) {
    res.sendFile(path.join(__dirname + "/public/signup/"));
  })

  .post(urlencodedParser, function (req, res) {
    console.log(" request recieved to insert");
    InsertToDB(req.body);
    res.writeHead(301, {
      content: "Success",
      Location: "/",
    });
    res.end("Success");
  })

router.route("/displaybyname")
  .get(function (req, res) {
    res.sendFile(path.join(__dirname + "/public/displaybyname/"));
  })

  .post(urlencodedParser, function (req, res) {
    console.log(" Request Recieved To Display by name ");
    let name = req.body.fullName;
    console.log(name);
    ConnectAndDisplayByName(name);
    res.writeHead(301, {
      content: "Success",
      Location: "/",
    });
    res.end("Success");
  })




async function InsertToDB(userData) {
  let name = userData.fullName;
  let email = userData.email;
  let password = userData.password;

  console.log("Name recieved is: " + userData.name);

  /*let dbo = conn.db("users");
  let myobj = {
    fullName: name,
    email,
    password: password,
  };
  dbo.collection("users collecton").insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log(
      " I have added " +
      name +
      "!\n with the email: " +
      email +
      "\n And Phone Number: " +
      password +
    );
  });

  */
}







/*
function ConnectAndInsert(customerData) {
  // Connect to the db
  MongoClient.connect(
    DBUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      console.log(" Succeful Connection to DB!");
      /* Nawaf Fix this using destructor..
      Lookat MongoClient
      */
/*
 let name = customerData.body.fullName;
 let email = customerData.body.email;
 let phone = customerData.body.phoneNumber;
 let dbo = db.db("users");
 let myobj = {
   id: iterator,
   fullName: name,
   email,
   phoneNumber: phone,
 };
 dbo.collection("users").insertOne(myobj, (err, res) => {
   if (err) throw err;
   db.close();
   console.log(
     " I have added " +
     name +
     "!\n with the email: " +
     email +
     "\n And Phone Number: " +
     phone +
     "\n \n Conncetion Closed \n"
   );
 });
}
);
iterator++;
}


async function InsertToDB(customerData) {
  //const { dbDescriptor } = await require("../../MongoDB/containerFiles/DBServer");

  const connDescriptor = await EstablishConnection().then(function (result) {
    try {
      console.log("Connection Succesful \n Descriptor value is: " + result);
      return result;
    }
    catch (error) {
      console.log(error);
    }
  })

  connDescriptor.open(function (error, connDescriptor) {



    console.log("Des is:" + connDescriptor);
    let name = customerData.body.fullName;
    let email = customerData.body.email;
    let phone = customerData.body.phoneNumber;
    //let db = dbConnection.EstablishConnection;
    //let dbo = dbConnection.db("users");
    let myobj = {
      id: iterator,
      fullName: name,
      email,
      phoneNumber: phone,
    };
    connDescriptor.collection("users").insertOne(myobj, (err, res) => {
      if (err) throw err;
      console.log(
        " I have added " +
        name +
        "!\n with the email: " +
        email +
        "\n And Phone Number: " +
        phone +
        "\n \n Conncetion Closed \n"
      )
    })
  })
  iterator++;
}




/*
function ConnectAndDisplayByName(name) {
  MongoClient.connect(
    DBUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("users");
      var query = { name: name };
      dbo.collection("customers").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
}
*/
