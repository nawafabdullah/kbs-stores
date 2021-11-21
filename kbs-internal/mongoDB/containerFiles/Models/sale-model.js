const { GetDatabase } = require('../mongo');

class Sale {

    constructor(ID, Description, Quantity, totalPrice, Entry_Date) {
        this._id = ID;
        this.Description = Description;
        this.Quantity = Quantity;  
        this.Total_Price = totalPrice;
        this.EntryDate = Entry_Date;

        //this.productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }



    /*
    async Parse() {


    }
*/

}
module.exports = { Sale };