const { getDatabase } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../dbConfig/db.config');
//const collectionName = `${dbConfig.DBADMINCOLL}`;

async function InsertUser(collectionName, userData) {
  const database = await getDatabase();
  try {
    const { insertedId } = await database.collection(collectionName).insertOne(userData);
    return insertedId;
  } catch (error) {
    console.log("An Error Occured");
  }
}

async function getAds() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  InsertUser,
  getAds,
};






/*
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const { Encrypt } = require('./EncryptionHandler/Encrypt');
const { dbConfig } = require('../../dbConfig/db.config');
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/`;
let conn;


MongoClient.connect(dbUrl, { useUnifiedTopology: true }, async function (err, database) {
  if (err) throw err;
  conn = await database;
});

async function InsertToDB(userData) {
  let name = userData.name;
  let email = userData.email;
  let password = await Encrypt(userData.password);
  let dbo = conn.db(`${dbConfig.APPDB}`);
  let myobj = {
    name,
    email,
    password
  };

  let coll = await dbo.collection(`${dbConfig.USERCOLL}`).insertOne(myobj);
  //console.log(coll);
  if (coll.insertedCount) {
    console.log("inserted succesfully");
  }

  /*
    console.log(
    " I have added " +
    name +
    "!\n with the email: " +
    email +
    "\n And Password: " +
    password
  );
  */

/*

  return;
}

exports.InsertToDB = InsertToDB;

*/