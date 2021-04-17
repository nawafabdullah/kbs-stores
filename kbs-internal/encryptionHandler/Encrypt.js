const bcrypt = require("bcrypt");

async function Encrypt(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
    });
  }
}

exports.Encrypt = Encrypt;
