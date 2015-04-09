var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CommentSchema = new Schema({
	username : String,
    content  : String
});

var Comment = mongoose.model('comment', CommentSchema);

var initObj = new Comment();
initObj.username='';
initObj.content='';

router.get('/listcomment', isLoggedIn, function (req, res){
	Comment.find(function(err, comments){
		if (err) return console.error(err);
		res.render( 'comments', {
			comment : initObj,
			comments : comments
		});
    });
});

router.post('/addcomment', function(req, res){
	var objAdd = new Comment();
		objAdd.username = req.body.username;
		objAdd.content = req.body.content;
		objAdd.save(function(err, comment) {
			if (err) return console.error(err);
			res.redirect('./listcomment');
		});
});

router.get('/delcomment/:id', function (req, res){
	Comment.findById(req.params.id, function(err, comment){
    comment.remove(function(err, comment){
		if (err) return console.error(err);
		res.redirect('/comments/listcomment');
    });
  });
});

router.get('/editcomment/:id', function (req, res){
	Comment.findById(req.params.id, function(err, comment){
    if (err) return console.error(err);
	Comment.find(function(err, comments){
		if (err) return console.error(err);
		res.render( 'comments', {
			comment : comment,
			comments : comments,
			message: req.flash('error')
		});
    });
  });
});

router.post('/updatecomment', function (req, res){
	Comment.findById(req.body._id, function(err, comment){
    if (err) return console.error(err);
	comment.username=req.body.username;
	comment.content=req.body.content;
	comment.save(function(err, comment){
		if (err) return console.error(err);
			Comment.find(function(err, comments){
			if (err) return console.error(err);
			res.render( 'comments', {
				comment : comment,
				comments : comments,
				message: req.flash('error')
			});
		});
	});
  });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;
