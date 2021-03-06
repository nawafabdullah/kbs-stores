const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');

/* ***************          
 
Note: Since this is an internal system, and that only one user will use it a time
I assumed no parallelism and that entries will happen in sequence 

*************** */



// Discus whether the ID is assigned by store or by the system ??
async function InsertProduct(productObj) {
    let fabricID = await productObj.fabricID;
    let companyID = await productObj.companyCode;
    let metersAdded = await productObj.metersAdded;
    let fabricPrimaryType = await productObj.fabricPrimaryType;
    let fabricSecondaryType = await productObj.fabricSecondaryType;
    ProcessParsing(fabricID, companyID, metersAdded, fabricPrimaryType, fabricSecondaryType);
}


// implement to retrieve companies from DB and display them in a "select" tag 
async function GetCompaniesID() { }


async function CheckDuplicates(fabricID) {
    try {
        let database = await GetDatabase();
        let checkDuplicates = await database.collection(`${dbConfig.PRODUCTS}`).find({ id: fabricID }).toArray();
        if (checkDuplicates) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Failed to check for duplicate IDs \nError: " + error)
        return false;
    }
}


async function ProcessParsing(fabricID, companyID, metersAdded, fabricPrimaryType, fabricSecondaryType) {

    let today = await new Date();
    let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = await (date + ' ' + time).toString();
    let productObj = await { _id: fabricID, Company_ID: companyID, Number_Of_Meters: metersAdded, Primary_Type: fabricPrimaryType, Secondary_Type: fabricSecondaryType, Entry_Date: dateTime };
    DatabaseInsertion(productObj);
}

async function DatabaseInsertion(productObj) {
    let database = await GetDatabase();
    console.log(productObj);
    let checkEntry = await database.collection(`${dbConfig.PRODUCTS}`).insertOne(productObj);
    return true;
}







module.exports = { InsertProduct };








/*
async function InsertProduct(productObj) {
    //
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;

    // console.log("ADD PRODUCT JS FILE CALLED");
    let companyName = await (companyObj.companyName).toString();
    let companyOrigin = await (companyObj.companyOrigin).toString();

    // flags are set as 0 for the letter code and 1 to get the number
    let letterCode = await GetFromDB(companyOrigin, 0);
    let numberCode = await GetFromDB(companyOrigin, 1);
    console.log("Number Code In MAIN IS::::::::::::::::: " + numberCode);
    let companyCode = await letterCode + "-" + numberCode;
    ProcessParsing(companyName, companyOrigin, companyCode)
    //CloseConnection();
    return companyCode;
}

async function GetFromDB(origin, flag) {
    try {
        let database;
        database = await GetDatabase();

        if (flag == 0) {
            let nameCursorFromDB = await database.collection(`${dbConfig.COUNTRIES}`).find({ name: origin }).toArray();
            //  console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
            let returnedLetterCode = await GetLetter(nameCursorFromDB[0].code);
            return returnedLetterCode;
        } else if (flag == 1) {
            let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find({ Company_Origin: origin }).sort({ Entry_Date: -1 }).limit(1).toArray();
            console.log("ARRAY CONTAINS:::::: " + numCursorFromDB[0]._id);
            let returnedNumberCode = await GetNumber(numCursorFromDB[0]._id);
            return returnedNumberCode;
        }
    } catch (error) {
        console.error("failed to retrieve from the database \n Error: " + error);
    }
}

async function GetLetter(origin) {
    try {
        let letterCode = await origin.substr(0, 3);
        return letterCode;
    } catch (error) {
        console.error("failed to extract the name \n Error " + error);
        return false;
    }
}


async function GetNumber(coded) {
    let examineInt = await coded.substr(3, 3);
    console.log("EXAMINE AFTER SLICING IS:::::::: " + examineInt);

    examineInt = await parseInt(examineInt);
    //console.log("EXAMINE AFTER EXTRACTION IS:::::::: " + examineInt);
    try {
        if ((!examineInt) || (examineInt == NaN) || (coded == "undefined")) {
            let numberCode = 001;
            return numberCode;
        } else {
            //let numberCode = coded.toString();
            let numberCode = examineInt + 1;
            //     console.log("NUMBER CODE AFTER EXTRACTION IS:::::::: " + numberCode);
            //        numberCode = numberCode++;
            return numberCode;
        }

        //return numberCode;

    } catch (error) {
        console.error("failed to extract the number \n Error " + error);
        return false;
    }
}

async function ProcessParsing(companyName, companyOrigin, companyCode) {
    try {
        //  console.log("IN PROCESS PARSING CODE IS:::::::::::::::::::::::" + companyCode);
        let today = await new Date();
        let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = await date + ' ' + time;
        let containsUndefined = await companyCode.includes("undefined");
        console.log(containsUndefined);
        if (containsUndefined) {
            companyCode = await RecoverFromUndefinedCode(companyCode);
        }
        let companyObj = await { Company_Name: companyName, Company_Origin: companyOrigin, _id: companyCode, Entry_Date: dateTime };
        //let companyParsedObj = JSON.parse(companyObj);
        //console.log(companyObj);
        DatabaseInsertion(companyObj);
    } catch (error) {
        console.error("failed to parse the company object \n Error: " + error);
    }
}

async function DatabaseInsertion(companyObj) {
    try {
        let database;
        database = await GetDatabase();
        let { insertedID } = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).insertOne(companyObj);
        // CloseConnection();
        console.log("Success..");
        return true;
    } catch (error) {
        let errorString = (error.message).toString();
        let containsDuplicate = errorString.includes("E11000");
        if (containsDuplicate) {
            RecoverFromDuplicateError(companyObj, errorString);
            return true;
        }
        console.error("failed to insert the company to the Database \n Error: " + error);
        return false;
    }
}

async function RecoverFromDuplicateError(companyObj, errorString) {
    let duplicateID = errorString.substr(98, 3);
    duplicateID = parseInt(duplicateID);
    //console.log("SLICE::::::::::::::::::::" + duplicateID);
    let oldID = await companyObj._id;
    oldNumID = await oldID.substr(3);
    newLetterID = await oldID.substr(0, 3);
    oldNumID = await parseInt(oldNumID);
    newNumID = oldNumID + 1;
    //console.log(newNumID);
    newID = await newLetterID + newNumID;
    //console.log("THE ID IS:::::: " + newID);
    ProcessParsing(companyObj.Company_Name, companyObj.Company_Origin, newID);
    return true;
}

async function RecoverFromUndefinedCode(oldCompanyCode) {
    let letterCode = oldCompanyCode.substr(0, 3);
    let numberCode = 001;
    let companyCode = letterCode + numberCode;
    console.log("After PARSINGGGGG::::::: " + companyCode);
    return companyCode;
}

module.exports = { InsertCompany };
*/