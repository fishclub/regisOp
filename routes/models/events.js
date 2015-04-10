var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var EventSchema = new Schema({
	username : String,
    title  : String,
    startDate : Date,
    endDate : Date,
    location : String,
    description : String,
    oganization : String
});

var Event = mongoose.model('event', EventSchema);

var initObj = new Event();
initObj.username='';
initObj.title ='';
initObj.startDate= new Date();
initObj.endDate= new Date();
initObj.location='';
initObj.description='';
initObj.oganization='';

router.get('/listevent', isLoggedIn, function (req, res){
	Event.find(function(err, events){
		if (err) return console.error(err);
		res.render( 'events', {
			event : initObj,
			events : events,
			message : req.flash('success')
		});
    });
});

router.post('/addevent', function(req, res){
	var objAdd = new Event();
		objAdd.username = req.body.username;
		objAdd.title = req.body.title;
		objAdd.startDate = req.body.startDate;
		objAdd.endDate = req.body.endDate;
		objAdd.location = req.body.location;
		objAdd.description = req.body.description;
		objAdd.oganization = req.body.oganization;
		objAdd.save(function(err, event) {
			if (err) return console.error(err);
			req.flash('success', 'Save success');
			res.redirect('./editevent/'+event._id);
		});
});

router.get('/delevent/:id', function (req, res){
	Event.findById(req.params.id, function(err, event){
    event.remove(function(err, event){
		if (err) return console.error(err);
		req.flash('success', 'Delete success');
		res.redirect('/events/listevent');
    });
  });
});

router.get('/editevent/:id', function (req, res){
	Event.findById(req.params.id, function(err, event){
    if (err) return console.error(err);
	Event.find(function(err, events){
		if (err) return console.error(err);
		res.render( 'events', {
			event : event,
			events : events,
			message: req.flash('success')
		});
    });
  });
});

router.post('/updateevent', function (req, res){
	Event.findById(req.body._id, function(err, event){
    if (err) return console.error(err);
	event.username=req.body.username;
	event.title=req.body.title;
	event.startDate=req.body.startDate;
	event.endDate=req.body.endDate;
	event.location=req.body.location;
	event.description=req.body.description;
	event.oganization=req.body.oganization;
	event.save(function(err, event){
		if (err) return console.error(err);
			Event.find(function(err, events){
			if (err) return console.error(err);
			req.flash('success', 'Update success');
			res.render( 'events', {
				event : event,
				events : events,
				message: req.flash('success')
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
