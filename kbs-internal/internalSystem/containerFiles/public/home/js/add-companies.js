const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');
const { Company } = require('../../../../../mongoDB/containerFiles/Models/company-model');
/* *************** 
 
Note: Since this is an internal system, and that only one user will use it a time
I assumed no parallelism and that entries will happen in sequence 

*************** */
async function InsertCompany(companyObj) {

    try {
        let storeIdentifier = await AssignStoreIdentifier(companyObj);
        let company = new Company(
            await storeIdentifier,
            await companyObj.companyName,
            await companyObj.companyOrigin,
            await SetDate()
        )
        let insertionResult = await DatabaseInsertion(companyObj);

        if (insertionResult) {
            return returnedObj = {
                result: insertionResult,
                message: storeIdentifier
            }
        } else {
            return returnedObj = {
                result: insertionResult,
                message: insertionResult
            }
        }
    } catch (error) {
        console.error("Could not create the object \n Error:" + error.message);
        if (error.message.includes("undefined")) {
            //  RecoverFromFirstEntryError(productObj.fabricPrimaryType, productObj.quality, productObj.companyName);
        }
    }
}



async function SetDate() {
    let today = await new Date();
    let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = await date + ' ' + time;
    return dateTime;
}

async function AssignStoreIdentifier(companyObj) {

    // 
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;

    // console.log("ADD PRODUCT JS FILE CALLED");
    //let companyName = await(companyObj.companyName).toString();
    //let companyOrigin = await(companyObj.companyOrigin).toString();

    // flags are set as 0 for the letter code and 1 to get the number 
    let nameCode = await companyObj.companyName.toString().toUpperCase();
    let letterCode = await companyObj.companyOrigin.toString().toUpperCase();
    //let numberCode = await companyObj.companyOrigin.toString().toUpperCase();
    //console.log("Number Code In MAIN IS::::::::::::::::: " + numberCode);
    let storeIdentifier = await nameCode.substr(0, 3) + "-" + await letterCode.substr(0, 3);
    console.log(storeIdentifier);
    return storeIdentifier;

    //ProcessParsing(companyName, companyOrigin, companyCode)
    //CloseConnection();
    //return companyCode;
}



/*

async function GetFromDB(origin, flag) {
    try {
        let database;
        database = await GetDatabase();

        if (flag == 0) {
            let nameCursorFromDB = await database.collection(`${dbConfig.COUNTRIES}`).find({ name: origin }).toArray();
            //   console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
            let returnedLetterCode = await GetLetter(nameCursorFromDB[0].code);
            //   console.log("LETTER CODE::::::::::::::::: " + returnedLetterCode);
            return returnedLetterCode;
        } else if (flag == 1) {
            let numCursorFromDB = await database.collection(`${dbConfig.COMPANIES}`).find({ Company_Origin: origin }).sort({ Entry_Date: -1 }).limit(1).toArray();

            // if (numCursorFromDB.includes("undefined")) {
            //     numCursorFromDB = 0;
            //     return numCursorFromDB;
            // } else {
            //console.log("ARRAY CONTAINS:::::: " + numCursorFromDB[0]._id);
            let returnedNumberCode = await GetNumber(numCursorFromDB[0]._id);
            return returnedNumberCode;
            // }
        }
    } catch (error) {
        if (error.message.includes("undefined")) {
            return RecoverFromUndefinedCode(0);
        } else {
            console.error("failed to retrieve from the database \n Error: " + error);
        }
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
    let examineInt = await coded.substr(7, 3);
    // console.log("EXAMINE AFTER SLICING IS:::::::: " + examineInt);

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
/*
async function ProcessParsing(companyName, companyOrigin, companyCode) {
    try {
        //  console.log("IN PROCESS PARSING CODE IS:::::::::::::::::::::::" + companyCode);
        let today = await new Date();
        let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = await date + ' ' + time;
        let containsUndefined = await companyCode.includes("undefined");
        //  console.log(containsUndefined);
        if (containsUndefined) {
            companyCode = await RecoverFromUndefinedCode(companyCode);
        }
        let companyObj = await { _id: companyCode, Company_Name: companyName, Company_Origin: companyOrigin, Entry_Date: dateTime };
        //let companyParsedObj = JSON.parse(companyObj);
        console.log(companyObj);
        DatabaseInsertion(companyObj);
    } catch (error) {
        console.error("failed to parse the company object \n Error: " + error);
    }
} 
 
*/
async function DatabaseInsertion(companyObj) {
    //  console.log("Inside the insertion function: " + companyObj.companyName);

    let companyExists = " الشركة مسجلة بالنظام مسبقا";
    try {
        let database;
        database = await GetDatabase();
        let { insertedID } = await database.collection(`${dbConfig.COMPANIES}`).insertOne(companyObj);
        // CloseConnection();
        console.log("Success..");
        return true;
    } catch (error) {
        let errorString = (error.message).toString();
        let containsDuplicate = errorString.includes("E11000");
        if (containsDuplicate) {
            return companyExists;
            //console.log("duplicate");
        } else {
            console.error("failed to insert the company to the Database \n Error: " + error);
            return false;
        }
    }
}


/*
async function RecoverFromDuplicateError(companyObj, errorString) {
    //let duplicateID = errorString.substr(101, 3);
    //duplicateID = parseInt(duplicateID);
    //console.log("SLICE::::::::::::::::::::" + duplicateID);
    let oldID = await companyObj._id;
    oldNumID = await oldID.substr(7, 3);
    newLetterID = await companyObj._id.substr(0, 7);
    oldNumID = await parseInt(oldNumID);
    newNumID = oldNumID + 1;
    //console.log(newNumID);
    newID = await newLetterID + newNumID;
    //console.log("THE ID IS:::::: " + newID);
    companyObj._id = newID;
    DatabaseInsertion(companyObj);
    return true;
}

async function RecoverFromUndefinedCode(num) {
    //let letterCode = oldCompanyCode.substr(0, 3);
    let numberCode = parseInt(num) + 1;
    //let companyCode = letterCode + numberCode;
    //console.log("After PARSINGGGGG::::::: " + numberCode);
    return numberCode.toString();
}



/** remove later  */
/*
async function GetOptions() {
    let database;
    database = await GetDatabase();
    let optionsCursor = await database.collection(`${dbConfig.COUNTRIES}`).find({}).toArray();
    console.log(optionsCursor[200].name);
    return optionsCursor;

}
*/

module.exports = { InsertCompany };