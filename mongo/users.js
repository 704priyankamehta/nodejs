const mongoose  = require("mongoose");
 var Schema=mongoose.Schema;

var user=new Schema({
    name:String,
    item:String,
    status:String
});
var userModel=mongoose.model('userModel',user);



module.exports=userModel;