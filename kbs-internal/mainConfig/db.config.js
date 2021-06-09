dbConfig = {
    HOST: "mongodb://localhost",
    PORT: 27017,
    NAME: "KBS-Stores-Internal",
    USERS_ADMINDB: "admin",
    USERS_DBADMINCOLL: "DB-Admins",
    USERS_USERADMINCOLL: "User-Admins",
    USERS_DBOWNERCOLL: "DB-Owners",
    PRODUCTS_MAINCATAGORIES: "Main-Catagories",
    PRODUCTS_SECONDARYCATAGORIES: "Secondary-Catagories",
    PRODUCTS_COMPANIES: "Companies"
};
/* flags 001 => dbOwner - 002 => dbAdmins */
exports.dbConfig = dbConfig;
