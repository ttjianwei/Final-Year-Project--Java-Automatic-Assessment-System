var db = require('../../config');
var Excel = require('exceljs');

exports.addStudentToDB = function(req,res){


var studentName = req.body.data.studentName;//stores local username
var studentPassword = req.body.data.studentPassword;//stores local password
//var matricNo = req.body.data.matricNo;//stores local username
var labGroup = req.body.data.labGroup;//stores local password
var email = req.body.data.email;

db.query('INSERT INTO users (id, pid, username, password, email, labGroup) VALUES (DEFAULT,1,?,?,?,?);',[studentName,studentPassword,email,labGroup], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
	console.log(error);
    res.json({ state: 0}); 
}

else{
console.log("Insert successful!");
  res.json({ state : 1});
}
});




}



exports.getStudentsFromDB = function(req,res){

db.query('SELECT * FROM users WHERE pid=1;', function (error, results, fields){

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


exports.uploadStudentsToDB = function(req,res){

var workbook = new Excel.Workbook();

workbook.xlsx.readFile(req.file.filename)
    .then(function() {
        // use workbook

    var inboundWorksheet = workbook.getWorksheet(1); 
	var errCount = 0;

   inboundWorksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {


	if(rowNumber>1){

	var studentName = row.values[1];
	var email = row.values[2].text;
	var studentPassword = row.values[3];
	var labGroup = row.values[4];

console.log(studentName);
console.log(email);
	
	db.query('INSERT INTO users (id, pid, username, password, email, labGroup) VALUES (DEFAULT,1,?,?,?,?);',[studentName,studentPassword,email,labGroup], function (error, results, fields){

			if(error){
	
				//return res.status(500).send("Error!");
 				//return errCount=1; 
				console.log(error);

				//return res.json({ state : 0});
				//console.log(errCount);

			}
			else
				console.log("hereeeeeeee");
			

		});

	}
			
   });
    




	console.log("Insert successful!");
	res.json({ state : 1});
     
    }).catch(function(error){
          
          console.log(error);
          res.json({ state : 0});
  
       });


	}

exports.deleteStudentFromDB = function(req,res){
var email = req.body.data.deleteKey;
//console.log(matricNo);



db.query('DELETE from users WHERE email = ?',[email], function (error, results, fields){



if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{
console.log("Insert successful!");
  res.json({ state : 1});
}


});


}


exports.searchStudentFromDB =  function(req,res){

var modifyKey = req.body.data.modifyKey;

console.log(modifyKey);


db.query('SELECT * FROM users WHERE email = ?',[modifyKey], function (error, results, fields){

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

exports.modifyStudentInDB =  function(req,res){


var modifiedUsername = req.body.data.modifiedUsername;
var modifiedPassword = req.body.data.modifiedPassword;
var modifiedEmail = req.body.data.modifiedEmail;
var modifiedLabGroup = req.body.data.modifiedLabGroup;

console.log(req.body.data.modifyKey);

db.query('UPDATE users SET username=?,password=?,email=?,labGroup=? WHERE email = ?',[modifiedUsername,modifiedPassword,modifiedEmail,modifiedLabGroup,req.body.data.modifyKey], function (error, results, fields){

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