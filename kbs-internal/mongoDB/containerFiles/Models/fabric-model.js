Class Fabric {

    async function AssignValues (Company_Name , Number_Of_Meters, Primary_Type, Secondary_Type) {
        let id = GetID();        
        this.companyName = Company_Name;
        this.numberOfMeters = Number_Of_Meters; 
        this.primaryType = Primary_Type;
        this.secondaryType = Secondary_Type;
        let entryDate = GetDate();
    }

    async function GetID(){
        
        let numCursorFromDB = await database.collection(`${dbConfig.PRODUCTS_COMPANIES}`).find({ Company_Origin: origin }).sort({ Entry_Date: -1 }).limit(1).toArray();



    }


    async function GetDate() {

    }




}