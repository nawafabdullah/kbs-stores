const { GetDatabase } = require('../mongo');

class Fabric {

    constructor(ID, Company_Code, Design_Number, Primary_Type, Secondary_Type, Quality, Color, Number_Of_Meters, Price, Entry_Date) {
        this._id = ID;
        this.Company_Code = Company_Code;
        this.Design_Number = Design_Number;  
        this.Primary_Type = Primary_Type;
        this.Secondary_Type = Secondary_Type;
        this.Quality = Quality;
        this.Color = Color;
        this.Number_Of_Meters = Number_Of_Meters;
        this.Price = Price;
        this.EntryDate = Entry_Date;

        //this.productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }



    /*
    async Parse() {


    }
*/

}
module.exports = { Fabric };