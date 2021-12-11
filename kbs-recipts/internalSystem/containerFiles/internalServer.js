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


const { MakeSales } = require('./public/home/js/sell-products');

const { dbConfig } = require("../../mainConfig/db.config");
const { mServerConfig } = require('../../mainConfig/mainServer.config');

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

router.route("/success")
    .get(async function (req, res) {
        res.render("success");

        // res.render("display-companies");
    })

router.route("/sales")
    .post(async function (req, res) {
        console.log("SOLD::::: " + req.body.productCode[0]);
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