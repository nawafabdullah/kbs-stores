const fs = require('fs');
const { stringify } = require('querystring');




async function AddCompaniestoDB (dataFile) {
    fs.readFile(stringify (dataFile), 'utf8' , (err, data) => {
        if (err) {
          console.error("Could not read file " + err);
          return
        }
        console.log(data)
      })    
      
}


module.exports = {
    AddCompaniestoDB
};