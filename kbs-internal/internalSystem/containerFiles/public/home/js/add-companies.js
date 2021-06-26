const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');



async function InsertCompany(companyObj) {
    // 
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;

    console.log("ADD PRODUCT JS FILE CALLED");
    let companyName = await (companyObj.companyName).toString();
    let companyOrgin = await (companyObj.companyOrgin).toString();
    let codeFromDB = await GetMax();
    /*
        if (codeFromDB == null) {
            let letterCode = await GetLetter(companyOrgin);
            let numberCode = 001;
        } else {
            let letterCode = await GetLetter(companyOrgin);
            let numberCode = await GetNumber(codeFromDB);
        }
      
      */

    let letterCode = await GetLetter(companyOrgin);
    let numberCode = await GetNumber(codeFromDB);

    let companyCode = await letterCode + "-" + numberCode;
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
        numberCode.toNumber();
        return numberCode++;
    } catch (error) {
        console.log("failed to extract the number \n Error " + error);
        return false;
    }
}

async function ProcessParsing(companyName, companyOrgin, companyCode) {
    try {
        let companyObj = await { "Company Name": companyName, "Company Orgin": companyOrgin, "Company Code": companyCode };
        //let companyParsedObj = JSON.parse(companyObj);
        console.log(companyObj);
        DatabaseInsertion(companyObj);
    } catch (error) {
        console.log("failed to parse the company object \n Error: " + error);
    }
}

async function DatabaseInsertion(companyObj) {
    try {
        let database;
        database = await GetDatabase();
        let { insertedID } = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).insertOne(companyObj);
        CloseConnection();
    } catch (error) {
        console.log("failed to insert the company to the Database \n Error: " + error);
        return false;
    }
}

async function GetMax() {
    try {
        let database;
        database = await GetDatabase();
        let codeFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find().sort({ code: -1 }).limit(1);
        //console.log("CODE RECIEVED FROM DB IS::::::: " + codeFromDB);
        codeFromDB = parseInt(codeFromDB);
        return codeFromDB;

    } catch (error) {
        console.log("failed to retrieve the company with the max id digits \n Error: " + error);
    }
}

module.exports = { InsertCompany };