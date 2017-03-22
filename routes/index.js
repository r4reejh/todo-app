var express = require('express');
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var router = express.Router();

router.get('/',function ( req, res, next ){
	console.log("in");
  var user_id ="test"
  Todo.find({ user_id : user_id }).sort('-updated_at').exec( function ( err, todos ){
	  console.log("error");
      if( err ) console.log(err);
      console.log(todos);
      res.render('index.ejs',{title : 'Express Todo Example',todos : todos});
    });
});

router.post( '/create',function ( req, res, next ){
  new Todo({
	  user_id    : "test",
      content    : req.body.content,
      updated_at : Date.now()
  }).save( function ( err, todo, count ){
    if( err ) return next( err );
    res.redirect( '/' );
  });
});

router.get(  '/destroy/:id',function ( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    var user_id = "test";
    todo.remove( function ( err, todo ){
      if( err ) return next( err );
      res.redirect( '/' );
    });
  });
});

module.exports = router;
