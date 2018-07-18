var db = require('../../config');//establish connection to database 



exports.createNewSession = function(req,res){


db.query('SELECT Qid FROM QuizQuestions', function (error, results, fields){

var studentName = req.body.data.sessionUser;
var sid = req.body.data.sessionID;
console.log(studentName);
console.log(req.body.data.email);
console.log(sid);


var error =0;
var dupe =[];
var arr = [];
var i =0;
var flag = 0;
var proceed =0;
var duplicate =0;


while(i < 4){


    while(flag==0){

    	  var randomnumber = Math.floor(Math.random()*results.length);
         //console.log(randomnumber);
    		for(var u=0; u < dupe.length; u++){

    			if(randomnumber == dupe[u]){
    				duplicate++;
    			}

    		}

    		if(duplicate > 0){
    			flag = 0;
    			duplicate =0;
    		}

    		else{

    			flag = 1;
    			duplicate = 0;
    			arr[i] = results[randomnumber];
          dupe[i] = randomnumber;
    		}
    			
    		}

  	 i++;
  	 flag =0;

 
}




for(var x=0; x < arr.length; x++){

console.log(arr[x].Qid);
}




db.query('SELECT * FROM user_session WHERE Sid = ? AND studentName = ? ',[sid,req.body.data.email], function (error, results, fields){


 if(error) {



 }
   else{

       if(results.length>0){
       	req.session.studentName = req.body.data.email;
       	req.session.questionSession = sid;




       }

       else{

db.query('INSERT INTO user_session VALUES (?,?,?,?,?,?)',[req.body.data.email,arr[0].Qid,arr[1].Qid,arr[2].Qid,arr[3].Qid,sid], function (error, results, fields){

if(error){
	console.log(error);
    error = 1;


}

else{

console.log(results);
    	req.session.studentName = studentName;
       	req.session.questionSession = sid;
   		

}


	});





       }
}
   });



/*

 if(error==0){
 	
res.json({ state : 1, sessionName : sid });
}
else
{
	res.json({ state : 0});
}*/

});
}