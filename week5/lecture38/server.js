const EventEmitter = require('events')
const emitter = new EventEmitter()

function bellrang(){
    console.log("bell has been rang")
}
emitter.on("bell-rang",bellrang)
// emitter.on("bell-rang",()=>{
//     console.log("Bell has been rang")
// }) //kya kaam kkrna h vo likhte h
// emitter.on("bell-rang",()=>{
//     console.log("teacher start the class")
// })
// emitter.on("bell-rang",()=>{
//     console.log("Students starts enteriing the class")
// })
emitter.emit("bell-rang")
emitter.off("bell-rang",bellrang)
emitter.emit("bell-rang")