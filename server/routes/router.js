const express = require("express");
const router = new express.Router();
const Register=require("../models/student")
const authenticate = require("../middleware/authenticate");
const bcrypt = require('bcryptjs');

////start row class line ///////////
router.get("" , (req,res)=>{

    res.send("hello world router")
})

//form row class line 
router.post("/Signup" , async(req,res)=>{
    try{
        const userdata=new Register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        const data=await userdata.save();
        console.log(data)
        res.status(200).json({error:"succsessfull  full"})
    }catch(e){
        console.log(e)
        res.status(400).json({error:"succsessfull not full"})
    }
})
///////////////// login row class start line //////////////////////
router.post("/Login" , async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try{
        const userValid = await Register.findOne({email:email});
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                // token generate
                const token = await userValid.generateAuthtoken();
                console.log(token)
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {
                    userValid,
                    token
                }
               res.status(201).json({status:201,result})
            }
        }
    }catch(err){

        console.log(err)
        res.status(401).json({error:"succsessfull not full"})
    }

})


/////////////////////   authenticate //////////////

router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await Register.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});

        console.log(error)
    }
});

//////////////////////logout line start row class //////////////////]

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})



///////////router end line start ///////////

module.exports = router;