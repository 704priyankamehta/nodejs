var express = require('express');
var router = express.Router();
var data=require("../module/user");

/* GET users listing. */
router.get('/', data.getdata);
router.post('/',data.createdata);
router.put('/:id', data.updatedata);
router.patch('/:id', data.updatepatchdata);
router.delete('/:id',data.deletedata);

module.exports = router;
