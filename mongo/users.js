const { Mongoose } = require("mongoose");

const users= new mangoose.Schema({
    name=String
});
const userModel=new Mongoose.model('userModel',users);



module.exports=userModel;