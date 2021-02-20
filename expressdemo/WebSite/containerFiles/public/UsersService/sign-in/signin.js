const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const { Decrypt } = require('./DecryptionHandler/Decrypt');
const { dbConfig } = require('../../../../../dbConfig/db.config');
const dbUrl = `${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.APPDB}`;
let conn;

//// needs work ////////
//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

exports.RetrieveFromDB = RetrieveFromDB;