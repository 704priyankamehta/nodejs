const { Mongoose } = require("mongoose");

const books= new mangoose.Schema({
    title=String
});
const booksModel=Mongoose.model('booksModel',books);

module.exports=booksModel;