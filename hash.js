const brcypt = require('bcrypt');

async function run() {
    const salt = await brcypt.genSalt(10);
    const hashed = await brcypt.hash('1234', salt)
    console.log(salt);
    console.log(hashed)
}


run();