const express = require("express");
const path = require("path");
const jsdom = require("jsdom");
const bodyParser = require("body-parser");
const urlencodedParser = express.urlencoded({ extended: true });
const cors = require('cors');
const got = require('got');
const helmet = require('helmet');
const morgan = require('morgan');
const url = require('url');
const app = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { JSDOM } = jsdom;

//const $ = require("jquery"); 

const { InsertUser } = require('./public/home/UsersService/sign-up/signup');

const { InsertCompany } = require('./public/home/js/add-companies');

const { InsertProduct } = require('./public/home/js/add-products');
//const { AddCompaniestoDB } = require('./public/home/Main-Products/Companies/Add-Companies/add-companies');

const { GetProducts } = require('./public/home/js/get-products');

const { DisplayCompanies } = require("./public/home/js/display-companies");
const { DisplayProducts } = require("./public/home/js/display-products");
const { GetAProduct } = require("./public/home/js/get-product");
const { GetACompany } = require("./public/home/js/get-company");





const { RenderTables } = require('./public/home/js/render-tables');

const { MakeSales } = require('./public/home/js/sell-products');

const { dbConfig } = require("../../mainConfig/db.config");
const { RetrieveUser } = require('./public/home/UsersService/sign-in/signin');
const { mServerConfig } = require('../../mainConfig/mainServer.config');
//const {ValidateMainChoice} = require ('./public/Main-Products/main-products');
const util = require('util'),
    request = util.promisify(require('request')),
    fs = require('fs'),
    fsp = fs.promises;

app.use(cors());
app.use(helmet());
//app.use(morgan('combined'));
app.listen(mServerConfig.PORT);
app.use(express.urlencoded({
    extended: true
}))
app.use("/", router);
app.use(express.static(__dirname + '/public/home'));
console.log(`listening at ${mServerConfig.HOST}:${mServerConfig.PORT}`);


app.use('/jquery', express.static(__dirname + '../../node_modules/jquery/dist/'));
app.set('views', path.join(__dirname + '/public/home/Views/'));


app.set('view engine', 'ejs');



router.route("/")
    .get(function (req, res) {
        res
            .sendFile(path.join(__dirname + "/public/home/"));
        //  .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        //.send("<html><head></head><body></body></html>");
    })

router.route("/signup")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/UsersService/sign-up/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log("request received to insert");

        let insertion = await InsertUser(req.body, 002);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/signin")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/UsersService/sign-in/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log(" request received to retrieve");
        res.redirect('https://app.example.io');
        RetrieveUser(req.body, dbConfig.DBADMINCOLL);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/authoraize")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/UsersService/authoraize/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log(" request recieved to authoraize");
        RetrieveUser(req.body, dbConfig.DBADMINCOLL);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/terms")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/Terms-And-Conditions/"));
    })

router.route("/downloadTerms")
    .get(function (req, res) {
        var file = fs.createReadStream(path.join(__dirname + '/public/home/Terms-And-Conditions/TermsFile/PrivacyPolicyForNawafWebsite.pdf'));
        var stat = fs.statSync(path.join(__dirname + '/public/home/Terms-And-Conditions/TermsFile/PrivacyPolicyForNawafWebsite.pdf'));
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=agreement.pdf');
        file.pipe(res);
    })

router.route("/products")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/Views/main-products.html"));
    })

/*
 .post(async function (req, res) {
     //res.sendFile(path.join(__dirname + "/public/home/Main-Products/main-products"));
     const errors = validationResult(req);
     let companyName = await req.body.companyName;
     if (!errors.isEmpty()) {
         // There are errors. Render form again with sanitized values/errors messages.
         // Error messages can be returned in an array using `errors.array()`.
     }
     else {
         // Data from form is valid.
         console.log(companyName);
     }


 })

 */

router.route("/products/add-product")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/Views/add-products.html"));
    })

    .post(async function (req, res) {
        //res.sendFile(path.join(__dirname + "/public/home/Main-Products/main-products"));
        //const errors = validationResult(req);

        const successMessage = "تم إضافة القطعة بنجاح \n رمز القطعة: ";
        const errorMessage = "لم نستطع إضافة القطعة";
        let companyCode = await req.body.companyOtions;
        let productObj = await JSON.parse(req.body.productChoice);

        productObj.companyCode = await companyCode;

        console.log("PRODUCT:::::: " + await productObj.companyCode);

        let insertionStatus = InsertProduct(await productObj);

        console.log("SERVER:::::: " + (await insertionStatus).result)


        if ((await insertionStatus).result != true) {
            res.render("error", { message: errorMessage + (await insertionStatus).result });
        } else {
            res.render("success", { message: successMessage + (await insertionStatus).message });
        }

        /*
        res.writeHead(301, {
            content: "Success",
            Location: "/success",
        });
*/

        //if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        // Error messages can be returned in an array using `errors.array()`.


        //  console.log("ERRORS EXIST");
        // }
        //else {
        // Data from form is valid.
        // res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        //res.send("<html><head></head><body></body></html>");
        // console.log("I am here!!");

    })


router.route("/products/add-product/link-company")
    .post(async function (req, res) {
        let productObj = await req.body;
        //console.log(productObj.testField);
        res.render("fabric-company-link", { data: { productObj: await productObj, companies: await DisplayCompanies() } });
    })

router.route("/products/add-product/fainalize-product")
    .post(async function (req, res) {
        console.log("INSIDE SERVER ++++ FINALAIZE:", await productObj);
        //res.render("fabric-company-link", { data: { productObj: await productObj, companies: await DisplayCompanies() } });
        res.send("success");

    })



router.route("/products/display-products")
    .get(async function (req, res) {
        res.render("render-products", { products: await DisplayProducts() });

    })

router.route("/products/modify-products")
    .get(async function (req, res) {

    })






router.route("/products/add-company")
    .get(async function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/Views/add-companies.html"));
    })


    .post(async function (req, res) {
        const successMessage = "تم إضافة القطعة بنجاح \n رمز الشركة: ";
        const errorMessage = "لم نستطع إضافة الشركة";
        //let companyCode = await req.body.companyOtions;
       // let companyObj = await JSON.parse(req.body.productChoice);

        //companyObj.companyCode = await companyCode;

//        console.log("PRODUCT:::::: " + await companyObj.companyCode);

        let companyObj = await req.body;

        console.log ("OBJ CREATION::::::: " , companyObj); 

        let insertionStatus = InsertCompany(await companyObj);

        console.log("SERVER:::::: " + (await insertionStatus).result)


        if ((await insertionStatus).result != true) {
            res.render("error", { message: errorMessage + (await insertionStatus).result });
        } else {
            res.render("success", { message: successMessage + (await insertionStatus).message });
        }


    })

router.route("/success")
    .get(async function (req, res) {
        res.render("success");

        // res.render("display-companies");
    })



router.route("/products/display-companies")
    .get(async function (req, res) {
        res.render("render-companies", { companies: await DisplayCompanies() });

        // res.render("display-companies");
    })



router.route("/products/addProducts/fileupload")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "./public/home/Main-Products/Companies/Modify-Companies/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log(" request received to modify companies");
        console.log(req.param);
        //console.log(AddCompaniestoDB(req.body.inputfile));
        //req.setValue("application/json", forHTTPHeaderField: "Content-Type");
        //req.httpBody = data;
        AddCompaniestoDB(req);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/sales")
    
    .get(async function (req, res) {
        res.render("sell-products", { response: "النظام يعمل بشكل طبيعي" });
    })

    .post(async function (req, res) {
        //console.log("SOLD::::: " + req.body.productCode[1]);
        const successMessage = "تم البيع بنجاح";
        let serverResponse = await MakeSales(req.body);
        console.log("Server Response is:::::: " + serverResponse);

        if (serverResponse == true) {
            res.render("success", { message: successMessage });
            //res.send("success");
        } else {
            res.render("sell-products", { response: serverResponse });
        }

    })