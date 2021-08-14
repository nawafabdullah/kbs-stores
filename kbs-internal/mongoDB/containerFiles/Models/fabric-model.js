const { GetDatabase } = require('../mongo');

class Fabric {

    constructor(ID, Number_Of_Meters, Primary_Type, Quality, Color, Price, Entry_Date) {
        this._id = ID;
        //this.companyCode = Company_Code;
        this.numberOfMeters = Number_Of_Meters;
        this.primaryType = Primary_Type;
        this.quality = Quality;
        this.color = Color;
        this.price = Price;
        this.entryDate = Entry_Date;

        //this.productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }



    /*
    async Parse() {


    }
*/

}
module.exports = { Fabric };