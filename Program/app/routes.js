var auth = require('../app/middleware/authenticateUser');
var fs    = require("fs");
var createSess = require('../app/middleware/createUserSession');
var studentModel = require('../app/models/studentDB');
var annoucementModel = require('../app/models/annoucementDB');
var questionModel= require('../app/models/questionsDB');
var sessionModel= require('../app/models/sessionDB');
var labModel = require('../app/models/labDB');
var compile = require('../app/models/compile');
var multer  = require('multer');
var unzip = require('unzip');
const compressing = require('compressing');
var extract = require('extract-zip');
var cmd=require('node-cmd');
var session= require('express-session');
var spawn = require('child_process').spawn;

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
           // var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });

var testStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './SolutionTest/');
        },
        filename: function (req, file, cb) {
           // var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });


var labFileStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './app/Labs/LabFiles/');
        },
        filename: function (req, file, cb) {
           // var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });


var labStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './Labs/');
        },
        filename: function (req, file, cb) {
           // var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });


var configStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './Quarantine/');
        },
        filename: function (req, file, cb) {
           // var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });


 var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

 var solUploadTest = multer({ //multer settings
                    storage: testStorage
                }).single('file');

 var submitLab = multer({ //multer settings
                    storage: labStorage
                }).single('file');

 var configUpload = multer({ //multer settings
                    storage: configStorage
                }).single('file');

 var labFileUpload = multer({ //multer settings
                    storage: labFileStorage
                }).single('file');


module.exports = function (app) {

//app.use(session({secret: 'securesecretsession'}));
app.use(session({
    secret: 'securesecretsession',
    resave: true,
    saveUninitialized: true
}));
//display login page
app.get('/',function(req,res){
	
sess = req.session;

if(sess.pid==1){
	res.redirect('/StudentHome');
}
else if(sess.pid==2){
	res.redirect('/AdminHome');
}
//if all else fail return to home page
	else res.sendFile(__dirname + '/index.html');
});


app.post('/',function(req,res){

 res.sendFile(__dirname + '/index.html');

});


app.post('/modifyQuestionInDB',function(req,res){

if(req.body.data.questionCat=="quizQuestion"){
questionModel.modifyQuizQuestionFromDB(req,res);
}
else if (req.body.data.questionCat=="labQuestion"){
questionModel.modifyLabQuestionFromDB(req,res);
}

});


app.post('/modifyQuestion',function(req,res){

    res.sendFile(__dirname + '/views/admin/modifyQuestion.html');

});

//route to display student home
//Handle POST
app.post('/StudentHome',function(req,res){

	sess = req.session;
	res.sendFile(__dirname + '/views/studentHome.html');

});

//Handle GET
app.get('/StudentHome',function(req,res){

	sess = req.session;

if(sess.pid==1){
	res.sendFile(__dirname + '/views/studentHome.html');
}
else 
	res.redirect('/');
});





//route to display admin home
//Handle POST
app.post('/AdminHome',function(req,res){

	//res.json(req.session.username);
	res.sendFile(__dirname + '/views/admin/viewAllStudentsAttempts.html');
});
//Handle GET
app.get('/AdminHome',function(req,res){

		sess = req.session;

if(sess.pid==2){
    //res.json(req.session.username);
	res.sendFile(__dirname + '/views/admin/viewAllStudentsAttempts.html');
}
else 
res.redirect('/');
});


app.post('/DeleteQuestionFromDB',function(req,res){

if(req.body.data.questionCat=="labQuestion"){

questionModel.deleteLabQuestions(req,res);

}else if(req.body.data.questionCat=="quizQuestion"){

questionModel.deleteQuizQuestions(req,res);
}


});

//route to display login page with parameters
app.post('/fail',function(req,res){

res.redirect('/index.html?login=fail');

});

app.post('/EnterSession',function(req,res){

res.redirect('/views/student/sessionLogin.html?session=false');

});


app.post('/ModifyStudent',function(req,res){
		

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/modifyStudent.html');
}
else 
	res.redirect('/');

});


app.post('/DeleteStudent',function(req,res){
		

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/deleteStudent.html');
}
else 
	res.redirect('/');

});


app.get('/DeleteStudent',function(req,res){

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/deleteStudent.html');
}
else 
	res.redirect('/');

});



app.post('/DeleteStudentFromDB',function(req,res){

	sess = req.session;

if(sess.pid==2){
	
studentModel.deleteStudentFromDB(req,res);


}
else 
	res.redirect('/');

});






app.post('/AddStudent',function(req,res){
		

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/addStudent.html');
}
else 
	res.redirect('/');

});

app.get('/AddStudent',function(req,res){

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/addStudent.html');
}
else 
	res.redirect('/');

});



app.post('/createSession',function(req,res){
         res.sendFile(__dirname + '/views/admin/createSession.html');   

});


app.post('/createSessionInDB',function(req,res){
        sessionModel.createSessionInDB(req,res);  

});


app.post('/getLabsDropdown',function(req,res){
       labModel.getLabsDropdown(req,res);  

});


app.post('/ViewStudentResults',function(req,res){

   res.sendFile(__dirname + '/views/admin/viewAllStudentsAttempts.html');   
});



app.post('/deleteSession',function(req,res){
        
    res.sendFile(__dirname + '/views/admin/deleteSession.html');


});

app.post('/searchSession',function(req,res){
        
    sessionModel.searchSession(req,res);

});


app.post('/getAllSubmissionRecords',function(req,res){
        
    labModel.getAllSubmissionRecords(req,res);

});


app.post('/modifySession',function(req,res){
        
    res.sendFile(__dirname + '/views/admin/modifySession.html');
});


app.post('/deleteSessionInDB',function(req,res){

sessionModel.deleteSessionInDB(req,res);  

});


app.post('/modifySessionInDB',function(req,res){
          sessionModel.modifySessionInDB(req,res);  
    //res.sendFile(__dirname + '/views/admin/modifySession.html');
});




app.post('/CreateStudent',function(req,res){
		

	//Do insert do database
	studentModel.addStudentToDB(req,res);

});



app.post('/getSessions',function(req,res){
        
sessionModel.getSesionsFromDB(req,res); 
    //Do insert do database
  //  studentModel.addStudentToDB(req,res);

});



app.post('/getStudents',function(req,res){
		
	studentModel.getStudentsFromDB(req,res);

});


app.post('/SearchStudent',function(req,res){
		
	//console.log(req.body.data.searchStudentMatric);
  studentModel.searchStudentFromDB(req,res);

});

app.post('/searchQuestion',function(req,res){
        
    //console.log(req.body.data.searchStudentMatric);
    if(req.body.data.questionCat=="quizQuestion"){
          questionModel.searchQuizQuestionFromDB(req,res);
    } else 
    if(req.body.data.questionCat=="labQuestion"){
          questionModel.searchLabQuestionFromDB(req,res);
    }



});





app.post('/UploadStudents', function(req, res) {
        upload(req,res,function(err){


            studentModel.uploadStudentsToDB(req,res);
           

            
        });
    });

app.post('/UploadSolutionTest', function(req, res) {

        solUploadTest(req,res,function(err){
      	res.json({ state : 1});
  });


    });


app.post('/uploadConfigFile', function(req, res) {

        configUpload(req,res,function(err){
        res.json({ state : 1});
  });


 });



app.post('/logout',function(req,res){

sess = req.session;
sess.pid = 0;
sess.ssid = 0;
res.sendFile(__dirname + '/index.html');
});

//route to authenticate user
app.post('/login', function(req, res){
auth.login(req,res);
});


app.post('/AddQuestions', function(req, res){


	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/addQuestion.html');
}
else 
	res.redirect('/');

});

app.post('/DeleteQuestions',function(req,res){

    res.sendFile(__dirname + '/views/admin/deleteQuestions.html');


});


app.post('/createLabs',function(req,res){

 res.sendFile(__dirname + '/views/admin/createLabs.html');

});

app.post('/deleteLabs',function(req,res){

 res.sendFile(__dirname + '/views/admin/deleteLabs.html');

});

app.post('/modifyLabs',function(req,res){


 res.sendFile(__dirname + '/views/admin/modifyLabs.html');
});





app.post('/adminCreateLab',function(req,res){

    console.log(req.body.username);
   labFileUpload(req,res,function(err){
        res.json({ state : 1});
  });

});



app.post('/testRun',function(req,res){

if(req.body.data.configType=="Upload"){
compile.compileTest(req,res);
}
else{
  compile.compileTestManual(req,res);
}

});

app.post('/ModifyAnnoucementDB',function(req,res){

    annoucementModel.modifyAnnoucementInDB(req,res);

});


app.post('/createConfigFile',function(req,res){

try{
var fileName = req.body.data.configFileName;
var title ="";
var inputs="";
var outputs = "";
var keywords = "";
var score="";
var main="";
content = "";
if(fileName && req.body.data.title){


title = "Title:" +req.body.data.title +",\r\n";
if(req.body.data.input){
inputs = "Inputs:" + req.body.data.input+",\r\n";
}
else 
inputs = "Inputs:,\r\n";

if(req.body.data.output){
outputs = "Outputs:" + req.body.data.output+",\r\n";
}
else 
outputs = "Outputs:,\r\n";


if(req.body.data.keywords){
keywords = "Keywords:" + req.body.data.keywords+",\r\n";
}
else 
keywords = "Keywords:,\r\n";


if(req.body.data.score){
score = "Score:" + req.body.data.score+",\r\n";
}
else 
score = "Score:,\r\n";

if(req.body.data.main){
main= "Main:" + req.body.data.main+",\r\n";
}
else 
main = "Main:,\r\n";

content = title + inputs+ outputs+keywords+score;



if(req.body.data.configFileLoc=="labQuestion"){
content += main;
fs.writeFileSync('Labs\\configs\\'+fileName +'.txt',content,'utf8');
fs.close;

 res.json({ state : 1});

}
else if(req.body.data.configFileLoc=="quizQuestion"){
fs.writeFileSync('Quiz\\configs\\'+fileName +'.txt',content,'utf8');
fs.close;
 res.json({ state : 1});

    }

   }
}catch(error){
    console.log(error);
    res.json({ state : 0});
}



});


app.post('/createQuestionInDB',function(req,res){

if(req.body.data.questionCat=="labQuestion"){
 questionModel.addLabQuestion(req,res);
}
if(req.body.data.questionCat=="quizQuestion"){
 questionModel.addQuizQuestion(req,res);
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
    

});

app.post('/adminWriteLabToDB',function(req,res){



    labModel.createLabInDB(req,res);

});

app.post('/ModifyStudentDB',function(req,res){



 studentModel.modifyStudentInDB(req,res);

});


app.post('/searchAnnoucementInDB',function(req,res){


annoucementModel.searchAnnoucementInDB(req,res);
 //studentModel.modifyStudentInDB(req,res);

});


app.post('/ModifyAnnoucement',function(req,res){

res.sendFile(__dirname + '/views/admin/modifyAnnoucement.html');

 //studentModel.modifyStudentInDB(req,res);

});


app.post('/ModifyScoreScheme',function(req,res){

	sess = req.session;

if(sess.pid==2){
	res.sendFile(__dirname + '/views/admin/scoringScheme.html');
}
else 
	res.redirect('/');


});


app.post('/attemptAssessmentQuestion',function(req,res){

	sess = req.session;

if(sess.pid==1){
	if(sess.ssid != 1){
	res.sendFile(__dirname + '/views/student/sessionLogin.html');
}
else{

	res.sendFile(__dirname + '/views/student/questionPage.html');
	//console.log("Already Login session");




}

}
else 
	res.redirect('/');


});



app.post('/attemptPage',function(req,res){

	sess = req.session;

if(sess.pid==1){
	
	res.sendFile(__dirname + '/views/student/attemptPage.html');

}
else 
	res.redirect('/');


});

app.post('/DeleteAnnoucement',function(req,res){
        
res.sendFile(__dirname + '/views/admin/deleteAnnoucement.html');



});


app.post('/getStudentAnnouncements',function(req,res){
        
annoucementModel.getStudentAnnouncement(req,res);

});


app.post('/CreateAnnoucement',function(req,res){
        
res.sendFile(__dirname + '/views/admin/createAnnoucement.html');


});



app.post('/submitCreateAnnoucement',function(req,res){
        

annoucementModel.createAnnoucementInDB(req,res);


});

app.post('/getLabQuestions',function(req,res){
        

questionModel.getLabQuestions(req,res);


});

app.post('/logInSession', function(req, res){



auth.logInSession(req,res);

});

app.post('/getAnnouncements', function(req, res){


annoucementModel.getAnnouncements(req,res);

});

app.post('/getQuizQuestions', function(req, res){


questionModel.getQuizQuestions(req,res);

});



app.post('/enterTest', function(req, res){

	sess = req.session;

if(sess.pid==1){
	
     res.json({ state : 1});
//createSess.createNewSession(req,res);
	
	

}
else 
	res.redirect('/');


});




app.post('/createNewQuestion', function(req, res){


questionModel.addQuestions(req,res);


});


app.post('/questionPage', function(req, res){


res.sendFile(__dirname + '/views/student/questionPage.html');


});

app.post('/DeleteLabFromDB', function(req, res){

labModel.deleteLabFromDB(req,res);



});

app.post('/attemptLabs', function(req, res){


res.sendFile(__dirname + '/views/student/LabPage.html');


});

app.post('/getLabs',function(req,res){
		
	labModel.getLabsFromDB(req,res);

});






app.post('/getQ1',function(req,res){
		
questionModel.getQ1fromDB(req,res);



});

app.post('/getQ2',function(req,res){
		
questionModel.getQ2fromDB(req,res);



});

app.post('/getQ3',function(req,res){
		
questionModel.getQ3fromDB(req,res);



});

app.post('/getQ4',function(req,res){
		
questionModel.getQ4fromDB(req,res);



});


app.post('/chooseLab',function(req,res){
		
console.log(req.body.labNo);
res.sendFile(__dirname + '/views/student/'+req.body.labNo+'.html');


});


app.post('/labSubmission',function(req,res){
		

res.sendFile(__dirname + '/views/student/submissionPage.html');


});

app.post('/DeleteAnnoucementFromDB',function(req,res){

annoucementModel.deleteAnnoucement(req,res);

});



app.post('/compileQ1',function(req,res){

var Q1Title = req.body.data.questionTitle;
var Q1code =  req.body.data.Q1code;

Q1code = Q1code.replace(/package\s[a-zA-z0-9]*;/,"");
var studentName = req.body.data.studentName;

if (!fs.existsSync(__dirname + "/../Quiz/"+req.body.data.studentName)){
    fs.mkdirSync(__dirname + "/../Quiz/"+req.body.data.studentName);
}


fs.writeFile(__dirname + "/../Quiz/"+req.body.data.studentName +'/Q1.java', Q1code, function(err) {
    if(err) {
        return console.log(err);
    }


    else{
    console.log("The file was saved!");

    var compile ="";
     output = cmd.get(


 		'javac Quiz/'+studentName+'/Q1.java',
        function(err, data, stderr){


	if(err){
            		console.log(err);

            		 res.json({ state : 0, error : err.toString()});

            	}

            	else {

			 res.json({ state : 1});

            	}

     	});

    }

}); 


});





app.post('/compileQ2',function(req,res){


var Q2Title = req.body.data.questionTitle;
var Q2code =  req.body.data.Q2code;
var studentName = req.body.data.studentName;
Q2code = Q2code.replace(/package\s[a-zA-z0-9]*;/,"");
if (!fs.existsSync(__dirname + "/../Quiz/"+req.body.data.studentName)){
    fs.mkdirSync(__dirname + "/../Quiz/"+req.body.data.studentName);
}

fs.writeFile(__dirname + "/../Quiz/"+req.body.data.studentName +'/Q2.java', Q2code, function(err) {


 if(err) {
        return console.log(err);
    }
    else

    {

    console.log("The file was saved!");

   var output = cmd.get('javac Quiz/'+studentName+'/Q2.java',
        function(err, data, stderr){


				if(err){
            		console.log(err);

            		compileScore = 0;

            		//check for syntax
            		 res.json({ state : 0, error : err.toString()});

            	}

            	else {


			 res.json({ state : 1});

            	}

        });



    }

});


});



app.post('/compileQ3',function(req,res){


var Q3Title = req.body.data.questionTitle;
var Q3code =  req.body.data.Q3code;
var studentName = req.body.data.studentName;
Q3code = Q3code.replace(/package\s[a-zA-z0-9]*;/,"");
//console.log(Q3Title);
//console.log(Q3code);
//console.log(studentName);
if (!fs.existsSync(__dirname + "/../Quiz/"+req.body.data.studentName)){
    fs.mkdirSync(__dirname + "/../Quiz/"+req.body.data.studentName);
}
fs.writeFile(__dirname + "/../Quiz/"+req.body.data.studentName +'/Q3.java', Q3code, function(err) {



 if(err) {
        return console.log(err);
    }
    else{


    console.log("The file was saved!");

    var compile ="";

   output = cmd.get('javac Quiz/'+studentName+'/Q3.java',
        function(err, data, stderr){
				if(err){
            		console.log(err);

            			console.log("score: 0");

            		//check for syntax
            		 res.json({ state : 0, error : err.toString()});

            	}

            	else{

			 res.json({ state : 1});
            	}

	});


      }
	});




});


app.post('/compileQ4',function(req,res){


var Q4Title = req.body.data.questionTitle;
var Q4code =  req.body.data.Q4code;
var studentName = req.body.data.studentName;
Q4code = Q4code.replace(/package\s[a-zA-z0-9]*;/,"");

if (!fs.existsSync(__dirname + "/../Quiz/"+req.body.data.studentName)){
    fs.mkdirSync(__dirname + "/../Quiz/"+req.body.data.studentName);
}
fs.writeFile(__dirname + "/../Quiz/"+req.body.data.studentName +'/Q4.java', Q4code, function(err) {



 if(err) {
        return console.log(err);
    }
    else{


    console.log("The file was saved!");

    var compile ="";

   output = cmd.get('javac Quiz/'+studentName+'/Q4.java',
        function(err, data, stderr){
                if(err){
                    console.log(err);

                        //console.log("score: 0");

                    //check for syntax
                     res.json({ state : 0, error : err.toString()});

                }

                else{

             res.json({ state : 1});
                }

    });


      }
    });




});



app.post('/getQuizSubmissionRecords',function(req,res){

labModel.getQuizSubmissionRecords(req,res);


});


app.post('/submitPlane',function(req,res){

compile.submitPlane(req,res);

});

app.post('/getAllQuizSubmissionRecords',function(req,res){

labModel.getAllQuizSubmissionRecords(req,res);

});

app.post('/StudentSubmitLab',function(req,res){

  submitLab(req,res,function(err){
if (!fs.existsSync(__dirname + "/../Labs/"+req.body.username)){
    fs.mkdirSync(__dirname + "/../Labs/"+req.body.username);
}


extract(__dirname + '/../Labs/' + req.file.filename, {dir: __dirname + '/../Labs/'+req.body.username+'/' }, function (err) {

if(err){

 cmd.run('move Labs\\' +req.file.filename+" " + "Labs\\"+req.body.username);

 console.log("Nothing to extract");
}

else{
     cmd.run('del Labs\\' +req.file.filename);
}
  
labModel.writeSubmissionRecord(req,res);


});
  });
});



app.post('/home',function(req,res){

res.sendFile(__dirname + '/views/adminHome.html');


});


app.post('/getLabQuestionsDropdown',function(req,res){

labModel.getLabQuestionsDropdown(req,res);


});


app.post('/submitSolution',function(req,res){

compile.processEngineQuiz(req,res);


});


app.post('/ViewAttempts',function(req,res){

res.sendFile(__dirname + '/views/student/viewAttempts.html');
//compile.processEngineQ1(req,res);

//compile.processEngineQ2(req,res);

});


app.post('/getLabSubmissionRecords',function(req,res){
//console.log("here");
labModel.getLabSubmissionRecords(req,res);
//compile.processEngineQ1(req,res);

//compile.processEngineQ2(req,res);

});


}

