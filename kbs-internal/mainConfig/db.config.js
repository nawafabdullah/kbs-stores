dbConfig = {
    HOST: "mongodb://localhost",
    PORT: 27017,
    NAME: "KBS-Stores-Internal",
    INTERNAL_USERS: "Internal-Users",
    PRODUCTS: "Products",
    COMPANIES: "Companies",
    COUNTRIES: "Countries",
    SALES: "Sales",
    PRODUCTS_MAINCATAGORIES: "Main-Catagories",
    PRODUCTS_QUALITY: "Fabric-Quality"
};
/* flags 001 => dbOwner - 002 => dbAdmins */
exports.dbConfig = dbConfig;
