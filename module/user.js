const fs = require("fs");
const path = require("path");
const userModel = require("../mongo/users");
const { count } = require("console");

async function userExits(userId) {

  const users = userModel.find(userId).exec();
  return users.length;

}

function getdata(req, res, next) {
  const query = JSON.parse(req.query.query);
  const size = parseInt(req.query.size) || 10;


  var mysort = { item: req.query.sort };

  userModel.find(query).limit(size).sort(mysort).exec(function (err, users) {
    if (err) {
      return res.send(404, { message: "content not found" });
    }
    userModel.count({}, function (err, result) {
      if (err) {
        res.send(err)
      }
      console.log(result);
    })
    return res.status(200).send(users);
  })
}

const createdata = async function (req, res, next) {
  const newUser = new userModel(req.body);


  const response = await newUser.save();

  res.send(201, response);
}

const updatedata = async function (req, res, next) {
  let user = req.body;
  const userId = req.params.id;

  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndUpdate(userId, user);

  res.send(200, response);
}
const updatepatchdata = async function (req, res, next) {
  let user = req.body;
  const userId = req.params.id;

  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndUpdate(userId, { $set: user });

  res.send(200, response);
}

const deletedata = async function (req, res, next) {
  const userId = req.params.id;
  const userExit = await userExits(userId);
  if (userExit === -1) {
    return res.send(404, { message: 'user not exit' });
  }
  const response = await userModel.findByIdAndRemove(userId);

  res.send(200);
}
module.exports = {
  getdata,
  createdata,
  updatedata,
  deletedata,
  updatepatchdata
}