const websocket = require("ws")
const wsserver = new websocket.Server({port:3000})
wsserver.on("connection",(socket)=>{
    socket.on("message",(msg)=>{
        // socket.send("message" + msg)
        wsserver.clients.forEach((client)=>{
            client.send("message" + msg)
        })
    })
    socket.on("error",(err)=>{
        console.log(err);
    })
    socket.on("close",()=>{
        console.log("socket disconnect");
        
    })
})