dbConfig = {
    HOST: "mongodb://localhost",
    PORT: 27017,
    NAME: "KBS-Stores-Internal",
    INTERNAL_USERS: "Internal-Users",
    PRODUCTS: "Products",
    COMPANIES: "Companies",
    COUNTRIES: "Countries",
    PRODUCTS_MAINCATAGORIES: "Main-Catagories",
    PRODUCTS_SECONDARYCATAGORIES: "Secondary-Catagories",

};
/* flags 001 => dbOwner - 002 => dbAdmins */
exports.dbConfig = dbConfig;
