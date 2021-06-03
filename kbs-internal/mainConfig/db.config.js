dbConfig = {
    HOST: "mongodb://localhost",
    PORT: 27017,
    NAME: "KBS-Stores-Internal",
    ADMINDB: "admin",
    DBADMINCOLL: "dbAdmins",
    USERADMINCOLL: "userAdmins",
    DBOWNERCOLL: "dbOwners"
};
/* flags 001 => dbOwner - 002 => dbAdmins */
exports.dbConfig = dbConfig;
