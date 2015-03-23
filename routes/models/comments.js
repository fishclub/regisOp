var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CommentSchema = new Schema({
	username : String,
    content  : String
});

var Comment = mongoose.model('comment', CommentSchema);

router.get('/commentlist', function (req, res){
	Comment.find(function(err, comments){
		if (err) return console.error(err);
		res.render( 'comments', {
			title : 'Comments',
			comments : comments
		});
    });
});

router.get('/commentadd', function (req, res){
	var objAdd = new Comment();
		objAdd.username = "test1";
		objAdd.content = "hello1";
		objAdd.save(function(err, comment) {
			if (err) return console.error(err);
			res.render('helloworld');
		});
});

module.exports = router;
