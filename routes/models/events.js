var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var EventSchema = new Schema({
	userId : String,
    title  : String,
    startDate : String,
    endDate : String,
    location : String,
    description : String,
    oganization : String,
    doctor : String,
    modifiedDT : Date
});

var Event = mongoose.model('event', EventSchema);
var organizations = require('./organizations');
var Organization = mongoose.model('organization', organizations);
var doctors = require('./doctors');
var Doctor = mongoose.model('doctor', doctors);

var initObj = new Event();
initObj.userId='';
initObj.title ='';
initObj.startDate= new Date();
initObj.endDate= new Date();
initObj.location='';
initObj.description='';
initObj.oganization='';
initObj.doctor='';

router.get('/listevent', isLoggedIn, function (req, res){
	Event.find().where('userId',req.user._id).sort('-modifiedDT').exec(function(err, events){
		if (err) return console.error(err);
		Doctor.find({'userId':req.user._id },function(err, doctors){
		if (err) return console.error(err);
		res.render( 'events', {
			event : initObj,
			events : events,
			doctors : doctors,
			message : req.flash('success')
		});
		});
    });
});

router.post('/addevent', function(req, res){
	var objAdd = new Event();
		objAdd.userId = req.user._id;
		objAdd.title = req.body.title;
		objAdd.doctor = req.body.doctor;
		objAdd.modifiedDT = Date.now();
		objAdd.save(function(err, event) {
			if (err) return console.error(err);
			req.flash('success', 'Save success');
			res.redirect('/events/listevent');
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

router.get('/viewevent/:id', function (req, res){
	Event.findById(req.params.id, function(err, event){
	    if (err) return console.error(err);
	    res.send(event);
	});
});

router.get('/editevent/:id', function (req, res){
	Event.findById(req.params.id, function(err, event){
    if (err) return console.error(err);
	Event.find({ 'userId' :  req.user._id }, function(err, events){
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
	event.userId=req.user._id;
	event.title=req.body.title;
	event.startDate=req.body.startDate;
	event.endDate=req.body.endDate;
	event.location=req.body.location;
	event.description=req.body.description;
	event.oganization=req.body.oganization;
	event.doctor=req.body.doctor;
	event.modifiedDT=Date.now();
	event.save(function(err, event){
		if (err) return console.error(err);
			Event.find({ 'userId' :  req.user._id }, function(err, events){
			if (err) return console.error(err);
			Organization.find({ 'userId' :  req.user._id }, function(err, organizations){
			if (err) return console.error(err);
			Doctor.find({ 'userId' :  req.user._id }, function(err, doctors){
			if (err) return console.error(err);
			req.flash('success', 'Update success');
			res.render( 'events', {
				event : event,
				events : events,
				organizations : organizations,
				doctors : doctors,
				message: req.flash('success')
			});
			});
			});
		});
	});
  });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('loginMessage', 'Please login or signup');
    res.redirect('/login');
}

module.exports = router;
