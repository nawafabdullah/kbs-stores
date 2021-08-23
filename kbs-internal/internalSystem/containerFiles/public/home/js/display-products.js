const {
    GetDatabase,
    CloseConnection,
} = require("../../../../../mongoDB/containerFiles/mongo");
const { dbConfig } = require("../../../../../mainConfig/db.config");
const {
    Fabric,
} = require("../../../../../mongoDB/containerFiles/Models/fabric-model");


async function DisplayProducts() {
    let database = await GetDatabase();
    let codeCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find().sort({ Entry_Date: -1 }).toArray();
    return codeCursorFromDB;

    /*
    for (item in codeCursorFromDB) {
        //   console.log(codeCursorFromDB[item]);
        let row = enrolled.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = codeCursorFromDB[i].Store_Identifier;
        cell2.innerHTML = courseArray[i].Quality;
        cell3.innerHTML = courseArray[i].Quality;
    }
    */

}

//return codeCursorFromDB;




DisplayProducts();

module.exports = { DisplayProducts };