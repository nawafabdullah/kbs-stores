const {GetDatabase} = require ("../../../../../mongoDB/containerFiles/mongo");

async function DisplayCompanies() {

    let database;
    database = await GetDatabase();
    let companies = await database.collection(`${dbConfig.COMPANIES}`).find({  }).toArray();
        //   console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
        console.log("PRINTING::::::::" + companies[1]);
        //   console.log("LETTER CODE::::::::::::::::: " + returnedLetterCode);
        return companies;
    }

    module.exports = {DisplayCompanies};