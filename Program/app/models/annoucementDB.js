var db = require('../../config');
var dateTime = require('node-datetime');

exports.createAnnoucementInDB = function(req,res){

	db.query('INSERT INTO annoucements (aTitle, labGroup, createBy, annoucement, aID, aDateTime) VALUES (?,?,?,?,DEFAULT,?);',[req.body.data.annoucementTitle,req.body.data.labGroup,req.body.data.username,req.body.data.description,dateTime.create().format('Y-m-d H:M:S')], function (error, results, fields){

			if(error){
	
				//return res.status(500).send("Error!");
 				//return errCount=1; 
				console.log("Insert unsuccessful!");

				//return res.json({ state : 0});
				console.log(error);
				 res.json({ state : 0});

			}
			else
				console.log("success");
			 res.json({ state : 1});
			

		});
}


exports.getAnnouncements = function(req,res){

db.query('SELECT * FROM annoucements;', function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    //res.json({ state: 0}); 
}

else{


console.log("here");
  res.json(results);
  res.end();
 //res.json({ state : 1});
}

});


}

exports.deleteAnnoucement = function(req,res){


db.query('DELETE from annoucements WHERE aID = ?',[req.body.data.deleteAID], function (error, results, fields){



if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{
console.log("Delete successful!");
  res.json({ state : 1});
}


});
}

exports.searchAnnoucementInDB = function(req,res){

console.log(req.body.data.searchAnnouncement);

db.query('SELECT * FROM annoucements WHERE aID = ?',[req.body.data.searchAnnouncement], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{

console.log(results);

  res.json({ state: 1, results });

 //res.json({ state : 1});
}
});


}


exports.modifyAnnoucementInDB = function(req,res){

console.log(req.body.data.aID);
console.log(req.body.data.modifiedTitle);
console.log(req.body.data.modifiedAnnoucement);
console.log(req.body.data.modifiedLabGroup);
console.log(req.body.data.modifiedCreator);

db.query('UPDATE annoucements SET aTitle=?,annoucement=?,labGroup=?,createBy=? WHERE aID = ?',[req.body.data.modifiedTitle,req.body.data.modifiedAnnoucement,req.body.data.modifiedLabGroup,req.body.data.modifiedCreator,req.body.data.aID], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
	console.log(error);
    res.json({ state: 0}); 
}

else{

console.log(results);

  res.json({ state: 1, results });

 //res.json({ state : 1});
}



});

}


exports.getStudentAnnouncement = function(req,res){
	console.log(req.body.data.email);
db.query('SELECT * FROM users WHERE email= ?',[req.body.data.email], function (error, results, fields){


if(error){
	console.log('Code 400, Error ocurred');
	console.log(error);
    res.json({ state: 0}); 
}

else{

db.query('SELECT * FROM annoucements WHERE labGroup= ?',[results[0].labGroup], function (error, results, fields){

if(results.length > 0 ){
  res.json(results);

  
}

});



}


});



	}

