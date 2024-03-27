const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const User=require('../models/User')
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
const fetchuser=require('../Middleware/fetchuser')

const JWT_SECRET="Iamagoodgirl"
router.post('/createuser',[
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
    let success=false
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        success=false
        return res.status(400).json({errors:errors.array()})
    }
    

    // User.create({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:secPass,
    // }).then(user=>res.json(user))
    // .catch(err=>console.log("Enter unique values for email"))

    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            success=false
            return res.status(400).json({error:"Sorry this email already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password,salt)
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authToken})
        // res.json(user)
    }
    catch(error){
        res.status(500).send("Some error occured")
    }

    // console.log(req.body)
    // const user=User(req.body)
    // user.save();
    // res.send(req.body)


    // obj={
    //     name:"Simran",
    //     rollno : 2116314
    // }
    // res.json(obj)
})
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must contain atleast 5 characters").isLength({min:5})
],async (req,res)=>{
    let success=false
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try{
        let user=await User.findOne({email});
        if(!user){
            success=false
            return res.status(400).json({success,error:"Please enter correct credentials"})
        }
        const Passcomp=await bcrypt.compare(password,user.password)
        if(!Passcomp){
            success=false
            return res.status(400).json({success,error:"Please enter correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authToken})
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
})
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
})

module.exports=router