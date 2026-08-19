const express = require('express')
const app = express()
const PORT = 3000

app.get("/students/:id",(req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    console.log(req.params.id);
    
    res.send("Hello world")

})

app.get("/students",(req,res)=>{
    console.log(req.query.cgpa);
    res.send("Hello from students")
    
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
})