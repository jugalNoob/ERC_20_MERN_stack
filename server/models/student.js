var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');


const bcrypt = require('bcryptjs');

const keysecret="jhgxzyjgjhzxcgczjygdczyudcsguygsdcyugkjd";
const userdata=new mongoose.Schema({

    name:{
        type:String,
        require,
    },

    email:{

        type:String,
        require,
    },

    password:{

        type:String,
        require,
    },
    tokens:[

        {
            token:{
                type:String,
            }
        }
            ]
,

})


userdata.pre("save" , async function(next){

    if(this.isModified("password")){

        this.password=await bcrypt.hash(this.password, 12)
    }

    next();
})

//we genterateAutoken and set the
userdata.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}
////////////////models /////////// token styart class

const Register=new  mongoose.model("Usersdata" , userdata);


module.exports=Register;