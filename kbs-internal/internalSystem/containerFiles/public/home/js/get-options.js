const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');

async function GetCompanies() {
    let database = await GetDatabase();
    let companiesArr = await database.collection(`${dbConfig.COMPANIES}`).find().toArray();
    console.log("Companies Array contains: \n");
    for (company in companiesArr) {
        console.log(company + "\n");
    }
    console.log("\n\n\n");
    //return companiesArr;
}

async function GetFabricPrimaryTypes() {
    let database = await GetDatabase();
    let primaryTypesArr = await database.collection(`${dbConfig.PRODUCTS_MAINCATAGORIES}`).find().toArray();
    console.log("Primary Types Array contains: \n");
    for (type in primaryTypesArr) {
        console.log(type + "\n");
    }
    console.log("\n\n\n");
    //return companiesArr;
}


async function GetFabricSecondaryTypes() {
    let database = await GetDatabase();
    let secondaryTypesArr = await database.collection(`${dbConfig.PRODUCTS_SECONDARYCATAGORIES}`).find().toArray();
    console.log("Primary Types Array contains: \n");
    for (type in secondaryTypesArr) {
        console.log(type + "\n");
    }
    console.log("\n\n\n");
    //return companiesArr;
}