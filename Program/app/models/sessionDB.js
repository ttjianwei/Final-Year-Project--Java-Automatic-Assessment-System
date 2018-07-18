var db = require('../../config');


exports.getSesionsFromDB = function(req,res){


db.query('SELECT * FROM sessions;', function (error, results, fields){
if(error){
	console.log('Code 400, Error ocurred');
    //res.json({ state: 0}); 
}

else{



  res.json(results);
  res.end();
 //res.json({ state : 1});
}

});
}



exports.createSessionInDB = function(req,res){

db.query('INSERT INTO sessions (Sid, Stitle, Sdescription,Spass, TLimit) VALUES (?,?,?,?,?);',[req.body.data.Sid,req.body.data.sessionTitle,req.body.data.quizDescription,req.body.data.sessionPass,req.body.data.timeLimit], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
	console.log(error);
		    res.json({ state: 0}); 
    //res.json({ state: 0}); 
}

else{
console.log("success");
	    res.json({ state: 1}); 
}

});


	}



exports.searchSession = function(req,res){

console.log(req.body.data.searchSessionKey);


db.query('SELECT * FROM sessions WHERE Sid = ?',[req.body.data.searchSessionKey], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{


  res.json({ state: 1, results });


}



});
}


exports.modifySessionInDB = function(req,res){


	db.query('UPDATE sessions SET Sid=?, Sdescription=?,Stitle=?,Spass=?,TLimit =? WHERE Sid = ?',[req.body.data.modifySid,req.body.data.modifySDescription,req.body.data.modifyStitle,req.body.data.modifySessionPass,req.body.data.modifyTLimit,req.body.data.searchSessionKey], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{


  res.json({ state: 1 });


}


});



	}



	exports.deleteSessionInDB = function(req,res){

	
	db.query('DELETE FROM sessions WHERE Sid = ?',[req.body.data.searchDeleteSessionKey], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{


  res.json({ state: 1 });


}


});



	}