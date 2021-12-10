const { GetDatabase } = require('../mongo');

class Sale {

    constructor(ID, reciptDetails) {
        this._id = ID;
        this.reciptDetails = reciptDetails;
        
        //this.productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }



    /*
    async Parse() {


    }
*/

}
module.exports = { Sale };