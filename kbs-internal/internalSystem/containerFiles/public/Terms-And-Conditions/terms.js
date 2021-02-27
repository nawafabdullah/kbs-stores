const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const dbUrl = "mongodb://localhost:27017/";
const { Encrypt } = require('./EncryptionHandler/Encrypt')
let conn;


MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, database) {
  if (err) throw err;
  conn = database;
});

async function InsertToDB(userData) {
  let name = userData.name;
  let email = userData.email;
  let password = await Encrypt(userData.password);
  let dbo = conn.db("users");
  let myobj = {
    name,
    email,
    password
  };
  dbo.collection("users collecton").insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log(
      " I have added " +
      name +
      "!\n with the email: " +
      email +
      "\n And Password: " +
      password
    );
  })
  return;
}

exports.InsertToDB = InsertToDB;