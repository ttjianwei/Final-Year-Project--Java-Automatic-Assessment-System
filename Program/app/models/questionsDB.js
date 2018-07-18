var db = require('../../config');
var Excel = require('exceljs');
var cmd=require('node-cmd');
var sleep = require('system-sleep');

exports.getLabQuestions = function(req,res){

db.query('SELECT * FROM labquestions;', function (error, results, fields){
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

exports.getQuizQuestions = function(req,res){

db.query('SELECT * FROM quizquestions;', function (error, results, fields){
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


exports.getQ1fromDB = function(req,res){

var email = req.body.data.email;
var questionSession = req.body.data.sessionID;
var q1Question =0;

db.query('SELECT Q1 FROM user_session WHERE Sid= ? AND studentName =?',[questionSession,email], function (error, results, fields){

if(error){
	console.log(error);
}
else{

q1Question = results[0].Q1;

db.query('SELECT Qtitle,Qdescription FROM QuizQuestions WHERE Qid= ?',[q1Question], function (error, results, fields){

if(error){
	console.log(error);
}
else{



console.log(results[0].Qtitle);

 res.json({ q1Title : results[0].Qtitle, q1Description : results[0].Qdescription});


}



});


}




});



}


exports.getQ2fromDB = function(req,res){

var email = req.body.data.email;

var questionSession = req.body.data.sessionID;


//console.log(questionSession);

var q2Question =0;

db.query('SELECT Q2 FROM user_session WHERE Sid= ? AND studentName =?',[questionSession,email], function (error, results, fields){

if(error){
	console.log(error);
}
else{





q2Question = results[0].Q2;

db.query('SELECT Qtitle,Qdescription FROM QuizQuestions WHERE Qid= ?',[q2Question], function (error, results, fields){

if(error){
	console.log(error);
}
else{



console.log(results[0].Qtitle);

 res.json({ q2Title : results[0].Qtitle, q2Description : results[0].Qdescription});


}





});


}




});



}


exports.getQ3fromDB = function(req,res){

var email = req.body.data.email;

var questionSession = req.body.data.sessionID;

//console.log(studentName);
//console.log(questionSession);

var q3Question =0;

db.query('SELECT Q3 FROM user_session WHERE Sid= ? AND studentName =?',[questionSession,email], function (error, results, fields){

if(error){
	console.log(error);
}
else{





q3Question = results[0].Q3;

db.query('SELECT Qtitle,Qdescription FROM QuizQuestions WHERE Qid= ?',[q3Question], function (error, results, fields){

if(error){
	console.log(error);
}
else{



console.log(results[0].Qtitle);

 res.json({ q3Title : results[0].Qtitle, q3Description : results[0].Qdescription});


}





});


}




});



}



exports.getQ4fromDB = function(req,res){

var email = req.body.data.email;

var questionSession = req.body.data.sessionID;


var q4Question =0;

db.query('SELECT Q4 FROM user_session WHERE Sid= ? AND studentName =?',[questionSession,email], function (error, results, fields){

if(error){
	console.log(error);
}
else{





q4Question = results[0].Q4;

db.query('SELECT Qtitle,Qdescription FROM QuizQuestions WHERE Qid= ?',[q4Question], function (error, results, fields){

if(error){
	console.log(error);
}
else{



console.log(results[0].Qtitle);
//results[0].Qdescription = results[0].Qdescription.replace(".","\\n");

 res.json({ q4Title : results[0].Qtitle, q4Description : results[0].Qdescription});


}





});


}




});



}

exports.addQuestions = function(req,res){
var qtitle = req.body.data.questionTitle;
var qdescription = req.body.data.description;
var syntaxWeight = req.body.data.syntaxWeight;
var outputWeight = req.body.data.outputWeight;
var maxError = req.body.data.maxError;

	
	db.query('INSERT INTO questions (Qid, QTitle, Qdescription, QSyntaxWeight, QOutputWeight, QmaxError) VALUES (DEFAULT,?,?,?,?,?);',[qtitle,qdescription,syntaxWeight,outputWeight,maxError], function (error, results, fields){

			if(error){
	
				//return res.status(500).send("Error!");
 				//return errCount=1; 
				console.log("Insert unsuccessful!");
				    res.json({ state: 0}); 
				//return res.json({ state : 0});
				//console.log(errCount);

			}
			else{
console.log("Insert successful!");
  res.json({ state : 1});
}


		});

	}

	exports.deleteQuizQuestions = function(req,res){




			db.query('DELETE from quizquestions WHERE Qid = ?',[req.body.data.questionID], function (error, results, fields){


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


exports.deleteLabQuestions = function(req,res){





			db.query('DELETE from labquestions WHERE Qid = ?',[req.body.data.questionID], function (error, results, fields){


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

	exports.searchQuizQuestionFromDB = function(req,res){




db.query('SELECT * from quizquestions WHERE Qid= ?',[req.body.data.searchQuestion], function (error, results, fields){

if(error){
	console.log(error);
}
else{

console.log(results[0]);
//results[0].Qdescription = results[0].Qdescription.replace(".","\\n");

 res.json({ state : 1,results });


}





});

	}

exports.searchLabQuestionFromDB = function(req,res){
db.query('SELECT * from labquestions WHERE Qid= ?',[req.body.data.searchQuestion], function (error, results, fields){

if(error){
	console.log(error);
}
else{

console.log(results[0]);
//results[0].Qdescription = results[0].Qdescription.replace(".","\\n");

 res.json({ state : 1,results });


}





});

}

exports.modifyQuizQuestionFromDB = function(req,res){

var modifiedQtitle = req.body.data.modifiedTitle;
var modifiedQdescription = req.body.data.modifiedDesc;
var modifiedQOutputWeight = req.body.data.modifiedOutputWeight;
var modifiedQSyntaxWeight = req.body.data.modifiedSyntaxWeight;
var modifiedQCompileWeight = req.body.data.modifiedCompileWeight;
var modifiedConfigFile  = req.body.data.modifyConfigFile ;
db.query('UPDATE quizquestions SET Qtitle=?,Qdescription=?,QSyntaxWeight=?,QOutputWeight=?,QCompileWeight=?,QConfigFile=? WHERE Qid = ?',[modifiedQtitle,modifiedQdescription,modifiedQSyntaxWeight,modifiedQOutputWeight,modifiedQCompileWeight,modifiedConfigFile,req.body.data.modifiedQid], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{

console.log(results);

  res.json({ state: 1 });

 //res.json({ state : 1});
}



});


	}


exports.modifyLabQuestionFromDB = function(req,res){

var modifiedQtitle = req.body.data.modifiedTitle;
var modifiedQOutputWeight = req.body.data.modifiedOutputWeight;
var modifiedQSyntaxWeight = req.body.data.modifiedSyntaxWeight;
var modifiedQCompileWeight = req.body.data.modifiedCompileWeight;
var modifiedConfigFile  = req.body.data.modifyConfigFile ;
db.query('UPDATE labquestions SET Qtitle=?,QSyntaxWeight=?,QOutputWeight=?,QCompileWeight=?,QConfigFile=? WHERE Qid = ?',[modifiedQtitle,modifiedQSyntaxWeight,modifiedQOutputWeight,modifiedQCompileWeight,modifiedConfigFile,req.body.data.modifiedQid], function (error, results, fields){

if(error){
	console.log('Code 400, Error ocurred');
    res.json({ state: 0}); 
}

else{

console.log(results);

  res.json({ state: 1 });

 //res.json({ state : 1});
}



});


	}



exports.addLabQuestion = function(req,res){

	var qtitle = req.body.data.questionName;
	var syntaxWeight = req.body.data.syntaxWeight;
	var outputWeight = req.body.data.outputWeight;
	var compileWeight = req.body.data.compileWeight;
	var configFilename = req.body.data.configFilename;
db.query('INSERT INTO labquestions (Qid, QTitle, QSyntaxWeight, QOutputWeight, QCompileWeight, QConfigFile) VALUES (DEFAULT,?,?,?,?,?);',[qtitle,syntaxWeight,outputWeight,compileWeight,configFilename], function (error, results, fields){
if(error){
	res.json({ state: 0 });
}
else{ 

if(req.body.data.configFileType=="Upload"){
//cmd.run('copy Quarantine\\'+ configFilename + " " + "Labs\\configs");
cmd.run('move Quarantine\\'+ configFilename + " " + "Labs\\configs");
//sleep(1000);
}
	res.json({ state: 1});
}
});

}

exports.addQuizQuestion = function(req,res){

	var qtitle = req.body.data.questionName;
	var description = req.body.data.description;
	var syntaxWeight = req.body.data.syntaxWeight;
	var outputWeight = req.body.data.outputWeight;
	var compileWeight = req.body.data.compileWeight;
	var configFilename = req.body.data.configFilename;


	db.query('INSERT INTO quizquestions (Qid, QTitle, Qdescription, QSyntaxWeight, QOutputWeight, QCompileWeight, QConfigFile) VALUES (DEFAULT,?,?,?,?,?,?);',[qtitle,description,syntaxWeight,outputWeight,compileWeight,configFilename], function (error, results, fields){
if(error){
	res.json({ state: 0 });
}
else {

if(req.body.data.configFileType=="Upload"){
	console.log("here");
//cmd.run('copy Quarantine\\'+ configFilename + " " + "Labs\\configs");
cmd.run('move Quarantine\\'+ configFilename + " " + "Quiz\\configs");
//sleep(1000);
}
	res.json({ state: 1});

}

});


}
/*
console.log(req.body.data.questionName);
console.log(req.body.data.description);
console.log(req.body.data.syntaxWeight);
console.log(req.body.data.outputWeight);
console.log(req.body.data.compileWeight);
console.log(req.body.data.questionCat);
console.log(req.body.data.configFilename);
*/