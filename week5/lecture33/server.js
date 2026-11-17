const bcrypt = require("bcrypt");
const password = "john@123"
const password2 = "john@123"
const hashpassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    console.log("Salt",salt)
    const hashedpassword = await bcrypt.hash(password,salt);
    console.log("Hashed Password",hashedpassword)

    const ismatch = await bcrypt.compare("john@123",hashedpassword);
    console.log("Is Match",ismatch) //match the password bw hashed password and the converted hashed passsword which you have write
}
hashpassword(password)
hashpassword(password2)