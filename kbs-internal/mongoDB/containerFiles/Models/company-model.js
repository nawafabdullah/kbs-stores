class Company {
    constructor(ID, Company_Name, Company_Origin, Entry_Date) {
        this._id = ID;
        this.companyName = Company_Name;
        this.companyOrigin = Company_Origin;
        this.entryDate = Entry_Date;
    }
}

module.exports = { Company };