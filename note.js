const express=require('express');
const router=express.Router();
const fetchuser=require('../Middleware/fetchuser')
const Note = require('../models/Note');
const {body,validationResult}=require('express-validator')

router.get('/fetchnotes',fetchuser,async (req,res)=>{
    const note=await Note.find({user:req.user.id});
    res.json(note)
})

router.post('/addnotes',fetchuser,[
    body('title','Title must contain atleast 3 characters').isLength({min:3}),
    body('description','Description must contain atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {title,description,tag}=req.body
        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote)
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
})
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag}=req.body
        const newnote={}
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
         
        let note= await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString()!=req.user.id)
        return res.status(401).send("Not Allowed")
        
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note})
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
})
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag}=req.body
         
        let note= await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString()!=req.user.id)
        return res.status(401).send("Not Allowed")
        
        note=await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note Has been deleted"})
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
})
module.exports=router