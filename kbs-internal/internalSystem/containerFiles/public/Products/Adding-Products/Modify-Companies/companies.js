const fs = require('fs');
const { stringify } = require('querystring');

const http = require('http');
const formidable = require('formidable');
 

function AddCompaniestoDB(dataFile) {
    if (dataFile.url == '/products/addProducts/companies') {
      let form = new formidable.IncomingForm();

      console.log("FILE UPLOADED !!!!!!!!!");

      form.parse(dataFile, function (err, fields, files) {
        consolele.log('File uploaded');
      });
    } else {

      console.log("FAILEEEEEDDDDDD");
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  


}






/*
function AddCompaniestoDB(dataFile) {
 
  return fs.readFile(dataFile, 'utf8');
 
 
  /*
 return fs.readFile(dataFile, 'utf8', (err, data) => {
 
  if (err) {
    console.error("Could not read companies file " + err);
    return 0;
  }
  console.log(data.toString());
})
*/



/*
async function AddCompaniestoDB(dataFile) {
  try {
    let data = await dataFile.text();
    console.log(data);
  } catch (error) {
    console.error("Could not read companies file" + error);
  }
  return 1;
}
 
*/

module.exports = {
  AddCompaniestoDB
};