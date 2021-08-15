class Company {
    constructor(ID, Company_Name, Company_Origin, Entry_Date) {
        this._id = ID;
        this.Company_Name = Company_Name;
        this.Company_Origin = Company_Origin;
        this.EntryDate = Entry_Date;
    }
}

module.exports = { Company };