const { GetDatabase } = require('../mongo');

class Fabric {

    constructor(ID, Company_Name, Number_Of_Meters, Primary_Type, Quality, Price, Entry_Date) {
        this.id = ID;
        this.companyName = Company_Name;
        this.numberOfMeters = Number_Of_Meters;
        this.primaryType = Primary_Type;
        this.quality = Quality;
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