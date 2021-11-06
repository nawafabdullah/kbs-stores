const fs = require('fs')

let number = "r1001";





async function GenerateRecipts(product, flag) {

    const header = "فاتورة شـراء
    "مركــز خالد عمر بن صــديق 


}


//let numOfItems =  


const content = `فـاتورة شراء
رقم الفاتوره ${number}
تجــربة` ;

fs.writeFile(`../../resources/${number} `, content, err => {
    if (err) {
        console.error(err)
        return
    }
    //file written successfully
})


async function AddItems(productCode, metersBought) {




}


async function GetReciptNumber() {

    try {
        let database = await GetDatabase();
        let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find().sort({ Entry_Date: -1 }).limit(1).toArray();
        console.log("recipt # Obtained:::::: " + numCursorFromDB);
    } catch (error) {
        console.error("Could not get latest recipt number \n" +error);


    }


/*
async function Add_Items(productCode, metersBought) {


    const fakeDataExcel = [
        {
            "Id": 1,
            "name": "Michael",
            "country": "England"
        },
        {
            "Id": 2,
            "name": "Charles",
            "country": "Canada"
        }
    ]


    for (let i = 0; i < fakeDataExcel.length; i++) {
        (function (i) {
            window.setTimeout(function () {
                let doc = new Document();
                doc.createParagraph(`Id: ${fakeDataExcel[i]['Id']}`);
                doc.createParagraph(`Name: ${fakeDataExcel[i]['name']}`);
                doc.createParagraph(`Country:  ${fakeDataExcel[i]['country']}`);
                saveDocumentToFile(doc, `user${fakeDataExcel[i]['name']}-${fakeDataExcel[i]['Id']}.docx`);
            }, i * 2000);
        })(i);
    }
}
*/