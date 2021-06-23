//const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
//const { dbConfig } = require('../../../../../mainConfig/db.config');

async function InsertCompany() {
    //
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;

    console.log("ADD PRODUCT JS FILE CALLED");

    document.getElementById("companyForm").submit();
    let companyName = await companyObj.name;
    let companyOrgin = await companyObj.orgin;
    let codeFromDB = await GetMax();

    if (codeFromDB == NULL) {
        let letterCode = GetLetter(companyOrgin);
        let numberCode = 001;
    } else {
        let letterCode = GetLetter(companyOrgin);
        let numberCode = GetNumber(codeFromDB);
    }
    let companyCode = letterCode + numberCode;
    ProcessParsing(companyName, companyOrgin, companyCode)
    return companyCode;

}

async function GetLetter(orgin) {
    try {
        let letterCode = await orgin.substr(0, 3);
        return letterCode;
    } catch (error) {
        console.log("failed to extract the name \n Error " + error);
        return false;
    }
}


async function GetNumber(coded) {
    try {
        let numberCode = await coded.substr(2, 3);
        return numberCode;
    } catch (error) {
        console.log("failed to extract the number \n Error " + error);
        return false;
    }
}

async function ProcessParsing(companyName, companyOrgin, companyCode) {
    try {
        let companyObj = await { "Company Name": companyName, "Company Orgin": companyOrgin, "Company Code": companyCode };
        return JSON.Parse(companyObj);
    } catch (error) {
        console.log("failed to parse the company object \n Error: " + error);
    }
}

async function DatabaseInsertion(companyObj) {
    try {
        let database;
        database = GetDatabase();
        let { insertedID } = await database.collection(dbConfig.PRODUCTS_COMPANIES).insert();
        CloseConnection();
    } catch (error) {
        console.log("failed to insert the company to the Database \n Error: " + error);
        return false;
    }
}

async function GetMax() {
    try {
        let database;
        database = GetDatabase();
        let codeFromDB = await database.collection(dbConfig.PRODUCTS_COMPANIES).find().sort({ code: -1 }).limit(1)
        return codeFromDB;

    } catch (error) {
        console.log("failed to retrieve the company with the max id digits \n Error: " + error);
    }
}