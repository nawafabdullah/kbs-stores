const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const router = express.Router();
const { InsertUser } = require('./public/UsersService/sign-up/signup');
const { dbConfig } = require("../../mainConfig/db.config");
const { RetrieveUser } = require('../containerFiles/public/UsersService/sign-in/signin');
const { mServerConfig } = require('../../mainConfig/mainServer.config');
const util = require('util'),
    request = util.promisify(require('request')),
    fs = require('fs'),
    fsp = fs.promises;

app.use(cors());
app.use(helmet());
//app.use(morgan('combined'));
app.listen(mServerConfig.PORT);
app.use("/", router);
app.use(express.static(__dirname + '/public/home'));
console.log(`listening at ${mServerConfig.HOST}:${mServerConfig.PORT}`);

router.route("/")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/home/"));
    })

router.route("/signup")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/UsersService/sign-up/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log("request recieved to insert");

        let insertion = await InsertUser(req.body, 002);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/signin")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/UsersService/sign-in/"));
    })
    .post(urlencodedParser, async function (req, res) {
        console.log(" request recieved to retrieve");
        res.redirect('https://app.example.io');
        RetrieveUser(req.body, dbConfig.DBADMINCOLL);
        res.writeHead(301, {
            content: "Success",
            Location: "/",
        });
        res.end("Success");
    })

router.route("/authoraize")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/UsersService/authoraize/"));
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
        res.sendFile(path.join(__dirname + "/public/Terms-And-Conditions/"));
    })

router.route("/downloadTerms")
    .get(function (req, res) {
        var file = fs.createReadStream(path.join(__dirname + '/public/Terms-And-Conditions/TermsFile/PrivacyPolicyForNawafWebsite.pdf'));
        var stat = fs.statSync(path.join(__dirname + '/public/Terms-And-Conditions/TermsFile/PrivacyPolicyForNawafWebsite.pdf'));
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=agreement.pdf');
        file.pipe(res);
    })

router.route("/products")
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + "/public/Products/"));
    })