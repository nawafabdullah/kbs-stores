const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const { Decrypt } = require('./DecryptionHandler/Decrypt');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.APPDB}`;
let conn;

//// needs work ////////
//authenticate input against database


//exports.RetrieveFromDB = RetrieveFromDB;