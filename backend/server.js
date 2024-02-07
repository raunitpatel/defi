import  Express from "express";
import collection from "./db.js";
import cors from 'cors';
const app =Express();
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(cors())



app.post("/",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const check=await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }
        else {
            res.json("not exist")
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.post("/SignUp",async(req,res)=>{
    const{email,password}=req.body;

    const data={
        email:email,
        password:password
    }
    try{
        const check=await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }
        else {
            res.json("not exist")
            await  collection.insertMany([data])
        }
    }
    catch(e){
        res.json("not exist")
    }
})


const port =5000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})