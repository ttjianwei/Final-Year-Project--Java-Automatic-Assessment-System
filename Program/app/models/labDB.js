var db = require('../../config');
var Excel = require('exceljs');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
var extract = require('extract-zip');
var cmd=require('node-cmd');
var fs = require('fs');
var PDFDocument = require('pdfkit');
var seconds = new Date().getTime() / 1000;
var doc = new PDFDocument;
var removeDiacritics = require('diacritics').remove;
var accents = require('remove-accents');
var compile = require('../../app/models/compile');

exports.getLabsFromDB = function(req,res){

db.query('SELECT * FROM labs;', function (error, results, fields){

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

exports.deleteLabFromDB = function(req,res){

  		db.query('DELETE from labs WHERE LabName = ?',[req.body.data.labName], function (error, results, fields){
if(error){
 res.json({ state: 0}); 
}
else
 res.json({ state: 1}); 

});


  }          

exports.getLabsDropdown = function(req,res){

db.query('select distinct labGroup from users where LabGroup LIKE \'Lab%\'', function (error, results, fields){

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


exports.writeSubmissionRecord= function(req,res){



var uid =Math.floor(new Date().valueOf() * Math.random());
uid = uid.toString().substring(0,11);
uid = parseInt(uid);
var output = "";
var filename = req.file.filename.replace(".zip","");
var o2="";
var filesCompiled ="";
var dir ="";
var compileScore = 0;





var dd = cmd.get('dir /b /a-d Labs\\'+req.body.username+'\\' + filename,
	function(err, data, stderr){

		if(err){
	
	var dd = cmd.get('dir /b /a-d Labs\\'+req.body.username,
	function(err, data, stderr){

if(err){

	console.log(err);


}


else{
		
			var split = data.toString().split("\r\n");
			var javafiles = [];
			for(var x=0; x<split.length;x++){
				if(split[x].includes(".java")){
					split[x] = split[x].replace("\r\n");
					javafiles.push(split[x]);
				}
			}
			//console.log(javafiles.length);

			for(var o=0;o<javafiles.length;o++){
		
				var content = fs.readFileSync("Labs/"+req.body.username+"/"+javafiles[o], 'utf8');
				//console.log(content);
				content = content.replace(/package\s[a-zA-z0-9]*;/,"");

				fs.writeFileSync("Labs/"+req.body.username+"/"+javafiles[o],content,'utf8');
			}


 output = cmd.get(
        'javac Labs/'+req.body.username+'/*.java',
        function(err, data, stderr){
           
           if (err) {
			flag = 1;
          	// err = err.toString();
             console.log(err);


             compileScore = 0;
             
//filesCompiled = "";
 
cmd.run('xcopy Labs\\' +req.body.username + " " + "labs\\backups\\"+Date.now() + Math.random() + " /e /i /h");


compile.processLab(req,res,filesCompiled,compileScore,javafiles,err,uid);

            }


            else{


           dir = cmd.get('dir Labs\\'+req.body.username + '\\*.java /b /a-d',function(err, data, stderr){

            	if(err){
            		console.log("");
            	}

            	else {

            		console.log(data);

            		filesCompiled = data.toString().trim();

            		filesCompiled.replace(/[^\x00-\x7F]/g, "");
            
            		filesCompiled = removeDiacritics(filesCompiled);
            		filesCompiled = accents.remove(filesCompiled);
            		compileScore = 1;


cmd.run('xcopy Labs\\' +req.body.username + " " + "labs\\backups\\"+Date.now() + Math.random() + " /e /i /h");

 compile.processLab(req,res,filesCompiled,compileScore,javafiles,err,uid);
// cmd.run('move Labs\\' +req.body.username + " " + 'Labs\\backups');
//console.log('move ' +'/../../Labs/' +req.body.username + " " + '/../../Labs/backups/' +req.body.username +"/" +req.file.filename);
	
            	}
            });
            
    
           console.log("Compile Successful");


       }
        }
);

}




	});



		}

		else

		{
			var split ="";
			var content="";

				
			split = data.toString();
			split = split.split("\r\n");
			


			//console.log("number of files in array: " +  split.length);
			var javafiles = [];
			for(var x=0; x<split.length;x++){
				if(split[x].includes(".java")){
					split[x] = split[x].replace("\r\n");
					javafiles.push(split[x]);
				}
			}
			

			if(split.length==2){
				 content = fs.readFileSync("Labs/"+req.body.username+"/"+javafiles[0], 'utf8');
				//console.log(content);
				content = content.replace(/package\s[a-zA-z0-9]*;/,"");
				//console.log(content);
				fs.writeFileSync("Labs/"+req.body.username+"/"+javafiles[0],content,'utf8');
			}

			else{
			for(var o=0;o<javafiles.length;o++){
						//console.log(javafiles[o]);
						//console.log(javafiles[o].length);
				content = fs.readFileSync("Labs/"+req.body.username+"/"+filename+"/"+javafiles[o], 'utf8');
				//console.log(content);
				content = content.replace(/package\s[a-zA-z0-9]*;/,"");
				//console.log(content);
				fs.writeFileSync("Labs/"+req.body.username+"/"+filename+"/"+javafiles[o],content,'utf8');
			}
			}

 output = cmd.get(
        'javac Labs/'+req.body.username+'/*.java',
        function(err, data, stderr){
           
           if (err) {


			flag = 1;
     
 	 o2 = cmd.get(
	'javac Labs/'+req.body.username+'/'+ filename +'/*.java',

  		function(err, data, stderr){
  		if (err) {

             
           err = err.toString();
             console.log(err);
             
             compileScore = 0;
         }

         else{
         	 compileScore = 1;
			dir= cmd.get('dir Labs\\'+req.body.username+'\\'+ filename +'\\*.java /b /a-d',function(err, data, stderr){

			if(err){
            		console.log(err);
            	}
            	else {
           
            filesCompiled = data.toString().trim();
				filesCompiled.replace(/[^\x00-\x7F]/g, "");
					filesCompiled.replace('Ð', '');
						filesCompiled = removeDiacritics(filesCompiled);
					filesCompiled = accents.remove(filesCompiled);
                		console.log(filesCompiled);








//console.log('move ' +'/../../Labs/' +req.body.username + " " + '/../../Labs/backups/' +req.body.username +"/" +req.file.filename);
            	}

			});
          
         	 console.log("Compile Successful");
         	//console.log(filesCompiled.toString());
         }


cmd.run('xcopy Labs\\' +req.body.username + " " + "labs\\backups\\"+Date.now() + Math.random() + " /e /i /h");
compile.processLab(req,res,filesCompiled,compileScore,javafiles,err,uid);
/// cmd.run('move Labs\\' +req.body.username + " " + 'Labs\\backups');
  						}

 					);
            }
            else{

            compileScore = 1;
           dir = cmd.get('dir Labs\\'+req.body.username + '\\*.java /b /a-d',function(err, data, stderr){

            	if(err){
            		console.log(err);
            	}

            	else {

            		//console.log(data);

            		filesCompiled = data.toString().trim();

            		filesCompiled.replace(/[^\x00-\x7F]/g, "");
            
            		filesCompiled = removeDiacritics(filesCompiled);
            		filesCompiled = accents.remove(filesCompiled);
					console.log(filesCompiled);


	
            	}
            });
            
            //console.log(filesCompiled,toString());
           console.log("Compile Successful");
           cmd.run('xcopy Labs\\' +req.body.username + " " + "labs\\backups\\"+Date.now() + Math.random() + " /e /i /h");
		 compile.processLab(req,res,filesCompiled,compileScore,javafiles,err,uid);

       }
        }
);

}
}








);

db.query('INSERT INTO LabSubmissionRecords (Rid, username, email, submissionDateTime, submissionTitle,uid) VALUES (DEFAULT,?,?,?,?,?);',[req.body.username,req.body.email,dateTime.create().format('Y-m-d H:M:S').toString(),req.body.title,uid], function (error, results, fields){

			if(error){
	
				//return res.status(500).send("Error!");
 				//return errCount=1; 
				console.log("Insert unsuccessful!");
				console.log(uid);
				console.log(error);
			   // res.json({ state : 0});
				//console.log(errCount);

			}
			else {
				console.log("Insert successful!");






				//res.json({ state : 1});
			}
			

});



} 

exports.createLabInDB = function(req,res){

db.query('INSERT INTO labs (LabNo, LabName, LabFile) VALUES (?,?,?);',[req.body.data.labNo,req.body.data.labName,req.body.data.labFileName.replace(".pdf","")], function (error, results, fields){



if(error){
	console.log(error);
	res.json({state:0});
}
else{
	res.json({state:1});
}
});

}

exports.getAllQuizSubmissionRecords = function(req,res){


console.log("here");
db.query('SELECT * FROM quizsubmissionrecords', function (error, results, fields){

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




exports.getQuizSubmissionRecords = function(req,res){

db.query('SELECT * FROM quizsubmissionrecords WHERE username = ?',[req.body.data.username], function (error, results, fields){

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

exports.getLabQuestionsDropdown = function(req,res){


db.query('select distinct Qtitle from labquestions', function (error, results, fields){

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


exports.getLabSubmissionRecords = function(req,res){



db.query('SELECT * FROM labsubmissionrecords WHERE username = ?',[req.body.data.username], function (error, results, fields){

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



exports.getAllSubmissionRecords = function(req,res){



db.query('SELECT * FROM labsubmissionrecords', function (error, results, fields){

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

exports.createLabQuestionInDB = function(req,res){


}