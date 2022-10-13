const mongoose = require('mongoose')

const DB= "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";

mongoose.connect(DB, {


}).then(()=>{


    console.log("connect")

}).catch(()=>{

    console.log("not connect")
})