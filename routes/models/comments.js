var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CommentSchema = new Schema({
	username : String,
    content  : String
});

var Comment = mongoose.model('comment', CommentSchema);

router.get('/listcomment', function (req, res){
	Comment.find(function(err, comments){
		if (err) return console.error(err);
		res.render( 'comments', {
			title : 'Comments',
			comments : comments
		});
    });
});

router.post('/addcomment', function (req, res){
	var objAdd = new Comment();
		objAdd.username = req.body.username;
		objAdd.content = req.body.content;
		objAdd.save(function(err, comment) {
			if (err) return console.error(err);
			res.redirect('./listcomment');
		});
});

router.post('/delcomment', function (req, res){
	Comment.findById( req.params.id, function ( err, comment ){
    comment.remove( function ( err, comment ){
      res.redirect('./listcomment');
    });
  });
});

module.exports = router;
