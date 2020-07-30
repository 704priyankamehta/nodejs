var express = require('express');
var router = express.Router();
var data=require("../module/user");

/* GET users listing. */
router.get('/', data.getdata);
router.post('/',data.createdata);
router.put('/:id', data.updatedata);
router.delete('/:id',data.deletedata);
router.get("/:id/books", data.getBookData);
router.post("/:id/books", data.adddata)
router.put("/:id/books", data.updateBooksData);
router.delete("/:id/books", data.deleteBookData);
module.exports = router;
