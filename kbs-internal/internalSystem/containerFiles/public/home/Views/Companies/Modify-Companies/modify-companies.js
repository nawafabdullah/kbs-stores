const fs = require('fs');
const { stringify } = require('querystring');

const http = require('http');
const formidable = require('formidable');


async function AddCompaniestoDB(dataFile) {
  if (dataFile.url == '/products/addProducts/fileupload') {
    let form = await new formidable.IncomingForm();
    await form.parse(dataFile, async function (err, fields, files) {

      console.log(fields);
      console.log(files);

      /*
      let oldpath = await files.filetoupload.path;
      let newpath = await 'C:/Users/Your Name/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        console.log('File uploaded and moved!');
      });

*/

    });
  } else {

    console.log("failed!!!!");
    /*
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    */

    return;
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