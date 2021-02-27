const { MongoClient } = require("mongodb");

const User = db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "password"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        address: {
          bsonType: "object",
          required: ["city"],
          properties: {
            street: {
              bsonType: "string",
              description: "must be a string if the field exists",
            },
            city: {
              bsonType: "string",
              description: "must be a string and is required",
            },
          },
        },
      },
    },
  },
  validationAction: "warn",
});

console.log

exports.User = User;