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
    let codeFromDB = await GetFromDB().toString();

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
    examineInt = await parseInt(examineInt);
    console.log("EXAMINE AFTER EXTRACTION IS:::::::: " + examineInt);
    try {
        if (!examineInt) {
            let numberCode = 001;
            return numberCode;
        } else {
            //let numberCode = coded.toString();
            let numberCode = examineInt;
            console.log("NUMBER CODE AFTER EXTRACTION IS:::::::: " + numberCode);
            numberCode = numberCode++;
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
        let companyObj = await { Company_Name: companyName, Company_Orgin: companyOrgin, _id: companyCode };
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
        console.log("failed to insert the company to the Database \n Error: " + error);
        return false;
    }
}

async function GetFromDB() {
    try {
        let database;
        database = await GetDatabase();
        let cursorFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find().sort({ _id: -1 }).limit(1).toArray();
        ///for await (const doc of cursorFromDB) {
        /// cursorFromDB.stream().on("_ID", doc => console.log("SFTER STRAM ISSSS:::::: " + doc));


        //console.log("ARRAY CONTAINS:::::: " + cursorFromDB[0]._id);


        //CloseConnection();
        return cursorFromDB[0]._id;
    } catch (error) {
        console.log("failed to retrieve the company with the max id digits \n Error: " + error);
    }
}

module.exports = { InsertCompany };