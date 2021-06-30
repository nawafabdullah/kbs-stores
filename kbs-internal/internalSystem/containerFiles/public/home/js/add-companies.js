const { GetDatabase, CloseConnection } = require('../../../../../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../../../../../mainConfig/db.config');

/* *************** 

Note: Since this is an internal system, and that only one user will use it a time
I assume no parallelism and that entries will happen in sequence 

*************** */
async function InsertCompany(companyObj) {
    // 
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;

    // console.log("ADD PRODUCT JS FILE CALLED");
    let companyName = await (companyObj.companyName).toString();
    let companyOrgin = await (companyObj.companyOrgin).toString();
    //let codeFromDB = await GetFromDB().toString();

    /*
        if (codeFromDB == null) {
            let letterCode = await GetLetter(companyOrgin);
            let numberCode = 001;
        } else {
            let letterCode = await GetLetter(companyOrgin);
            let numberCode = await GetNumber(codeFromDB);
        }
      
      */
    // flags are set as 0 for the letter code and 1 to get the number 
    let letterCode = await GetFromDB(companyOrgin, 0);
    let numberCode = await GetFromDB(companyOrgin, 1);

    console.log("IN MAIN LETTER CODE IS::::::::::::::::::::" + letterCode);
    console.log("IN MAIN NUMBER CODE IS::::::::::::::::::::" + numberCode);


    let companyCode = await letterCode + "-" + numberCode;
    ProcessParsing(companyName, companyOrgin, companyCode)
    //CloseConnection();
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
    let examineInt = await coded.substr(3);
    console.log("EXAMINE AFTER SLICING IS:::::::: " + examineInt);

    examineInt = await parseInt(examineInt);
    console.log("EXAMINE AFTER EXTRACTION IS:::::::: " + examineInt);
    try {
        if ((!examineInt) || (examineInt == NaN)) {
            let numberCode = 001;
            return numberCode;
        } else {
            //let numberCode = coded.toString();
            let numberCode = examineInt + 1;
            console.log("NUMBER CODE AFTER EXTRACTION IS:::::::: " + numberCode);
            //        numberCode = numberCode++;
            return numberCode;
        }

        //return numberCode;

    } catch (error) {
        console.log("failed to extract the number \n Error " + error);
        return false;
    }
}

async function ProcessParsing(companyName, companyOrgin, companyCode) {
    try {
        console.log("IN PROCESS PARSING CODE IS:::::::::::::::::::::::" + companyCode);
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let companyObj = await { Company_Name: companyName, Company_Orgin: companyOrgin, _id: companyCode, Entry_Date: dateTime };
        //let companyParsedObj = JSON.parse(companyObj);
        //console.log(companyObj);
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
        // CloseConnection();
    } catch (error) {
        console.log("failed to insert the company to the Database \n Error: " + error.message);
        let errorString = (error.message).toString();
        let containsDuplicate = errorString.includes("E11000");
        console.log(containsDuplicate);
        let duplicateID = errorString.substr(98, 1);
        duplicateID = parseInt(duplicateID);
        console.log("SLICE::::::::::::::::::::" + duplicateID);


        return false;
    }
}

async function GetFromDB(orgin, flag) {
    try {
        let database;
        database = await GetDatabase();

        if (flag == 0) {
            let nameCursorFromDB = await database.collection(`${dbConfig.COUNTRIES}`).find({ name: orgin }).toArray();
            console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
            let returnedLetterCode = await GetLetter(nameCursorFromDB[0].code);
            return returnedLetterCode;
        } else if (flag == 1) {
            let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find({ Company_Orgin: orgin }).sort({ Entry_Date: -1 }).limit(1).toArray();
            console.log("ARRAY CONTAINS:::::: " + numCursorFromDB[0]._id);
            let returnedNumberCode = await GetNumber(numCursorFromDB[0]._id);
            return returnedNumberCode;
        }

    } catch (error) {
        console.error("failed to retrieve from the database \n Error: " + error);
    }
}

module.exports = { InsertCompany };