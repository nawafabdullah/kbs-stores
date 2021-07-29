class Fabric {

    async constructor(Company_Name, Number_Of_Meters, Primary_Type, Quality, Price) {
        this.id = await GetID();
        this.companyName = Company_Name;
        this.numberOfMeters = Number_Of_Meters;
        this.primaryType = Primary_Type;
        this.quality = Quality;
        this.price = Price;
        let entryDate = await GetDate();
        let productObj = await { _id: id, Company_Name: companyName, Number_Of_Meters: numberOfMeters, Primary_Type: primaryType, Quality: quality, Price: price, Entry_Date: entryDate };
    }

    GetNumberCode() {
        let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS}`).find({ _id }).sort({ Entry_Date: -1 }).limit(1).toArray();
        return numCursorFromDB;
    }

    OptimizeNumberCode(num) {
        let old_ID = num.substr(14, 3);
        let new_ID = old_ID++;
        return new_ID;
    }

    IDParsing(primaryType, quality, companyName, numberCode) {
        let fabricID = primaryType.substr(0, 4) + "-" + quality.substr(0, 4) + "-" + companyName(0, 4) + "-" + numberCode;
        return fabricID;
    }

    GetDate() {
        let today = await new Date();
        let date = await today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = await(date + ' ' + time).toString();
        return dateTime;
    }

    /*
    async Parse() {


    }
*/

}
module.exports = Fabric