let easyinvoice = require('easyinvoice');
var fs = require('fs');

let data = require("../../../../../mongoDB/containerFiles/Models/recipt-model");

const resourcesPath = "internalSystem/containerFiles/public/resources/";
//Create your invoice! Easy!

//async function GenerateRecipt(invoiceNumber, invoiceDate, items) {


async function GenerateRecipt(invoiceData) {


    try {
        // let data = await data;
        data.documentTitle = "فاتورة شراء";
        data.currency = "SAR";
        data.taxNotation = "VAT";
        data.marginTop = 25;
        data.marginRight = 25;
        data.marginLeft = 25;
        data.marginBottom = 25;
        data.sender = {
            company: "مركز خالد عمر بن صديق ",
            address: "المربع , طريق الملك فيصل",
            zip: "JPW7+X6",
            city: "الرياض",
            country: "المملكة العربية السعودية"
        };
        //data.logo = "./images/logo.png"
        //data.logo = "/mnt/c/Users/nawaf/Personal_Projects/recipt/images/logo.png";
       
        data.invoiceNumber = "r-" + await invoiceData.invoiceNumber;
        data.invoiceDate = await SetDate();

        data.products = invoiceData.items || '';

        // data.products = [
        //   {
        //     items.productCode, 
        //}
        //]
        console.log(data);


        const result = await easyinvoice.createInvoice(data);
        await fs.writeFileSync(`${resourcesPath}${data.invoiceNumber}.pdf`, result.pdf, 'base64');


        // easyinvoice.createInvoice(data, function (result) {
        //The response will contain a base64 encoded PDF file
        //console.log(result.pdf);



        //const data = {};





    } catch (error) {

        console.error("Could not generate the recipt \n " + error);
    }
}


async function SetDate() {
    let today = await new Date();
    let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = await (date + ' ' + time).toString();
    return dateTime;
}


/*
let items = {
    productCode: "C-001",
    metersBought: 20,
    price: 10
}


let items = [];

items = [
    {
        "description": "C-001",
        quantity: 20,
        price: 10
    }

    ,
    {
        "description": "C-1111",
        quantity: 80,
        price: 500
    }

]
*/


module.exports = { GenerateRecipt };