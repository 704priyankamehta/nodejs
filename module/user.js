const fs = require("fs");
const path = require("path");


let users = [];
let books=[];
var lastbookid=0;
var lastId=0;
readData();
function getUser(userId) {

    return users.filter(item => item.id === userId);
  
  
  }
function userExits(userId) {

    return users.findIndex(item => item.id === userId);
  
  }

function readData() {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', function (err, data) {
        if (err) {
            return res.status(404, err);
        }
        users=JSON.parse(data);
        userId=users[users.length-1].id;

       
    })
};
function writeData(Data){
    fs.writeFile(path.join(__dirname,"data.json"),JSON.stringify(Data),function(err){
        if(err){
            console.log("Error");
        };
    })
}
function getdata(req, res, next) {
   res.status(200).send(users);
    
}
const createdata = function (req, res, next) {
    const user = req.body;
    
    user.id = (++lastId).toString();
    users.push(user);
    writeData(users);
    res.send(201, users);
    next();
  }
  const updatedata = function (req, res, next) {
    let user = req.body;
    const userId = req.params.id;
    delete user.id;
    const userExit = userExits(userId);
    if (userExit === -1) {
      return res.send(404, { message: 'user not exit' });
    }
    user = { id: userId, ...user };
    users[userExit] = user;
    writeData(users);
    res.send(200);
    next();
  }
  const deletedata = function (req, res, next) {
    const userId = req.params.id;
    const userExit = userExits(userId);
    if (userExit === -1) {
      return res.send(404, { message: 'user not exit' });
    }
    users.splice(userExit, 1);
    writeData(users);
    res.send(200);
    next();
  }
  const getBookData = function (req, res, next) {
    return res.status(200).send(books);
  }
  
  
  const adddata = function (req, res, next) {
    const userId = req.params.id;
    const book = req.body;
    const user = getUser(userId);
    if (user === undefined) {
      return res.send(404, { message: "not found" });
    }
    book.id = (++lastbookid).toString();
    book.userId = userId;
    books.push(book);
   
    writeData(books);
    res.send(201, books);
    next();
  
  }
  const updateBooksData = function (req, res, next) {
    const userId = req.params.id;
    let book = req.body;
    delete book.userId;
    const userExit = books.findIndex(item => item.userId === userId);
    if (userExit === -1) {
      return res.send(404, { message: 'user not exit' });
    }
    book = { userId: userId, ...book };
    books[userExit] = book;
    writeData(books)
    res.send(200);
    next();
  
  }
  const deleteBookData = function (req, res, next) {
    const userId = req.params.id;
    const userExit = books.findIndex(item => item.userId === userId);
    if (userExit === -1) {
      return res.send(404, { message: 'user not exit' });
    }
    books.splice(userExit, 1);
    writeData(books);
    res.send(200);
    next();
  }
module.exports = {
    getdata,
    createdata,
    updatedata,
    deletedata,
    getBookData,
    adddata,
    updateBooksData,
    deleteBookData
}