import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const secret = "test";


const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())




app.post("/post",(req,res) =>{
 const {username} = req.body;
 const token = jwt.sign({username},secret,{expiresIn:'1d'})
 res.cookie('token',token);
 res.send({login:true})
})


app.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.json({logout:true})
})


const verifyUser = (req,res,next) => {

    const token = req.cookies.token;
    if(!token){
        return res.json({Message:'We need token please provide it'});
    }else{
        jwt.verify(token,secret,(err,decoded) => {
            if (err) {
                return res.json({Message:"Authentication Error"});
            }else{
                req.username = decoded.username
                console.log(req.username);
                next();
            }
        })
    }

}


app.get("/",verifyUser,(req,res)=>{
    return res.json({status:"Success",username:req.username})
})


app.listen(5000,() =>{
    console.log("running");   
})