var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function (error) {
    if (error) {
        console.log(error);
    }
});

var Schema   = mongoose.Schema;
var CommentSchema = new Schema({
	username : String,
    content  : String
});

var Comment = mongoose.model('comment', CommentSchema);

router.get('/commentlist', function (req, res){
  Comment.find(function(err, comments){
	  if (err) return console.error(err);
      res.render( 'helloworld', {
          title : 'Express Todo Example',
          comments : comments
      });
    });
});

router.get('/commentadd', function (req, res){
	var objAdd = new Comment();
		objAdd.username = "test";
		objAdd.content = "hello";
		objAdd.save(function(err, comment) {
			if (err) return console.error(err);
			res.render('helloworld');
		});
});

module.exports = router;
