var db = require('../../config');//establish connection to database 
//var session = require('client-sessions');
var createSess = require('../../app/middleware/createUserSession');

exports.login = function(req,res){

  //get post data e.g username and password and store in local variable
  var username = req.body.data.username;//stores local username
  var password = req.body.data.password;//stores local password

//MySQL Query statement to check if user exist in database, uses prepared statement to prevent SQL injection
   db.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields){
   
   //return state 0 if error in query
   	if(error) {
    console.log('Code 400, Error ocurred');
    res.json({ state: 0});
              }	

    //if there is no error
    else{
    //if there is a result, e.g username found in database
		if(results.length>0){

    //if permission id == 1, meaning student
		if(results[0].password == password && results[0].pid == 1){
			console.log('Code 200, login sucessful,student');
        req.session.pid = results[0].pid;
        res.json({ state : 1, username : results[0].username , email : results[0].email });//return with a result of 1//e.g redirect to student's home page
		}

    else 
    //permission id = 2, meaning admin
      if(results[0].password == password && results[0].pid == 2){
      req.session.pid = results[0].pid;
      //req.session.username = results[0].username;
     // console.log('Code 200, login sucessful,admin');
        //req.session.user = result[0];
        res.json({ state : 2, username : results[0].username});//return with a result of 2//e.g redirect to admin's home page

    }
    else {
      //username exist but passwrong wrong
         console.log('Code 400, Password or username invalid');
          res.json({ state : 0});
        }
      }

      //if username does not exist in database, return with state 0
      else  
    {
   console.log('Code 400, Password or username invalid');
   res.json({ state : 0});
    }
    }
		
      });

    }


exports.logInSession = function(req,res){

var sessionID = req.body.data.sessionID;
var sessionPass = req.body.data.sessionPass;


db.query('SELECT * FROM SESSIONS WHERE Sid = ? AND Spass = ? ',[sessionID,sessionPass], function (error, results, fields){
   

    if(error) {
    console.log('Code 400, Error ocurred');
    res.json({ state: 0});
              } 

   else{

       if(results.length>0){

                    req.session.ssid = 1;
                    req.session.stitle = results[0].Stitle;
                    req.session.sTLimit = results[0].TLimit;
                
                  


       
        createSess.createNewSession(req,res);



                    res.json({ state: 1, sessionInfo : results[0]});//Successful
                  }

        else {
  

      //username exist but password wrong
         req.session.ssid = 0;
         console.log('Code 400, Session does not exist');
         res.json({ state : 0});
        }
              }

   

   });

}