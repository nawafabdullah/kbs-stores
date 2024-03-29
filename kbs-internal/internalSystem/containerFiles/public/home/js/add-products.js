const {
    GetDatabase, 
    CloseConnection,
  } = require("../../../../../mongoDB/containerFiles/mongo");
  const { dbConfig } = require("../../../../../mainConfig/db.config");
  const {
    Fabric,
  } = require("../../../../../mongoDB/containerFiles/Models/fabric-model");
  //const $ = require("jquery");
  //const document = require("jquery");
  /* ***************           
   
  Note: Since this is an internal system, and that only one user will use it a time
  I assumed no parallelism and that entries will happen in sequence 
  
  *************** */
  
  // Discus whether the ID is assigned by store or by the system ??
  async function InsertProduct(productObj) {
    let storeIdentifier = await AssignStoreIdentifier(productObj);

    try {
      let fabric = new Fabric(
        await storeIdentifier,
        await productObj.designNumber,
        await productObj.fabricPrimaryType,
        await productObj.fabricSecondaryType,
        await productObj.fabricQuality,
        await productObj.fabricColor,
        await productObj.metersAdded,
        await productObj.fabricPrice,
        await productObj.companyCode,
        await SetDate()
      );
      // console.log(fabric);
      
      let insertionResult = await DatabaseInsertion(fabric); 

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
      //  RetrieveLatestNum(fabric);
      // AssignFabricCode(productObj);
    }
    catch (error) {
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
    let dateTime = await (date + ' ' + time).toString();
    return dateTime;
  }
  
  async function AssignStoreIdentifier(productObj) {
  
    //  console.log("INSIDE THE FUNCTION");
    //let companyCode = await productObj.companyCode.toString();
  
    let companyCode = await productObj.companyCode.toString().toUpperCase();
    let designNumber = await productObj.designNumber.toString().toUpperCase();
    let fabricColor = await productObj.fabricColor.toString().toUpperCase();
  
    let storeIdentifier = await companyCode.substr(0, 3) + "-" + await designNumber.substr(0, await LengthOfString(designNumber)) + "-" + await fabricColor.substr(0, await LengthOfString(fabricColor));
    console.log(storeIdentifier);
    return storeIdentifier;
  }
  
  async function DatabaseInsertion(productObj) {
    //  console.log("Inside the insertion function: " + companyObj.companyName);
    
    let productExists = " القطعة مسجلة بالنظام مسبقا";
    try {
      let database;
      database = await GetDatabase();
      let { insertedID } = await database.collection(`${dbConfig.PRODUCTS}`).insertOne(productObj);
      // CloseConnection();
      console.log("Success..");
      return true;
    } catch (error) {
      let errorString = (error.message).toString();
      let containsDuplicate = errorString.includes("E11000");
      if (containsDuplicate) {
        return productExists; 
        //console.log("duplicate");
      } else {
        console.error("failed to insert the company to the Database \n Error: " + error);
        return false;
      }
    }
  }
  
  async function LengthOfString(string) {
    return string.length;
  }



  /*
  
  async function RecoverFromDuplicateError(productObj, errorString) {
    // let duplicateID = errorString.substr(98, 3);
    // duplicateID = parseInt(duplicateID);
    //console.log("SLICE::::::::::::::::::::" + duplicateID);
    let oldID = await productObj._id;
    oldNumID = await oldID.substr(2);
    newLetterID = await oldID.substr(0, 2);
    oldNumID = await parseInt(oldNumID);
    newNumID = oldNumID + 1;
    console.log("Recovery" + newNumID);
    newID = await newLterID + newNumID;
    //console.log("THE ID IS:::::: " + newID);
    productObj._id = newID;
    DatabaseInsertion(productObj);
    return true;
  }
  
  
  var up = document.getElementById('geeks');
  var down = document.getElementById('gfg');
  var select = document.getElementById("arr");
  var elmts = ["HTML", "CSS", "JS", "PHP", "jQuery"];
  up.innerHTML = "Click on the button to "
    + "perform the operation" +
    ".<br>Array - [" + elmts + "]";
  
  // Main function
  function GFG_Fun() {
    for (var i = 0; i < elmts.length; i++) {
      var optn = elmts[i];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      select.appendChild(el);
    }
    down.innerHTML = "Elements Added";
  }
  
  
  
  
  
  */
  
  
  module.exports = { InsertProduct }
  /*
  async function AssignFabricCode(fabricObj) {
    try {
      let database = await GetDatabase();
      //let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find().sort({ Entry_Date: -1 }).limit(1).toArray();
      //OptimizeNumberCode(primaryType, quality, companyName, await numCursorFromDB._id.toString());
    } catch (error) {
      console.error("Could not retrieve the number from the database \nError " + error);
      if (error.message.includes("undefined")) {
        RecoverFromFirstEntryError(primaryType, quality, companyName);
      }
    }
  }
  */
  
  /*
  async function OptimizeNumberCode(primaryType, quality, companyName, num) {
    //let old_ID = num.substr(14, 3);
    let old_ID = parseInt(num);
    let new_ID = old_ID + 1;
  
    console.log("inside OPTIMIZE:::::" + new_ID);
  
    IDParsing(primaryType, quality, companyName, new_ID);
  }
  
  async function IDParsing(primaryType, quality, companyName, numberCode) {
    let fabricID = await primaryType.substr(0, 4) + "-" + quality.substr(0, 4) + "-" + companyName.substr(0, 4) + "-" + numberCode;
  
    console.log("INSIDE PARSING::::: " + fabricID);
    return fabricID;
  }
  
  
  async function RecoverFromFirstEntryError(primaryType, quality, companyName) {
    return OptimizeNumberCode(primaryType, quality, companyName, 0);
  }
  
  
  
  module.exports = { InsertProduct };
  
  /*
    let fabricID = await productObj.fabricID;
    let companyName = await productObj.companyName;
    let metersAdded = await productObj.metersAdded;
    let fabricPrimaryType = await productObj.fabricPrimaryType;
    let fabricQuality = await productObj.quality;
    let fabricPrice = await productObj.price;
    //let returned = GetCompanies();
    //console.log(returned);
  
    _fabricID = CheckDuplicates(fabricID);
    ProcessParsing(_fabricID, companyName, metersAdded, fabricPrimaryType, fabricQuality, fabricPrice);
  */
  
  
  //}
  
  
  /*
  
  // implement to retrieve companies from DB and display them in a "select" tag
  async function GetCompanies() {
    let database = await GetDatabase();
    let companiesArr = await database
      .collection(`${dbConfig.PRODUCTS}`)
      .find()
      .toArray();
  
    /*
      document.write('<!DOCTYPE html>'
          + '<html>'
          + '<head lang="en">'
          + '<meta charset="UTF-8">'
          + '<title></title>'
          + '<link rel="stylesheet" type="text/css" href="css/quiz.css" />'
          + '</head>'
          + ' <body>'
  
          + '<div id="divid">Next</div>'
          + '<script type="text/javascript" src="js/quiz.js"></script>'
          + '</body>'
          + '</html>');
  
  */
  
    //  let select = document.getElementById("select"),
  
  
  
  /*
  return (arr = [
    "html",
    "css",
    "java",
    "javascript",
    "php",
    "c++",
    "node.js",
    "ASP",
    "JSP",
    "SQL",
  ]);
  
  for (var i = 0; i < arr.length; i++) {
    var option = document.createElement("OPTION"),
      txt = document.createTextNode(arr[i]);
    option.appendChild(txt);
    option.setAttribute("value", arr[i]);
    select.insertBefore(option, select.lastChild);
  }
  }
  
  async function CheckDuplicates(fabricID) {
  try {
    let database = await GetDatabase();
    let containsDuplicates = await database
      .collection(`${dbConfig.PRODUCTS}`)
      .find({ _id: fabricID })
      .toArray();
    if (containsDuplicates) {
      RecoverFromDuplicateError(fabricID);
    }
    return true;
  } catch (error) {
    console.error("Failed to check for duplicate IDs \nError: " + error);
    return false;
  }
  }
  
  async function ProcessParsing(
  fabricID,
  companyName,
  metersAdded,
  fabricPrimaryType,
  fabricQuality
  ) {
  DatabaseInsertion(productObj);
  }
  
  async function DatabaseInsertion(productObj) {
  try {
    let productID;
    let database = await GetDatabase();
    console.log(productObj);
    let containsDuplicates = CheckDuplicates(productObj._id);
    if (containsDuplicates) {
      productID = await RecoverFromDuplicateError(productObj._id);
    }
  } catch (error) {
    // let errorString = (error.message).toString();
    // let containsDuplicate = errorString.includes("E11000");
    // if (containsDuplicate) {
    //     RecoverFromDuplicateError(productObj, errorString);
    //     return true;
    // }
    console.error(
      "failed to insert the company to the Database \n Error: " + error
    );
    return false;
  }
  }
  
  async function RecoverFromDuplicateError(productID) {
  duplicateID = parseInt(duplicateID);
  //console.log("SLICE::::::::::::::::::::" + duplicateID);
  let oldID = await companyObj._id;
  oldNumID = await oldID.substr(3);
  newLetterID = await oldID.substr(0, 3);
  oldNumID = await parseInt(oldNumID);
  newNumID = oldNumID + 1;
  //console.log(newNumID);
  newID = (await newLetterID) + newNumID;
  //console.log("THE ID IS:::::: " + newID);
  ProcessParsing(companyObj.Company_Name, companyObj.Company_Origin, newID);
  return true;
  }
  
  module.exports = { InsertProduct };
  
  /*
  async function InsertProduct(productObj) {
    //
    //  let companyName, companyOrgin, companyCode, codeFromDB, letterCode, numberCode;
  
    // console.log("ADD PRODUCT JS FILE CALLED");
    let companyName = await (companyObj.companyName).toString();
    let companyOrigin = await (companyObj.companyOrigin).toString();
  
    // flags are set as 0 for the letter code and 1 to get the number
    let letterCode = await GetFromDB(companyOrigin, 0);
    let numberCode = await GetFromDB(companyOrigin, 1);
    console.log("Number Code In MAIN IS::::::::::::::::: " + numberCode);
    let companyCode = await letterCode + "-" + numberCode;
    ProcessParsing(companyName, companyOrigin, companyCode)
    //CloseConnection();
    return companyCode;
  }
  
  async function GetFromDB(origin, flag) {
    try {
        let database;
        database = await GetDatabase();
  
        if (flag == 0) {
            let nameCursorFromDB = await database.collection(`${dbConfig.COUNTRIES}`).find({ name: origin }).toArray();
            //  console.log("The name CURSOR CONTAINS:::::: " + nameCursorFromDB[0].code);
            let returnedLetterCode = await GetLetter(nameCursorFromDB[0].code);
            return returnedLetterCode;
        } else if (flag == 1) {
            let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find({ Company_Origin: origin }).sort({ Entry_Date: -1 }).limit(1).toArray();
            console.log("ARRAY CONTAINS:::::: " + numCursorFromDB[0]._id);
            let returnedNumberCode = await GetNumber(numCursorFromDB[0]._id);
            return returnedNumberCode;
        }
    } catch (error) {
        console.error("failed to retrieve from the database \n Error: " + error);
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
    let examineInt = await coded.substr(3, 3);
    console.log("EXAMINE AFTER SLICING IS:::::::: " + examineInt);
  
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
  
  async function ProcessParsing(companyName, companyOrigin, companyCode) {
    try {
        //  console.log("IN PROCESS PARSING CODE IS:::::::::::::::::::::::" + companyCode);
        let today = await new Date();
        let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = await date + ' ' + time;
        let containsUndefined = await companyCode.includes("undefined");
        console.log(containsUndefined);
        if (containsUndefined) {
            companyCode = await RecoverFromUndefinedCode(companyCode);
        }
        let companyObj = await { Company_Name: companyName, Company_Origin: companyOrigin, _id: companyCode, Entry_Date: dateTime };
        //let companyParsedObj = JSON.parse(companyObj);
        //console.log(companyObj);
        DatabaseInsertion(companyObj);
    } catch (error) {
        console.error("failed to parse the company object \n Error: " + error);
    }
  }
  
  async function DatabaseInsertion(companyObj) {
    try {
        let database;
        database = await GetDatabase();
        let { insertedID } = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).insertOne(companyObj);
        // CloseConnection();
        console.log("Success..");
        return true;
    } catch (error) {
        let errorString = (error.message).toString();
        let containsDuplicate = errorString.includes("E11000");
        if (containsDuplicate) {
            RecoverFromDuplicateError(companyObj, errorString);
            return true;
        }
        console.error("failed to insert the company to the Database \n Error: " + error);
        return false;
    }
  }
  
  async function RecoverFromDuplicateError(companyObj, errorString) {
    let duplicateID = errorString.substr(98, 3);
    duplicateID = parseInt(duplicateID);
    //console.log("SLICE::::::::::::::::::::" + duplicateID);
    let oldID = await companyObj._id;
    oldNumID = await oldID.substr(3);
    newLetterID = await oldID.substr(0, 3);
    oldNumID = await parseInt(oldNumID);
    newNumID = oldNumID + 1;
    //console.log(newNumID);
    newID = await newLetterID + newNumID;
    //console.log("THE ID IS:::::: " + newID);
    ProcessParsing(companyObj.Company_Name, companyObj.Company_Origin, newID);
    return true;
  }
  
  async function RecoverFromUndefinedCode(oldCompanyCode) {
    let letterCode = oldCompanyCode.substr(0, 3);
    let numberCode = 001;
    let companyCode = letterCode + numberCode;
    console.log("After PARSINGGGGG::::::: " + companyCode);
    return companyCode;
  }
  
  module.exports = { InsertCompany };
  */
  
  
  