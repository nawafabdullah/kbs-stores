class Fabric {

    constructor(Company_Name, Number_Of_Meters, Primary_Type, Quality, Price) {
        this.companyName = Company_Name;
        this.numberOfMeters = Number_Of_Meters;
        this.primaryType = Primary_Type;
        this.quality = Quality;
        this.price = Price;
        this.entryDate = GetDate();
        this.id = this.GetNumberCode(this.primaryType, this.quality, this.companyName);
        //this.productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }

    async GetNumberCode(primaryType, quality, companyName) {
        this.numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find({ _id }).sort({ Entry_Date: -1 }).limit(1).toArray();
        this.IDParsing(this.primaryType,this.quality,this.companyName, await OptimizeNumberCode(this.numCursorFromDB));
    }

    async OptimizeNumberCode(num) {
        this.old_ID = this.num.substr(14, 3);
        this.new_ID = old_ID++;
        return this.new_ID;
    }

    async IDParsing(primaryType, quality, companyName, numberCode) {
        this.fabricID = primaryType.substr(0, 4) + "-" + quality.substr(0, 4) + "-" + companyName(0, 4) + "-" + numberCode;
        return this.fabricID;
    }

    async GetDate() {
        this.today = await new Date();
        this.date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.dateTime = await(date + ' ' + time).toString();
        return this.dateTime;
    }

    /*
    async Parse() {


    }
*/

}
module.exports = Fabric