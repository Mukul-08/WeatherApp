const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{email,password}=req.body;
    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne(data)
        if(check){
            console.log(data);
            res.json("exist");
        }
        else{
            res.json("notexist");
        }
    }
    catch(e){
      res.json("notexist");
    }
})

app.post("/signup",async(req,res)=>{
    const{email,password}=req.body;
    const data={
        email:email,
        password:password
    }

    try{
        const check = await collection.findOne({email:email,password:password})
        if(check){
            res.json("exist");
        }
        else{
            res.json("notexist");
            await collection.insertMany([data])
        }
    }
    catch(e){
      res.json("notexist");
    }
})

const PORT = 5000;
app.listen(PORT,()=>console.log(`port is running ${PORT}`));