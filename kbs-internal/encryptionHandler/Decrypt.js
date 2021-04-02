const { GetDatabase, CloseConnection } = require('../mongoDB/containerFiles/mongo');
const { dbConfig } = require('../mainConfig/db.config');

async function checkUser(userData, dbPath) {
    //... fetch user from a db etc.
    const database = await GetDatabase(dbConfig.OWNERDB);

    let userExists = await database.collection(`${dbPath}`).findOne(
        { username: username }
        //,{ _id: 0, 'name.first': 0, birth: 0 }
    );
   
    if (userExists) {
        console.log("Users Array Contains: " + userExists);
        return userExists;
    } else {
        alert("User Does Not Exist");
        return 0;
    }
    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
        //login
    }

    //...
}