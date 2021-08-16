const { GetDatabase } = require('../mongo');

class Fabric {

    constructor(ID, Store_Identifier, Company_Code, Number_Of_Meters, Primary_Type, Quality, Color, Price, Entry_Date) {
        this._id = ID;
        this.Store_Identifier = Store_Identifier;
        this.Company_Code = Company_Code;
        this.Number_Of_Meters = Number_Of_Meters;
        this.Primary_Type = Primary_Type;
        this.Quality = Quality;
        this.Color = Color;
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