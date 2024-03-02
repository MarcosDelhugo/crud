const express= require("express")
const app = express()
const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"employes"
})

app.post("/create",(req,res)=>{
    const Name= req.body.Name;
    const Age= req.body.Age;
    const Country= req.body.Country;
    const Charge= req.body.Carge;
    const Years= req.body.Years;

    db.query('INSERT INTO employe(name,age,country,charge,years) VALUES(?,?,?,?,?)',[Name,Age,Country,Charge,Years]);
})
app.listen(3001,()=>{
    console.log("Corriendo")
})