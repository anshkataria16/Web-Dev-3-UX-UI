const jet = require('jsonwebtoken')
const data = {
    _id : "sjdkfhyugsaklsudgf"
}
const token = jet.sign(data,"random-secret-key",{expiresIn:"2d"})
console.log("Token",token)

const decoded = jet.verify(token,"random-secret-key")
console.log("Decoded",decoded)