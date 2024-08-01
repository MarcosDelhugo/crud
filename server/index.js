const express= require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"employes"
});

app.post("/create",(req,res)=>{
    const Name= req.body.Name;
    const Age= req.body.Age;
    const Country= req.body.Country;
    const Charge= req.body.Charge;
    const Years= req.body.Years;

    db.query('INSERT INTO employe(name,age,country,charge,years) VALUES(?,?,?,?,?)',[
        Name,Age,Country,Charge,Years],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        });
});

app.get("/employees",(req,res)=>{
    db.query('SELECT * FROM employe',
    (err,result)=>{
        if(err){
            console.log("Hubo un error");
        }else{
            res.send(result);
        }
    })
})

app.put("/update",(req,res)=>{ 
    const employe_id=req.body.employe_id;
    const Name= req.body.Name;
    const Age= req.body.Age;
    const Country= req.body.Country;
    const Charge= req.body.Charge;
    const Years= req.body.Years;

    db.query('UPDATE employe SET name=?,age=?,country=?,charge=?,years=? WHERE employe_id=?' ,[
        Name,Age,Country,Charge,Years,employe_id],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        });
});

app.listen(3001,()=>{
    console.log("Corriendo")
})