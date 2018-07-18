var cmd=require('node-cmd');
var fs = require("fs");
var spawn = require('child_process').spawn;
var Queue = require('async-function-queue');
var clear = require('clear');
var extract = require('extract-zip');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var db = require('../../config');
var formatted = dt.format('Y-m-d H:M:S');
var d = new Date();
var seconds = d.getTime() / 1000;
var sleep = require('system-sleep');
const ci = require('case-insensitive')
const delay = require('delay');
var exec = require('sync-exec');
var asyncLoop = require('node-async-loop');
var removeDiacritics = require('diacritics').remove;
var accents = require('remove-accents');
var pdfmake=require('pdfmake');


exports.compileTest = function(req,res){

var config ="";
var configSplit="";
var inputs="";
var input="";
var outputs="";
var output="";
var content ="";
var textOut = [];
var dir="";
try {

var file = req.body.data.fileName;
var output = "";


if(file.includes(".zip")){

var fileOriginal = file.replace(".zip","");

extract(__dirname + '/../../SolutionTest/' + file, {dir: __dirname + '/../../SolutionTest/' }, function (err) {

 cmd.run('del SolutionTest\\' + file);



          dir = cmd.get('dir SolutionTest\\'+fileOriginal + '\\*.java /b /a-d',function(err, data, stderr){

            	if(err){
            		//console.log(err);

       					  dir = cmd.get('dir SolutionTest\\*.java /b /a-d',function(err, data, stderr){


						var split = data.toString().split("\r\n");
						var javafiles = [];
						for(var x=0; x<split.length;x++){
						if(split[x].includes(".java")){
						split[x] = split[x].replace("\r\n");
						//console.log(split[x]);
						javafiles.push(split[x]);
						}
						}


						content = fs.readFileSync('SolutionTest\\'+fileOriginal+'.java', 'utf8');
						content = content.replace(/package\s[a-z0-9]*;/,"");

						fs.writeFileSync('SolutionTest\\'+fileOriginal+'.java',content,'utf8');
						fs.close;

						config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
						fs.close;

						configSplit = config.split(",");
						inputs =configSplit[1].replace("Inputs:",""); 
						inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
						outputs = configSplit[2].replace("Outputs:","");
						input = inputs.split("#"); 
						output = outputs.split("#") ;
				
						output = cmd.get(
 	 

        				'javac solutionTest/'+fileOriginal+".java",
      					 function(err, data, stderr){


						var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);

							if(input){
								testSpawn.stdout.on('data', function (data){ 

								console.log(data.toString());

								textOut.push(data.toString());
		
							});


					console.log(input[0]);
					console.log(input[1]);
					console.log(input[2]);
							for(var j=0;j<input.length;j++){
										
							sleep(1000); 
							console.log("Input: " + input[j]);
							testSpawn.stdin.write(input[j]+"\n");
							sleep(1000); 
								
								
									}
							testSpawn.kill;
							
							res.json({ state : 1 , resultArr : textOut , inputArr: input});

							}

      					 });

         				 });





            	}

            	else {

            	
            			var split = data.toString().split("\r\n");
						var javafiles = [];
						for(var x=0; x<split.length;x++){
						if(split[x].includes(".java")){
						split[x] = split[x].replace("\r\n");
						//console.log(split[x]);
						javafiles.push(split[x]);
						}
						}

					if(javafiles.length>1){
			


						for(var o;o<javafiles.length;o++){

							content = fs.readFileSync('SolutionTest\\'+javafiles[o]+'.java', 'utf8');
							content = content.replace(/package\s[a-z0-9]*;/,"");

							fs.writeFileSync('SolutionTest\\'+fileOriginal+'.java',content,'utf8');
							fs.close;
							}

							output = cmd.get(
								 'javac solutionTest/'+fileOriginal+'/*.java',	
      					 function(err, data, stderr){

      					 	if(err){
      					 		console.log(err);
      					 	}
      					 	else{

							//var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);

							config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
							fs.close;

							configSplit = config.split(",");
							inputs =configSplit[1].replace("Inputs:",""); 
							inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
							outputs = configSplit[2].replace("Outputs:","");
							input = inputs.split("#"); 
							output = outputs.split("#") ;
							var mainFile =  configSplit[5].replace("Main:","");
							mainFile = mainFile.replace(/[^\x20-\x7E]+/g, ""); 
							console.log(mainFile);
							var testSpawn = spawn('java',['-classpath','SolutionTest\\'+fileOriginal,mainFile]);

							if(input){
								testSpawn.stdout.on('data', function (data){ 

								console.log(data.toString());
								textOut.push(data.toString());
		
							});

							for(var j=0;j<input.length;j++){
										// testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
							sleep(1000); 
							console.log("Input: " + input[j]);
							testSpawn.stdin.write(input[j]+"\n");
							sleep(1000); 
										//testSpawn.kill;
								
									}
									testSpawn.kill;
								
					            	 res.json({ state : 1, resultArr : textOut , inputArr: input});


							}
      					 	}


      					 });
					}
					else{


						content = fs.readFileSync('SolutionTest\\'+fileOriginal+'.java', 'utf8');

						content = content.replace(/package\s[a-z0-9]*;/,"");

						fs.writeFileSync('SolutionTest\\'+fileOriginal+'.java',content,'utf8');
						fs.close;




						fileOriginal = file.replace(".zip","");


 						output = cmd.get(
 	 

        				'javac solutionTest/'+fileOriginal+".java",
      					 function(err, data, stderr){
           
         				   if(err){

      						 if ((err.toString().includes("file not found"))) {

						fileOriginal = file.replace(".zip","");
          			 	 output = cmd.get(
       					 'javac solutionTest/'+fileOriginal+'/'+fileOriginal+'.java',
      					  function(err, data, stderr){
           
          				 if (err) {
            		   console.log(err);
          				 err = err.toString();
              	 res.json({ state : 0 ,err:err});
             
           			 }
         			   else

					{

				var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);

				config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
				fs.close;

				configSplit = config.split(",");
				inputs =configSplit[1].replace("Inputs:",""); 
				inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
				outputs = configSplit[2].replace("Outputs:","");
				input = inputs.split("#"); 
				output = outputs.split("#") ;

				if(!input){
				testSpawn.stdout.on('data', function (data){ 

		
					
					console.log(data.toString());
					textOut.push(data.toString());
						});
					}
					else{


					testSpawn.stdout.on('data', function (data){ 

					console.log(data.toString());
					
					textOut.push(data.toString());
						});
					}

					config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName+'.java', 'utf8');
					fs.close;

					configSplit = config.split(",");
					inputs =configSplit[1].replace("Inputs:",""); 
					inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
					outputs = configSplit[2].replace("Outputs:","");
					input = inputs.split("#"); 
					output = outputs.split("#") ;


					for(var j=0;j<input.length;j++){
										// testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
											sleep(1000); 
											console.log("Input: " + input[j]);
											testSpawn.stdin.write(input[j]+"\n");
											sleep(1000); 
										//testSpawn.kill;
								
									}
								testSpawn.kill;
					            	 res.json({ state : 1, resultArr : textOut , inputArr: input});

					}

					        }
					    );

					            }

					  err = err.toString();
					            	 res.json({ state : 0 ,err:err});
					            }

					            else


					{

					var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);


					config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
					fs.close;

					configSplit = config.split(",");
					inputs = configSplit[1].replace("Inputs:",""); 
					inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
					outputs = configSplit[2].replace("Outputs:","");
					input = inputs.split("#"); 
					output = outputs.split("#") ;

					console.log(inputs);
					if(!input){

					testSpawn.stdout.on('data', function (data){ 


										
										console.log(data.toString());
									
									textOut.push(data.toString());
							
											});
					//do here
					}
					else{

					config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
					fs.close;

					configSplit = config.split(",");
					inputs =configSplit[1].replace("Inputs:",""); 
					inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
					outputs = configSplit[2].replace("Outputs:","");
					input = inputs.split("#"); 
					output = outputs.split("#");

					testSpawn.stdout.on('data', function (data){ 

												//console.log(data.toString());

							
										console.log(data.toString());
										//resultseq.push(data.toString());
										//testSpawn.stdout.clear();
										textOut.push(data.toString());
							
											});


							for(var j=0;j<input.length;j++){
										// testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
											sleep(1000); 
											console.log("Input: " + input[j]);
											testSpawn.stdin.write(input[j]+"\n");
											sleep(1000); 
										//testSpawn.kill;
								
									}
									testSpawn.kill;

					}

					            	 res.json({ state : 1, resultArr : textOut , inputArr: input});

					}

					        }
					    );


										}


					            	}
					            });
					            



//console.log(err);

});



}
else{


 output = cmd.get(
        'javac solutionTest/'+file,
        function(err, data, stderr){
           
           if (err) {
               console.log(err);
           err = err.toString();
               res.json({ state : 0 ,err:err});
             
            }
            else

{


var fileOriginal = file.replace(".java","");
var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
fs.close;

configSplit = config.split(",");
inputs =configSplit[1].replace("Inputs:",""); 
inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
outputs = configSplit[2].replace("Outputs:","");
input = inputs.split("#"); 
output = outputs.split("#");



if(!input){

testSpawn.stdout.on('data', function (data){ 
					
					console.log(data.toString());
							textOut.push(data.toString());

		
						});
//do here
}
else{



testSpawn.stdout.on('data', function (data){ 

							//console.log(data.toString());

					console.log(data.toString());
							textOut.push(data.toString());

					//resultseq.push(data.toString());
					//testSpawn.stdout.clear();
					
		
						});


config = fs.readFileSync('Quarantine\\'+req.body.data.configFileName, 'utf8');
fs.close;

configSplit = config.split(",");
inputs =configSplit[1].replace("Inputs:",""); 
inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
outputs = configSplit[2].replace("Outputs:","");
input = inputs.split("#"); 
output = outputs.split("#");

		for(var j=0;j<input.length;j++){
					// testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
						sleep(1000); 
						console.log("Input: " + input[j]);
						testSpawn.stdin.write(input[j]+"\n");
						sleep(1000); 
					//testSpawn.kill;
			
				}
				testSpawn.kill;
			}

}

            	 res.json({ state : 1,  resultArr : textOut , inputArr: input});


        }
    );


}

}
catch(error){
	console.log(error);
	res.json({ state : 0 ,err:err});
}
}




exports.compileTestManual = function(req,res){

var file = req.body.data.fileName;
var inputs="";
var input="";
var outputs="";
var output="";
try{
if(file.includes(".zip")){

var fileOriginal = file.replace(".zip","");

extract(__dirname + '/../../SolutionTest/' + file, {dir: __dirname + '/../../SolutionTest/' }, function (err) {

cmd.run('del SolutionTest\\' + file);
var content = fs.readFileSync('SolutionTest\\'+fileOriginal+'.java', 'utf8');
content = content.replace(/package\s[a-z0-9]*;/,"");
fs.writeFileSync('SolutionTest\\'+fileOriginal+'.java',content,'utf8');
fs.close;
fileOriginal = file.replace(".zip","");


 output = cmd.get(
 	 

        'javac solutionTest/'+fileOriginal+".java",
        function(err, data, stderr){

        	     if (err) {
           console.log(err);
           err = err.toString();
               res.json({ state : 0 ,err:err});
            }
            else

			{

				var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);

				inputs = req.body.data.input;
				inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
				outputs = req.body.data.output;
				outputs = outputs.replace(/[^\x20-\x7E]+/g, "");
				input = inputs.split("#"); 
				output = outputs.split("#") ;

				testSpawn.stdout.on('data', function (data){ 

				console.log(data.toString());
					
		
						});


				for(var j=0;j<input.length;j++){
					
						sleep(1000); 
						console.log("Input: " + input[j]);
						testSpawn.stdin.write(input[j]+"\n");
						sleep(1000); 
					
				}


            	 res.json({ state : 1});

}

        }
    );

            });



}

else{


 output = cmd.get(
        'javac solutionTest/'+file,
        function(err, data, stderr){
           
           if (err) {
               console.log(err);
           err = err.toString();
               res.json({ state : 0 ,err:err});
             
            }
            else

			{


			var fileOriginal = file.replace(".java","");
			var testSpawn = spawn('java',['-classpath','SolutionTest',fileOriginal]);
	

			inputs = req.body.data.input;
			inputs = inputs.replace(/[^\x20-\x7E]+/g, "");
			outputs = req.body.data.output;
			outputs = outputs.replace(/[^\x20-\x7E]+/g, "");
			input = inputs.split("#"); 
			output = outputs.split("#") ;


			testSpawn.stdout.on('data', function (data){ 


					console.log(data.toString());

						});


		for(var j=0;j<input.length;j++){
	
						sleep(1000); 
						console.log("Input: " + input[j]);
						testSpawn.stdin.write(input[j]+"\n");
						sleep(1000); 
			
				}
			

				}

            	 res.json({ state : 1});


        }
    );


}



}
catch(error){
	console.log(error);
	res.json({ state : 0 ,err:err});
}
}





exports.processEngineQuiz = function(req,res){
var uid =Math.floor(new Date().valueOf() * Math.random());
var PDFDocument = require('pdfkit');
//Fetch Q1 Data
var Q1Title = req.body.data.q1Title;
var Q1code =  req.body.data.Q1code;

//Fetch Q2 Data
var Q2Title = req.body.data.q2Title;
var Q2code =  req.body.data.Q2code;

//Fetch Q3 Data
var Q3Title = req.body.data.q3Title;
var Q3code =  req.body.data.Q3code;


var q1ToQ3Titles = [Q1Title,Q2Title,Q3Title];
var studentName = req.body.data.studentName;

var Q4Title = req.body.data.q4Title;
var Q4code =  req.body.data.Q4code;


//var content = fs.readFileSync('config.txt', 'utf8');
//fs.close;
//var titles = content.split("|");



Q1code = Q1code.replace(/package\s[a-z0-9]*;/,"");
Q2code = Q2code.replace(/package\s[a-z0-9]*;/,"");
Q3code = Q3code.replace(/package\s[a-z0-9]*;/,"");
Q4code = Q4code.replace(/package\s[a-z0-9]*;/,"");

var Q1SyntaxWeight=0;
var Q1OutputWeight=0;
var Q1CompileWeight=0;
var Q2SyntaxWeight=0;
var Q2OutputWeight=0;
var Q2CompileWeight=0;
var Q3SyntaxWeight=0;
var Q3OutputWeight=0;
var Q3CompileWeight=0;
var Q4SyntaxWeight=0;
var Q4OutputWeight=0;
var Q4CompileWeight=0;

var proceed =0;
var Q1Score =0;
var Q1OutputScore =0;
var Q1SyntaxScore =0;
var Q1CompileScore=0;
var Q2Score =0;
var Q2OutputScore =0;
var Q2SyntaxScore =0;
var Q2CompileScore=0;

var Q3Score =0;
var Q3OutputScore =0;
var Q3SyntaxScore =0;
var Q3CompileScore=0;

var Q4Score =0;
var Q4OutputScore =0;
var Q4SyntaxScore =0;
var Q4CompileScore=0;

var q1keywordscheck =[];
var q2keywordscheck =[];
var q3keywordscheck =[];
var q4keywordscheck =[];
var content = "";

db.query('SELECT QOutputWeight,QSyntaxWeight,QCompileWeight FROM QuizQuestions WHERE Qtitle= ?',[Q1Title], function (error, results, fields){

if(error){
	console.log(error);
}

else{

	Q1SyntaxWeight = results[0].QSyntaxWeight;
	Q1OutputWeight = results[0].QOutputWeight;
	Q1CompileWeight = results[0].QCompileWeight;

}

});

db.query('SELECT QOutputWeight,QSyntaxWeight,QCompileWeight FROM QuizQuestions WHERE Qtitle= ?',[Q2Title], function (error, results, fields){

if(error){
	console.log(error);
}

else{

	Q2SyntaxWeight = results[0].QSyntaxWeight;
	Q2OutputWeight = results[0].QOutputWeight;
	Q2CompileWeight = results[0].QCompileWeight;


}


});
db.query('SELECT QOutputWeight,QSyntaxWeight,QCompileWeight FROM QuizQuestions WHERE Qtitle= ?',[Q3Title], function (error, results, fields){

if(error){
	console.log(error);
}

else{

	Q3SyntaxWeight = results[0].QSyntaxWeight;
	Q3OutputWeight = results[0].QOutputWeight;
	Q3CompileWeight = results[0].QCompileWeight;


}


});
db.query('SELECT QOutputWeight,QSyntaxWeight,QCompileWeight FROM QuizQuestions WHERE Qtitle= ?',[Q4Title], function (error, results, fields){

if(error){
	console.log(error);
}

else{

	Q4SyntaxWeight = results[0].QSyntaxWeight;
	Q4OutputWeight = results[0].QOutputWeight;
	Q4CompileWeight = results[0].QCompileWeight;


}


});



sleep(1000);


if (!fs.existsSync(__dirname +'/../../Quiz/QuizReports/'+ studentName)){
fs.mkdirSync(__dirname +'/../../Quiz/QuizReports/'+ studentName);
}
	try{
var doc = new PDFDocument;
doc.pipe(fs.createWriteStream(__dirname +'/../../Quiz/QuizReports/'+ studentName +"(" + uid + ")" +'.pdf'));
doc.image(__dirname +'/../public/ntu.png', 150, 50, {width: 300});

//user s\data
doc.font('Times-Roman').fontSize(18).text('Title: ' + req.body.data.session, 50, 200);
doc.font('Times-Roman').fontSize(18).text('Date Submitted: ' + formatted, 50, 225);
doc.font('Times-Roman').fontSize(18).text('Name of Student: ' + studentName, 50, 250);


doc.font('Helvetica-Bold').fontSize(32).text('Summary', 240, 300);




	var noOfCorrect =0;
if(Q1code){
// Process Q1
var q1child = spawn('java',['-classpath','Quiz/Student','Q1']);

var resultseq = [];
q1child.stdout.on('data', function (data){ 

			
					if(data.toString().includes("Output: ")){
					console.log(data.toString());
					resultseq.push(data.toString());
					q1child.stdout.clear();
					}
		
						});



   //Q1
   db.query('SELECT QConfigFile FROM QuizQuestions WHERE Qtitle= ?',[Q1Title], function (error, results, fields){

   	var Q1configFile = results[0].QConfigFile;
   	var keywordsExist = 1;
   	content = fs.readFileSync('Quiz\\configs\\'+Q1configFile, 'utf8');
   	//console.log(content);
   	var configs = content.split(",");
   	//input
   	configs[1] = configs[1].replace("Inputs:", "");
   	configs[1] = configs[1].replace("\n","");
   	configs[1] = configs[1].replace("\r","");
   	configs[1] = configs[1].replace(/[^\x20-\x7E]+/g, "");

   	configs[2] = configs[2].replace("Outputs:", "");
   	configs[2] = configs[2].replace("\n","");
   	configs[2] = configs[2].replace("\r","");
   	configs[2] = configs[2].replace(/[^\x20-\x7E]+/g, "");

   	configs[3] = configs[3].replace("Keywords:", "");
    configs[3] = configs[3].replace("\n","");
   	configs[3] = configs[3].replace("\r","");
   	configs[3] = configs[3].replace(/[^\x20-\x7E]+/g, "");

    configs[4] = configs[4].replace("Score:", "");
   	configs[4] = configs[4].replace("\n","");
   	configs[4] = configs[4].replace("\r","");
   	configs[4] = configs[4].replace(/[^\x20-\x7E]+/g, "");

   	var inputs = configs[1].split("#");
   	var outputs = configs[2].split("#");
   	var score = configs[4].split("#");

   	if(configs[3]){
   	var keywords = configs[3].split("#");

   	}
   	else{
   		keywordsExist = 0;
   		Q1SyntaxScore =0;
   	
   	}
   	var keywordmatch=0;
   	var keywordthatmatch =[];
   	var keywordScore =0 ;
   	var maxKeywordScore = 0;


if(keywordsExist>0){

 	for(var e=0;e<keywords.length;e++)
 	{

 		maxKeywordScore  += score[e];
 		console.log("Keyword checked:" + keywords[e]);
 		if(Q1code.includes(keywords[e])){
 			keywordmatch++;
			keywordthatmatch.push(keywords[e]);
			keywordScore += score[e];
			console.log("Keyword found:" + keywords[e]);
 		}
 		else{
		console.log(keywords[e] + " not found");

 		}

 	}
 }


   		for(var j=0;j<inputs.length;j++){
					
		sleep(1000); 
		console.log("Input: " +inputs[j]);
		q1child.stdin.write(inputs[j]+"\n");
		sleep(1000); 
			
				}

		var noOfCorrect =0;

		for(var n=0;n<inputs.length;n++){

		resultseq[n] = resultseq[n].replace("Output: ","");
		resultseq[n] = resultseq[n].replace("\n","");
		resultseq[n] = resultseq[n].replace("\r","");	
		resultseq[n] = resultseq[n].replace(/[^\x20-\x7E]+/g, "");
		if(ci(resultseq[n]).includes(ci(outputs[n]))){

			 noOfCorrect++;
		}
		
		}

		console.log(noOfCorrect + " out of " + outputs.length + " correct"  );
		Q1OutputScore = noOfCorrect/outputs.length;
		q1child.kill('SIGINT');

doc.moveDown();


doc.font('Helvetica-Bold').fontSize(16).text("Application ran: " + Q1Title,50);
doc.moveDown();
for(var o=0; o< resultseq.length; o++){
doc.font('Helvetica-Bold').fontSize(16).text("Test Case: " + (o+1), 50);	
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("Tested Input: " + inputs[o], 50);
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("Captured Output: " + resultseq[o], 50);
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("Expected Output: " + outputs[o], 50);
doc.moveDown();
	if(ci(resultseq[o]).includes(ci(outputs[o]))){

		doc.font('Times-Roman').fontSize(14).text("Result: Correct. ", 50);
	
		
		doc.image(__dirname +'/../public/correct.png',{width: 30});
				doc.moveDown();

	}
	else

	{
		doc.font('Times-Roman').fontSize(14).text("Result: Wrong. ", 50);
		doc.image(__dirname +'/../public/wrong.png',{width: 30});
		doc.moveDown();

	}
}
			

doc.font('Times-Roman').fontSize(14).text(noOfCorrect +" out of " + outputs.length + " correct", 50);

doc.moveDown();

	if(keywordsExist>0){
doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
for(var e=0; e< keywords.length; e++){
doc.font('Times-Roman').fontSize(14).text(keywords[e], 50);

	}

doc.moveDown();
doc.moveDown();

doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
for(var b=0; b< keywordthatmatch.length ; b++){
doc.font('Times-Roman').fontSize(14).text(keywordthatmatch[b], 50);
}
}
else{

	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: None ", 50);
	doc.moveDown();
	
}


resultseq = [];


doc.moveDown();	
doc.moveDown();

Q1OutputScore = ((Q1OutputWeight/100)*Q1OutputScore)*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q1 Output Score: " + Q1OutputScore, 50);
if(keywordsExist>0){
	

Q1CompileScore = (((keywordScore/maxKeywordScore)*(Q1CompileWeight/100)))*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q1 Compile Score: " + Q1CompileScore, 50);

}
else{
	
Q1CompileScore = Q1CompileWeight;
doc.font('Helvetica-Bold').fontSize(14).text("Q1 Compile Score: " + Q1CompileScore, 50);

}
Q1Score = parseInt(Q1CompileScore) + parseInt(Q1OutputScore);
doc.font('Helvetica-Bold').fontSize(14).text("Q1 Total Score: " + Q1Score, 50);


});
}


//Process Q2
resultseq = [];
noOfCorrect =0;
if(Q2code){
var q2child = spawn('java',['-classpath','Quiz/Student','Q2']);

	
//var resultseq = [];
	resultseq = [];
	q2child.stdout.on('data', function (data){ 

		
		if(data.toString().includes("Output: ")){
		console.log(data.toString());
		resultseq.push(data.toString());

		q2child.stdout.clear();

					}
		

	});

	   db.query('SELECT QConfigFile FROM QuizQuestions WHERE Qtitle= ?',[Q2Title], function (error, results, fields){
   		var Q2configFile = results[0].QConfigFile;
   		var keywordsExist = 1;
   		content = fs.readFileSync('Quiz\\configs\\'+Q2configFile, 'utf8');
   		var configs = content.split(",");
   		//console.log(content);

   	configs[1] = configs[1].replace("Inputs:", "");
   	configs[1] = configs[1].replace("\n","");
   	configs[1] = configs[1].replace("\r","");
   	configs[1] = configs[1].replace(/[^\x20-\x7E]+/g, "");

   	configs[2] = configs[2].replace("Outputs:", "");
   	configs[2] = configs[2].replace("\n","");
   	configs[2] = configs[2].replace("\r","");
   	configs[2] = configs[2].replace(/[^\x20-\x7E]+/g, "");

   	configs[3] = configs[3].replace("Keywords:", "");
    configs[3] = configs[3].replace("\n","");
   	configs[3] = configs[3].replace("\r","");
   	configs[3] = configs[3].replace(/[^\x20-\x7E]+/g, "");

    configs[4] = configs[4].replace("Score:", "");
   	configs[4] = configs[4].replace("\n","");
   	configs[4] = configs[4].replace("\r","");
   	configs[4] = configs[4].replace(/[^\x20-\x7E]+/g, "");

   	var inputs = configs[1].split("#");
   	var outputs = configs[2].split("#");
   	var score = configs[4].split("#");

   	if(configs[3]){
   	var keywords = configs[3].split("#");

   	}
   	else{
   		keywordsExist = 0;
   		Q2SyntaxScore =0;

   		//console.log("No Keywords Exist");
   	}

   	var keywordthatmatch =[];
   	var keywordScore =0 ;
	var keywordmatch=0;
 	var maxKeywordScore = 0;

	if(keywordsExist>0){
 	for(var e=0;e<keywords.length;e++)
 	{
 		maxKeywordScore += score[e];
 		console.log("Keyword checked:" + keywords[e]);

 		if(Q2code.includes(keywords[e])){

 			keywordmatch++;
			keywordthatmatch.push(keywords[e]);
			keywordScore += score[e];
			console.log("Keyword found:" + keywords[e]);

 		}
 		else{
 				console.log("Keyword not found");
 		}

 	}
 	}

   		for(var j=0;j<inputs.length;j++){
					
		sleep(1000); 
		console.log(inputs[j]);
		q2child.stdin.write(inputs[j]+"\n");
		sleep(1000); 
			
				}

		var noOfCorrect =0;

		for(var n=0;n<outputs.length;n++){

		resultseq[n] = resultseq[n].replace("Output: ","");
		resultseq[n] = resultseq[n].replace("\n","");
		resultseq[n] = resultseq[n].replace("\r","");	
		resultseq[n] = resultseq[n].replace(/[^\x20-\x7E]+/g, "");
		//console.log(resultseq[n]);
		//console.log(outputs[n]);
		if(ci(resultseq[n]).includes(ci(outputs[n]))){

			 noOfCorrect++;
		}
		//console.log(resultseq[n]);
		}
		//console.log(resultseq);
		console.log(noOfCorrect + " out of " + outputs.length + " correct"  );
		Q2OutputScore = noOfCorrect/outputs.length;
		q2child.kill('SIGINT');
doc.moveDown();

doc.font('Helvetica-Bold').fontSize(16).text("Application ran: " + Q2Title,50);
doc.moveDown();

	for(var o=0; o< resultseq.length; o++){
	doc.font('Helvetica-Bold').fontSize(16).text("Test Case: " + (o+1), 50);	
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Tested Input: " + inputs[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Captured Output: " + resultseq[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Expected Output: " + outputs[o], 50);
	doc.moveDown();
	if(ci(resultseq[o]).includes(ci(outputs[o]))){

		doc.font('Times-Roman').fontSize(14).text("Result: Correct. ", 50);
	
		
		doc.image(__dirname +'/../public/correct.png',{width: 30});
				doc.moveDown();

	}
	else

	{
		doc.font('Times-Roman').fontSize(14).text("Result: Wrong. ", 50);
		doc.image(__dirname +'/../public/wrong.png',{width: 30});
		doc.moveDown();

	}
	}
			

	doc.font('Times-Roman').fontSize(14).text(noOfCorrect +" out of " + outputs.length + " correct", 50);

	doc.moveDown();

	if(keywordsExist>0){
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
	for(var e=0; e< keywordslength; e++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywords[e], 50);

	}

	doc.moveDown();
	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
	for(var b=0; b< keywordthatmatch.length ; b++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywordthatmatch[b], 50);
	}
	}
	else{

	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: None ", 50);
	doc.moveDown();
	doc.moveDown();
	}

resultseq = [];
	
Q2OutputScore = ((Q2OutputWeight/100)*Q2OutputScore)*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q2 Output Score: " + Q2OutputScore, 50);
if(keywordsExist>0){

Q2CompileScore = (((keywordScore/maxKeywordScore)*(Q2CompileWeight/100)))*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q2 Compile Score: " + Q2CompileScore, 50);

}
else{
Q2CompileScore = Q2CompileWeight;
doc.font('Helvetica-Bold').fontSize(14).text("Q2 Compile Score: " + Q2CompileScore, 50);

}
Q2Score = Q2CompileScore + Q2OutputScore;
doc.font('Helvetica-Bold').fontSize(14).text("Q2 Total Score: " + Q2Score, 50);


	   });
	   

}



resultseq = [];
noOfCorrect =0;
if(Q3code){
var q3child = spawn('java',['-classpath','Quiz/Student','Q3']);

	
//var resultseq = [];
	var resultseq = [];
	q3child.stdout.on('data', function (data){ 

					//console.log(data.toString());		//console.log(data.toString());

		if(data.toString().includes("Output: ")){
		console.log(data.toString());
		resultseq.push(data.toString());

		q3child.stdout.clear();

					}
		

	});

	   db.query('SELECT QConfigFile FROM QuizQuestions WHERE Qtitle= ?',[Q3Title], function (error, results, fields){
   		var Q3configFile = results[0].QConfigFile;
   		var keywordsExist = 1;
   		content = fs.readFileSync('Quiz\\configs\\'+Q3configFile, 'utf8');
   		var configs = content.split(",");
   		//console.log(content);

   	configs[1] = configs[1].replace("Inputs:", "");
   	configs[1] = configs[1].replace("\n","");
   	configs[1] = configs[1].replace("\r","");
   	configs[1] = configs[1].replace(/[^\x20-\x7E]+/g, "");

   	configs[2] = configs[2].replace("Outputs:", "");
   	configs[2] = configs[2].replace("\n","");
   	configs[2] = configs[2].replace("\r","");
   	configs[2] = configs[2].replace(/[^\x20-\x7E]+/g, "");

   	configs[3] = configs[3].replace("Keywords:", "");
    configs[3] = configs[3].replace("\n","");
   	configs[3] = configs[3].replace("\r","");
   	configs[3] = configs[3].replace(/[^\x20-\x7E]+/g, "");

    configs[4] = configs[4].replace("Score:", "");
   	configs[4] = configs[4].replace("\n","");
   	configs[4] = configs[4].replace("\r","");
   	configs[4] = configs[4].replace(/[^\x20-\x7E]+/g, "");

   	var inputs = configs[1].split("#");
   	var outputs = configs[2].split("#");
   	var score = configs[4].split("#");

   	if(configs[3]){
   	var keywords = configs[3].split("#");

   	}
   	else{
   		keywordsExist = 0;
   		Q3SyntaxScore =0;
   		//console.log("No Keywords Exist");
   	}

   	var keywordthatmatch =[];
   	var keywordScore =0 ;
	var keywordmatch=0;
	var maxKeywordScore = 0;
	if(keywordsExist>0){
 	for(var e=0;e<keywords.length;e++)
 	{
 		maxKeywordScore += score[e];
 		console.log("Keyword checked:" + keywords[e]);

 		if(Q3code.includes(keywords[e])){

 			keywordmatch++;
			keywordthatmatch.push(keywords[e]);
			keywordScore += score[e];
 		console.log("Keyword found:" + keywords[e]);

 		}
 		else{
 				console.log("Keyword not found");
 		}

 	}
 	}

   		for(var j=0;j<inputs.length;j++){
					
		sleep(1000); 
		console.log(inputs[j]);
		q3child.stdin.write(inputs[j]+"\n");
		sleep(1000); 
			
				}

		var noOfCorrect =0;

		for(var n=0;n<outputs.length;n++){

		resultseq[n] = resultseq[n].replace("Output: ","");
		resultseq[n] = resultseq[n].replace("\n","");
		resultseq[n] = resultseq[n].replace("\r","");	
		resultseq[n] = resultseq[n].replace(/[^\x20-\x7E]+/g, "");
		//console.log(resultseq[n]);
		//console.log(outputs[n]);
		if(ci(resultseq[n]).includes(ci(outputs[n]))){

			 noOfCorrect++;
		}
		//console.log(resultseq[n]);
		}
		//console.log(resultseq);
		console.log(noOfCorrect + " out of " + outputs.length + " correct"  );
		Q3OutputScore = noOfCorrect/outputs.length;
		q3child.kill('SIGINT');
doc.moveDown();
//console.log(resultseq.length);
doc.font('Helvetica-Bold').fontSize(16).text("Application ran: " + Q3Title,50);
doc.moveDown();

	for(var o=0; o< resultseq.length; o++){
	doc.font('Helvetica-Bold').fontSize(16).text("Test Case: " + (o+1), 50);	
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Tested Input: " + inputs[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Captured Output: " + resultseq[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Expected Output: " + outputs[o], 50);
	doc.moveDown();
	if(ci(resultseq[o]).includes(ci(outputs[o]))){

		doc.font('Times-Roman').fontSize(14).text("Result: Correct. ", 50);
	
		
		doc.image(__dirname +'/../public/correct.png',{width: 30});
				doc.moveDown();

	}
	else

	{
		doc.font('Times-Roman').fontSize(14).text("Result: Wrong. ", 50);
		doc.image(__dirname +'/../public/wrong.png',{width: 30});
		doc.moveDown();

	}
	}
			

	doc.font('Times-Roman').fontSize(14).text(noOfCorrect +" out of " + outputs.length + " correct", 50);

	doc.moveDown();

	if(keywordsExist>0){
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
	for(var e=0; e< keywords.length; e++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywords[e], 50);

	}

	doc.moveDown();
	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
	for(var b=0; b< keywordthatmatch.length ; b++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywordthatmatch[b], 50);
	}
	}
	else{

	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: None ", 50);
	doc.moveDown();
	doc.moveDown();
	}


	//doc.end();
	resultseq = [];
Q3OutputScore = ((Q3OutputWeight/100)*Q3OutputScore)*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q3 Output Score: " + Q3OutputScore, 50);
if(keywordsExist>0){

Q3CompileScore = (((keywordScore/maxKeywordScore)*(Q3CompileWeight/100)))*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q3 Compile Score: " + Q3CompileScore, 50);
}

else{
Q3CompileScore = Q3CompileWeight;
doc.font('Helvetica-Bold').fontSize(14).text("Q3 Compile Score: " + Q3CompileScore, 50);

}
Q3Score = Q3CompileScore + Q3OutputScore;
doc.font('Helvetica-Bold').fontSize(14).text("Q3 Total Score: " + Q3Score, 50);


	   });
	   

}

resultseq = [];
noOfCorrect =0;
if(Q4code){
var q4child = spawn('java',['-classpath','Quiz/Student','Q4']);

	
//var resultseq = [];
	var resultseq = [];
	q4child.stdout.on('data', function (data){ 

					//console.log(data.toString());		//console.log(data.toString());

		if(data.toString().includes("Output: ")){
		console.log(data.toString());
		resultseq.push(data.toString());

		q4child.stdout.clear();

					}
		

	});

	   db.query('SELECT QConfigFile FROM QuizQuestions WHERE Qtitle= ?',[Q4Title], function (error, results, fields){
   		var Q4configFile = results[0].QConfigFile;
   		var keywordsExist = 1;
   		content = fs.readFileSync('Quiz\\configs\\'+Q4configFile, 'utf8');
   		var configs = content.split(",");
   		//console.log(content);

   	configs[1] = configs[1].replace("Inputs:", "");
   	configs[1] = configs[1].replace("\n","");
   	configs[1] = configs[1].replace("\r","");
   	configs[1] = configs[1].replace(/[^\x20-\x7E]+/g, "");

   	configs[2] = configs[2].replace("Outputs:", "");
   	configs[2] = configs[2].replace("\n","");
   	configs[2] = configs[2].replace("\r","");
   	configs[2] = configs[2].replace(/[^\x20-\x7E]+/g, "");

   	configs[3] = configs[3].replace("Keywords:", "");
    configs[3] = configs[3].replace("\n","");
   	configs[3] = configs[3].replace("\r","");
   	configs[3] = configs[3].replace(/[^\x20-\x7E]+/g, "");

    configs[4] = configs[4].replace("Score:", "");
   	configs[4] = configs[4].replace("\n","");
   	configs[4] = configs[4].replace("\r","");
   	configs[4] = configs[4].replace(/[^\x20-\x7E]+/g, "");

   	var inputs = configs[1].split("#");
   	var outputs = configs[2].split("#");
   	var score = configs[4].split("#");

   	if(configs[3]){
   	var keywords = configs[3].split("#");

   	}
   	else{
   		keywordsExist = 0;
   		Q3SyntaxScore =0;
   		//console.log("No Keywords Exist");
   	}

   	var keywordthatmatch =[];
   	var keywordScore =0 ;
	var keywordmatch=0;
	var maxKeywordScore=0;
	if(keywordsExist>0){
 	for(var e=0;e<keywords.length;e++)
 	{


		maxKeywordScore += score[e];
 		console.log("Keyword checked:" + keywords[e]);

 		if(Q4code.includes(keywords[e])){

 			keywordmatch++;
			keywordthatmatch.push(keywords[e]);
			keywordScore += score[e];
 		console.log("Keyword found:" + keywords[e]);

 		}
 		else{
 				console.log("Keyword not found");
 		}

 	}
 	}

   		for(var j=0;j<inputs.length;j++){
					
		sleep(1000); 
		console.log(inputs[j]);
		q4child.stdin.write(inputs[j]+"\n");
		sleep(1000); 
			
				}

		var noOfCorrect =0;

		for(var n=0;n<outputs.length;n++){

		resultseq[n] = resultseq[n].replace("Output: ","");
		resultseq[n] = resultseq[n].replace("\n","");
		resultseq[n] = resultseq[n].replace("\r","");	
		resultseq[n] = resultseq[n].replace(/[^\x20-\x7E]+/g, "");
		//console.log(resultseq[n]);
		//console.log(outputs[n]);
		if(ci(resultseq[n]).includes(ci(outputs[n]))){

			 noOfCorrect++;
		}
		//console.log(resultseq[n]);
		}
		//console.log(resultseq);
		console.log(noOfCorrect + " out of " + outputs.length + " correct"  );
		Q4OutputScore = noOfCorrect/outputs.length;
		q4child.kill("SIGINT");
doc.moveDown();
//console.log(resultseq.length);
doc.font('Helvetica-Bold').fontSize(16).text("Application ran: " + Q4Title,50);
doc.moveDown();

	for(var o=0; o< resultseq.length; o++){
	doc.font('Helvetica-Bold').fontSize(16).text("Test Case: " + (o+1), 50);	
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Tested Input: " + inputs[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Captured Output: " + resultseq[o], 50);
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text("Expected Output: " + outputs[o], 50);
	doc.moveDown();
	//console.log(resultseq[o]);
	//console.log(outputs[o]);
	if(ci(resultseq[o]).includes(ci(outputs[o]))){

		doc.font('Times-Roman').fontSize(14).text("Result: Correct. ", 50);
	
		
		doc.image(__dirname +'/../public/correct.png',{width: 30});
				doc.moveDown();

	}
	else

	{
		doc.font('Times-Roman').fontSize(14).text("Result: Wrong. ", 50);
		doc.image(__dirname +'/../public/wrong.png',{width: 30});
		doc.moveDown();

	}
	}
			

	doc.font('Times-Roman').fontSize(14).text(noOfCorrect +" out of " + outputs.length + " correct", 50);

	doc.moveDown();

	if(keywordsExist>0){
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
	for(var e=0; e< keywords.length; e++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywords[e], 50);

	}

	doc.moveDown();
	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
	for(var b=0; b< keywordthatmatch.length ; b++){
	doc.moveDown();
	doc.font('Times-Roman').fontSize(14).text(keywordthatmatch[b], 50);
	}
	}
	else{

	doc.moveDown();
	doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: None ", 50);
	doc.moveDown();
	doc.moveDown();
	}


	//doc.end();
	resultseq = [];
	

Q4OutputScore = ((Q4OutputWeight/100)*Q4OutputScore)*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q4 Output Score: " + Q4OutputScore, 50);
if(keywordsExist>0){

Q4CompileScore = (((keywordScore/maxKeywordScore)*(Q4CompileWeight/100)))*100;
doc.font('Helvetica-Bold').fontSize(14).text("Q4 Compile Score: " + Q4CompileScore, 50);
}
else{
Q4CompileScore = Q4CompileWeight;
doc.font('Helvetica-Bold').fontSize(14).text("Q4 Compile Score: " + Q4CompileScore, 50);

}
Q4Score = Q4CompileScore + Q4OutputScore;
doc.font('Helvetica-Bold').fontSize(14).text("Q4 Total Score: " + Q4Score, 50);

doc.moveDown();
doc.font('Helvetica-Bold').fontSize(18).text("Total Score for Session: " + ((Q1Score*1/4) + (Q2Score*1/4) + (Q3Score*1/4)+ (Q4Score*1/4)), 50);
doc.moveDown();

doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("-------------------------------------------End of Report-------------------------------------------", 50);
doc.moveDown();

doc.moveDown();
doc.end();

db.query('INSERT INTO quizsubmissionrecords (Rid, username, submissionDateTime, sessionTitle,uid,pdfFile,score) VALUES (DEFAULT,?,?,?,?,?,?)',[req.body.data.username,dateTime.create().format('Y-m-d H:M:S').toString(),req.body.data.session,uid,studentName +"(" + uid + ")" +'.pdf',((Q1Score*1/4) + (Q2Score*1/4) + (Q3Score*1/4)+ (Q4Score*1/4))], function (error, results, fields){

			if(error){
	
				//return res.status(500).send("Error!");
 				//return errCount=1; 
				console.log("Insert unsuccessful!");
				//console.log(uid);
				console.log(error);
			    //res.json({ state : 0});
				//console.log(errCount);

			}
			else {
				res.json({ state : 1});
				console.log("Insert successful!");


			}
			

});

sleep(1000);
cmd.run('copy Quiz\\QuizReports\\'+ studentName +"(" + uid + ")" +'.pdf' + " " + "app\\Quiz\\QuizReports");
sleep(1000);


	   });
	   

}
//res.json({ state : 1});
}


catch(err){

	console.log(err);
}


}

exports.processLab = function(req,res,filesCompiled,compileScore,javafiles,erx,uid){


filename =req.file.filename.replace(".zip","");
var configFile = "";

var PDFDocument = require('pdfkit');
var studentName = req.body.username;
var scoreTitle ="";
var inputs = [];
var outputSplit = [];
var noOfCorrect =0;
var keywordscheck =[];
var checkpass = [];
var resultseq = [];
var maxKeywordScore=0;
var totalScore=0;
var QcScore= 0;
var doc;
  db.query('SELECT QConfigFile FROM labQuestions WHERE Qtitle= ?',[req.body.title], function (error, results, fields){
  	configFile = results[0].QConfigFile;


  	});

  sleep(1000);
 
var content =  fs.readFileSync('Labs\\configs\\'+configFile, 'utf8');
//var scontent = fs.readFileSync('sconfig.txt', 'utf8');
//console.log(configFile);
fs.close;
//console.log(content);
	var configs = content.split(",");
	configs[1] = configs[1].replace("Inputs:", "");
   	configs[1] = configs[1].replace("\n","");
   	configs[1] = configs[1].replace("\r","");
   	configs[1] = configs[1].replace(/[^\x20-\x7E]+/g, "");

   	configs[2] = configs[2].replace("Outputs:", "");
   	configs[2] = configs[2].replace("\n","");
   	configs[2] = configs[2].replace("\r","");
   	configs[2] = configs[2].replace(/[^\x20-\x7E]+/g, "");

   	configs[3] = configs[3].replace("Keywords:", "");
   	 if(configs[3]){
    configs[3] = configs[3].replace("\n","");
   	configs[3] = configs[3].replace("\r","");
   	configs[3] = configs[3].replace(/[^\x20-\x7E]+/g, "");
		}
    configs[4] = configs[4].replace("Score:", "");
    if(configs[4]){
   	configs[4] = configs[4].replace("\n","");
   	configs[4] = configs[4].replace("\r","");
   	configs[4] = configs[4].replace(/[^\x20-\x7E]+/g, "");
	}
	console.log(configs[5]);
   	configs[5] = configs[5].replace("Main:", "");
   	 if(configs[5]){
   	configs[5] = configs[5].replace("\n","");
   	configs[5] = configs[5].replace("\r","");
   	configs[5] = configs[5].replace(/[^\x20-\x7E]+/g, "");
   }
//var inputs= configs[1];
var score =[];
if(configs[4]){
score= configs[4].split("#");
}

var QOutputWeight=0;
var QSyntaxWeight=0;
var QCompileWeight=0;
var keywordScore =0;
var keywords;

db.query('SELECT QOutputWeight,QSyntaxWeight,QCompileWeight FROM labquestions WHERE Qtitle= ?',[req.body.title], function (error, results, fields){

if(error){
	console.log(error);

}
else{

 	QOutputWeight=results[0].QOutputWeight;
	QSyntaxWeight=results[0].QSyntaxWeight;
	QCompileWeight=results[0].QCompileWeight;


}
});
sleep(1000);
	

if(compileScore >0 ){

console.log("runs here");
try{

var child ="";
if(configs[5]) {
	//console.log("here");
child = spawn('java',['-classpath','Labs/'+studentName+'/'+filename,configs[5] ]);
}

else{
filename = filename.replace(".java","");	
child = spawn('java',['-classpath','Labs/'+studentName,filename]);
}

var errorOccur = [];

var inputs = configs[1].split("#");
var outputSplit = configs[2].split('#');

		child.stdout.on('data', function (data){ 			
		console.log(data.toString());

		if(data.toString().includes("Output:")){

		//console.log(data.toString());
		resultseq.push(data.toString().replace("Output: ",""));
		
	
		child.stdout.clear();		

		}	

		});

for(var i = 0; i < inputs.length;i++){

sleep(1000); 
console.log(inputs[i]);
child.stdin.write(inputs[i]+"\n");
sleep(1000); 
}
child.kill;



try{
	

			for(var n=0;n<inputs.length;n++){

					outputSplit[n] = outputSplit[n].replace("\n","");
					outputSplit[n] = outputSplit[n].replace("\r","");
					outputSplit[n] = outputSplit[n].replace(/[^\x20-\x7E]+/g, "");			
					resultseq[n] = resultseq[n].replace("\n","");
					resultseq[n] = resultseq[n].replace("\r","");
					resultseq[n] = resultseq[n].replace(/[^\x20-\x7E]+/g, "");
					if(ci(resultseq[n]).includes(ci(outputSplit[n]))){
								
					 noOfCorrect++;
					}
					else{
						errorOccur.push(n+1);
					
						//console.log(resultseq[n].length);
					}

				}


			
			console.log(noOfCorrect +" out of " + inputs.length + " correct");
				outputScore = noOfCorrect/inputs.length;

		
		
				if(errorOccur.length==0){
					console.log("No Errors");
				}
				else{
					console.log(errorOccur);
				}


}
catch(err){

	console.log(err);
}



child.kill('SIGINT');
	

var k=0;
var scontent;



if(configs[3]){





	keywords = configs[3].split("#");
	for(var l=0; l<keywords.length;l++){
		//console.log(score[l]);
		maxKeywordScore += parseInt(score[l]);
	}
if(javafiles.length>1){

for(k=0;k<javafiles.length;k++){
	for(var h=0;h<keywords.length;h++){

	scontent = fs.readFileSync("Labs/"+req.body.username+"/"+filename+ "/" + javafiles[k], 'utf8');
		if(scontent.includes(keywords[h])){
		
			keywordScore += parseInt(score[h]);
			//syntaxmatch++;

			checkpass.push(keywords[h]);
		}
	}

}
}
else{



	for(k=0;k<javafiles.length;k++){
	for(var h=0;h<keywords.length;h++){

	scontent = fs.readFileSync("Labs/"+req.body.username+"/" + javafiles[k], 'utf8');
		if(scontent.includes(keywords[h])){
		
			keywordScore += parseInt(score[h]);
			//syntaxmatch++;

			checkpass.push(keywords[h]);
		}
	}

}
}


}



doc = new PDFDocument();

doc.pipe(fs.createWriteStream(__dirname +'/../../Labs/LabReports/'+ req.body.username + '-' + req.body.title +"(" + uid +")"+'.pdf'));	
doc.image(__dirname +'/../public/ntu.png', 150, 50, {width: 300});
doc.font('Times-Roman').fontSize(18).text('Title: ' + req.body.title, 50, 200);
doc.font('Times-Roman').fontSize(18).text('Date Submitted: ' + dateTime.create().format('Y-m-d H:M:S'), 50, 225);
doc.font('Times-Roman').fontSize(18).text('Name of Student: ' + req.body.username, 50, 250);
doc.font('Helvetica-Bold').fontSize(32).text('Summary', 240, 300);


totalScore =0;

doc.font('Times-Roman').fontSize(14).text('Files Compiled: ', 50, 375);
doc.font('Times-Roman').fontSize(14).text(javafiles, 50, 400);
	outputScore = outputScore*QOutputWeight;
if(!configs[3]){

	totalScore = QCompileWeight + outputScore;
doc.font('Helvetica-Bold').fontSize(18).text("Total Score: " +(totalScore), 50, 425);
doc.font('Times-Roman').fontSize(14).text("Compile Score: " + QCompileWeight +"/" +  QCompileWeight , 50, 450);
doc.font('Times-Roman').fontSize(14).text("Output Score: " + outputScore +"/" +  QOutputWeight , 50, 475);

}

else{

	QcScore = (100-QSyntaxWeight)*QCompileWeight/100;
var QCompileScore = Math.floor((((keywordScore/maxKeywordScore)*QSyntaxWeight/100)*QCompileWeight) + parseInt(QcScore));



totalScore = QCompileScore + outputScore;
doc.font('Helvetica-Bold').fontSize(18).text("Total Score: " +(totalScore), 50, 425);
doc.font('Times-Roman').fontSize(14).text("Compile Score: " + QCompileScore +"/" +  QCompileWeight , 50, 450);
doc.font('Times-Roman').fontSize(14).text("Output Score: " + outputScore +"/" +  QOutputWeight , 50, 475);
}
doc.moveDown();
doc.moveDown();

//console.log(javafiles);

doc.font('Times-Roman').fontSize(14).text("Application ran: ");

for(var l=0;l<javafiles.length;l++){
doc.font('Times-Roman').fontSize(14).text(javafiles[l]);
}

doc.moveDown();

for(var o=0; o< resultseq.length; o++){
doc.font('Times-Roman').fontSize(14).text("Tested Input: " + inputs[o], 50);
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("Captured Output: " + resultseq[o], 50);
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("Expected Output: " + outputSplit[o], 50);
doc.moveDown();
	if(ci(resultseq[o]).includes(ci(outputSplit[o]))){

		doc.font('Times-Roman').fontSize(14).text("Result: Correct. ", 50);
	
		
		doc.image(__dirname +'/../public/correct.png',{width: 30});
		doc.moveDown();

	}
	else

	{
		doc.font('Times-Roman').fontSize(14).text("Result: Wrong. ", 50);
		doc.image(__dirname +'/../public/wrong.png',{width: 30});
		doc.moveDown();

	}
}


doc.font('Times-Roman').fontSize(14).text(noOfCorrect +" out of " + inputs.length + " correct", 50);
doc.moveDown();
doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
if(!keywords){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("None", 50);
}
else{
for(var e=0; e< keywords.length; e++){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text(keywords[e], 50);

	}
}
doc.moveDown();
doc.moveDown();
doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
for(var c=0; c< checkpass.length; c++){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text(checkpass[c], 50);

	}


doc.moveDown();
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("-------------------------------------------End of Report-------------------------------------------", 50);

doc.moveDown();
doc.moveDown();


doc.end();


cmd.run('move Labs\\LabReports\\' +req.body.username + '-' + req.body.title+"(" + uid +")" +'.pdf' + " " + "app\\Labs\\LabsReport");
//cmd.run('xcopy Labs\\' +req.body.username + " " + "labs\\backups\\"+Date.now() + Math.random() + " /e /i /h");
sleep(3000);
cmd.run('rmdir /S /Q Labs\\' + req.body.username);


db.query('UPDATE labsubmissionrecords SET score = ?,pdfFile=? WHERE uid = ?',[totalScore,req.body.username + '-' + req.body.title +"(" + uid +")"+'.pdf',uid], function (error, results, fields){


if(error){

	console.log(error);
}

else{
res.json({ state : 1});
console.log("success");


}


});




}
catch(error){
	console.log(error);
}



}



if(compileScore==0){


var j=0;
var d=0;
var vcontent;



if(configs[3]){

if(configs[5]){

for(d=0;d<javafiles.length;d++){
	
	 	vcontent = fs.readFileSync("Labs/"+req.body.username+"/"+filename+ "/" + javafiles[d], 'utf8');
		fs.close;
	}
	}
else{
		 vcontent = fs.readFileSync("Labs/"+req.body.username+"/"+javafiles[0], 'utf8');
		 fs.close;
}


	keywords = configs[3].split("#");
	for(var g=0; g<keywords.length;g++){
		//console.log(score[l]);
		maxKeywordScore += parseInt(score[g]);
	}

for(j=0;j<javafiles.length;j++){

	for(var w=0;w<keywords.length;w++){

		if(vcontent.includes(keywords[w])){
			keywordScore += parseInt(score[w]);
			//syntaxmatch++;
			checkpass.push(keywords[w]);
		}
	}

}

}


//var doc = new jsPDF();
//c.text('Hello world!', 10, 10);
//doc.save(__dirname +'/../../Labs/LabReports/'+ req.body.username + '-' + req.body.title +"(" + uid +")"+'.pdf');

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream(__dirname +'/../../Labs/LabReports/'+ req.body.username + '-' + req.body.title +"(" + uid +")"+'.pdf'));	

doc.image(__dirname +'/../public/ntu.png', 150, 50, {width: 300});
doc.font('Times-Roman').fontSize(18).text('Title: ' + req.body.title, 50, 200);
doc.font('Times-Roman').fontSize(18).text('Date Submitted: ' + dateTime.create().format('Y-m-d H:M:S'), 50, 225);
doc.font('Times-Roman').fontSize(18).text('Name of Student: ' + req.body.username, 50, 250);
doc.font('Helvetica-Bold').fontSize(32).text('Summary', 240, 300);

totalScore =0;
doc.end;

doc.font('Times-Roman').fontSize(14).text('Files Compiled: ', 50, 375);
doc.font('Times-Roman').fontSize(14).text(javafiles, 50, 400);
outputScore = 0;
if(!configs[3]){

	totalScore = outputScore;
doc.font('Helvetica-Bold').fontSize(18).text("Total Score: " +(totalScore), 50, 425);
doc.font('Times-Roman').fontSize(14).text("Compile Score: " +  "0/" +  QCompileWeight , 50, 450);
doc.font('Times-Roman').fontSize(14).text("Output Score: "  +"0/" +  QOutputWeight , 50, 475);

}
else{

	
var QCompileScr = Math.floor((((keywordScore/maxKeywordScore)*QSyntaxWeight/100)*QCompileWeight));



totalScore = QCompileScr + outputScore;
doc.font('Helvetica-Bold').fontSize(18).text("Total Score: " +(totalScore), 50, 425);
doc.font('Times-Roman').fontSize(14).text("Compile Score: " + QCompileScr +"/" +  QCompileWeight , 50, 450);
doc.font('Times-Roman').fontSize(14).text("Output Score: " + outputScore +"/" +  QOutputWeight , 50, 475);

}



doc.moveDown();
doc.font('Helvetica-Bold').fontSize(16).text("Keywords Checked: ", 50);
if(!keywords){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text("None", 50);
}
else{
for(var f=0; f< keywords.length; f++){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text(keywords[f], 50);

	}

doc.moveDown();
doc.moveDown();
doc.font('Helvetica-Bold').fontSize(16).text("Keywords Found: ", 50);
for(var s=0; s< checkpass.length; s++){
doc.moveDown();
doc.font('Times-Roman').fontSize(14).text(checkpass[s], 50);

	}
}

doc.moveDown();
doc.moveDown();


if(erx!=null){

var errorx = erx.toString().replace(/[^\x20-\x7E]+/g,"");
errorx  = errorx.replace(/expected/g, "expected\n\n");
errorx  = errorx.replace(/expression/g, "expected\n\n");
errorx  = errorx.replace(/statement/g, "expected\n\n");
errorx  = errorx.replace(/\^/g, "\n");


 //errorx = erx.toString().replace("expected", "expected\r\n");
doc.font('Helvetica-Bold').fontSize(16).text("Error(s): ", 50);
doc.font('Times-Roman').fontSize(14).text(errorx.toString() , 50);
doc.moveDown();
doc.moveDown();
}
doc.font('Times-Roman').fontSize(14).text("-------------------------------------------End of Report-------------------------------------------", 50);

doc.moveDown();
doc.moveDown();
doc.end();

sleep(2000);
cmd.run('copy Labs\\LabReports\\' +req.body.username + '-' + req.body.title+"(" + uid +")" +'.pdf' + " " + "app\\Labs\\LabsReport");
sleep(2000);
cmd.run('rmdir /S /Q Labs\\' + req.body.username);


db.query('UPDATE labsubmissionrecords SET score = ?,pdfFile=? WHERE uid = ?',[totalScore,req.body.username + '-' + req.body.title +"(" + uid +")"+'.pdf',uid], function (error, results, fields){


if(error){

	console.log(error);
	res.json({state:0});
}

else
{
res.json({ state : 1});
console.log("success");
}


});



}

};