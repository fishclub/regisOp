var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Comment = new Schema({
	username : String,
    content  : String
});

router.get('/commentlist', function ( req, res ){
  Comment.find().exec( function ( err, comments ){
      res.render( 'helloworld', {
          title : 'Express Todo Example',
          comments : comments
      });
    });
});

router.get('/', function ( req, res ){
	res.send('respond with a comment resource');
});


module.exports = router;