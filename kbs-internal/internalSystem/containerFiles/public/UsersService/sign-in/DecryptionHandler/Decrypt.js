const bcrypt = require('bcrypt');

async function Compare(EncryptedPass, EnteredPass) { // updated
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(EncryptedPass, salt)

    const isSame = await bcrypt.compare(EnteredPass, hash) // updated
    console.log(isSame) // updated

}



exports.Compare = Compare;
