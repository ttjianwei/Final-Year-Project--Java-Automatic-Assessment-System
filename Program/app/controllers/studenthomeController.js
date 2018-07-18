app.controller("studenthomeController", function($scope,$http,Upload,$timeout) {

$scope.username = localStorage.getItem('username');
$scope.sessionTitle = localStorage.getItem('sessionTitle');
$scope.sessionTLimit = localStorage.getItem('sessionTLimit');
$scope.sessionSid = localStorage.getItem('sessionSid');
$scope.email = localStorage.getItem('email');
$scope.sessionDescription = localStorage.getItem('sessionDescription');
//$scope.sessionSid = res.data.sessionInfo.Sid;

if(getAllUrlParams(window.location.href).session=="false"){
$scope.sessionErr = "Session does not exist!";

}

$scope.getLabs = function(){


   $http.post('/getLabs').then(function(res){
   
          $scope.labs = res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}





   $scope.logout = function() {

		//clear angularJS scope variables
   		delete $scope.username;

   		//clear 
   	    localStorage.clear();

		$http.post('/logout').then(function(res){
			console.log('action on success');
			myRedirect("/", "", "");

		}).catch(function(error){
          console.log(error);
      
         //myRedirect("/", "login", "fail");
       });

			
   	};


      $scope.selfRedirect = function() {

         var form = $('<form action="/StudentHome" method="post">' + '<input type="hidden" name="" value=""></input>' + '</form>');
         $('body').append(form);
         $(form).submit();
      };




$scope.attemptAssessmentQuestion = function(){
  var form = $('<form action="/attemptAssessmentQuestion" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();


};


$scope.attemptLabs = function(){
  var form = $('<form action="/attemptLabs" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();


};


$scope.studentHome = function(){
  var form = $('<form action="/StudentHome" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();


};

 $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.filename = $scope.f.name;
      $scope.errFile = errFiles && errFiles[0];


  

 }

  $scope.getLabQuestionsDropdown = function(){

  $http.post('/getLabQuestionsDropdown').then(function(res){
   
          $scope.labQuestions = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });
 }



 $scope.submitLab = function(file, errFiles) {


  file = $scope.f;


  if (file) {
        

         file.upload = Upload.upload({
                url: '/StudentSubmitLab',
                method: 'POST',
                file : $scope.f,
                data: {file: file, 'username': $scope.username, 'email': $scope.email, 'title' : $scope.submissionTitle}
            });


file.upload.then(function (response) {

 if(response.data.state==0){

 $scope.failureMessagebool = true;

              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);


$scope.failureMessage = "Submit Unsuccessful!";
$scope.studentEmail ="";
$scope.f = null;
$scope.filename ="";
$scope.submissionTitle ="";

 }
 else  
  if(response.data.state==1){

$scope.successMessage = "Submit Successful!";
 $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                  
                 }, 3000);

$scope.studentEmail ="";
$scope.submissionTitle ="";
$scope.filename ="";
$scope.f = null;
 }

});


    }



 }


$scope.getLabSubmissionRecords = function(){


   $http.post('/getLabSubmissionRecords',{ data : { username: $scope.username} }).then(function(res){
   
          $scope.labsubmissionrecords = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}


$scope.getQuizSubmissionRecords = function(){


   $http.post('/getQuizSubmissionRecords',{ data : { username: $scope.username} }).then(function(res){
   
          $scope.quizsubmissionrecords = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}


$scope.viewAttempts= function(){

  var form = $('<form action="/ViewAttempts" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();


}

$scope.submitSession = function(){



     var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };



$http.post('/logInSession', { data:{ sessionID: $scope.sessionID,
            sessionPass: $scope.sessionPassword, email : $scope.email} }).then(function(res){
                

        if(res.data.state ==0){
                     console.log('Error!');
                   
                    myRedirect("/EnterSession", "session", "false");


                }


       else if(res.data.state==1){


        console.log('action on success');
          //alert(res.data.sessionInfo.Sid);

          $scope.sessionTitle = res.data.sessionInfo.Stitle;
          $scope.sessionTLimit = res.data.sessionInfo.TLimit;
          $scope.sessionSid = res.data.sessionInfo.Sid;
          $scope.sessionDescription = res.data.sessionInfo.Sdescription;
          localStorage.setItem('sessionTitle', res.data.sessionInfo.Stitle);
          localStorage.setItem('sessionSid', res.data.sessionInfo.Sid);
          localStorage.setItem('sessionTLimit', res.data.sessionInfo.TLimit);
          localStorage.setItem('sessionDescription', res.data.sessionInfo.Sdescription);
          //localStorage.setItem('sessionTitle', res.data.sessionInfo.Stitle);

        myRedirect("/attemptPage", "", "" );




     }
         

     
     }).catch(function(error){
         
       });
           

    };

 


$scope.enterTest = function(){

 var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };


            $http.post('/enterTest', { data:{ sessionUser: $scope.username, sessionID: $scope.sessionSid} }).then(function(res){

               if(res.data.state ==0){

                     console.log('Error!');
                   

                    myRedirect("/", "", "");


                }


       else if(res.data.state==1){


        console.log('action on success');
        
    

        myRedirect("/questionPage", "", "" );




     }
         

     
     }).catch(function(error){
         
       });




         }


   $scope.getQ1= function(){

   $http.post('/getQ1',{data:{ sessionUser: $scope.username, sessionID: $scope.sessionSid, email : $scope.email }}).then(function(res){
   
         $scope.Q1Title = res.data.q1Title;
         $scope.Q1Description = res.data.q1Description;

      }).catch(function(error){
         
       });

}




         $scope.getQ2= function(){


   $http.post('/getQ2',{data:{ sessionUser: $scope.username, sessionID: $scope.sessionSid , email : $scope.email}}).then(function(res){


         $scope.Q2Title = res.data.q2Title;
         $scope.Q2Description = res.data.q2Description;

      }).catch(function(error){
         
      
   
       });

}



         $scope.getQ3= function(){


   $http.post('/getQ3',{data:{ sessionUser: $scope.username, sessionID: $scope.sessionSid , email : $scope.email}}).then(function(res){
   

         $scope.Q3Title = res.data.q3Title;
         $scope.Q3Description = res.data.q3Description;

      }).catch(function(error){
         
      
   
       });

}


        $scope.getQ4= function(){


   $http.post('/getQ4',{data:{ sessionUser: $scope.username, sessionID: $scope.sessionSid, email : $scope.email}}).then(function(res){
   

         $scope.Q4Title = res.data.q4Title;
         $scope.Q4Description = res.data.q4Description;

      }).catch(function(error){
         
      
   
       });

}


$scope.compilePlaneApp = function(){

 $scope.planeAppCode = planeAppEditor.getSession().getValue();

   $http.post('/compilePlaneApp',{data:{ planeAppCode: $scope.planeAppCode, studentName : $scope.username, questionTitle : "PlaneApp"}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.planeAppOutput = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.planeAppOutput = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });

}


$scope.compilePlane = function(){

 $scope.planeCode = planeEditor.getSession().getValue();

   $http.post('/compilePlane',{data:{ planeCode: $scope.planeCode, studentName : $scope.username, questionTitle : "PlaneApp"}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.planeOutput = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.planeOutput = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });

}



$scope.compilePlaneSeat = function(){

 $scope.planeSeatCode = planeSeatEditor.getSession().getValue();

   $http.post('/compilePlaneSeat',{data:{ planeSeatCode: $scope.planeSeatCode, studentName : $scope.username, questionTitle : "PlaneApp"}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.planeSeatOutput = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.planeSeatOutput = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });

}



$scope.submitPlane = function(){

$scope.planeAppCode = planeAppEditor.getSession().getValue();
$scope.planeCode = planeEditor.getSession().getValue();
$scope.planeSeatCode = planeSeatEditor.getSession().getValue();

 $http.post('/submitPlane',{data:{ planeSeatCode: $scope.planeSeatCode, planeAppCode : $scope.planeAppCode, planeCode: $scope.planeCode, studentName : $scope.username, questionTitle : "PlaneApp"}}).then(function(res){


if(res.data.state ==0){
 
      alert(res.data.error);

 }
  else if (res.data.state ==1){
   alert("Compile Success!");

  }


 });

}




$scope.compileQ1= function(){

 $scope.Q1code = editor.getSession().getValue();
 //alert($scope.Q1code);

   $http.post('/compileQ1',{data:{ Q1code: $scope.Q1code, studentName : $scope.username, questionTitle : $scope.Q1Title}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.Q1Output = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.Q1Output = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });
}



      $scope.compileQ2= function(){

 $scope.Q2code = editor2.getSession().getValue();
 //alert($scope.Q1code);

   $http.post('/compileQ2',{data:{ Q2code: $scope.Q2code, studentName : $scope.username, questionTitle : $scope.Q2Title}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.Q2Output = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.Q2Output = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });
}





      $scope.compileQ3= function(){

 $scope.Q3code = editor3.getSession().getValue();
 //alert($scope.Q1code);

   $http.post('/compileQ3',{data:{ Q3code: $scope.Q3code, studentName : $scope.username, questionTitle : $scope.Q3Title}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.Q3Output = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.Q3Output = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });
}


  $scope.compileQ4= function(){

 $scope.Q4code = editor4.getSession().getValue();
 //alert($scope.Q1code);

   $http.post('/compileQ4',{data:{ Q4code: $scope.Q4code, studentName : $scope.username, questionTitle : $scope.Q4Title}}).then(function(res){


 if(res.data.state ==0){
 
 $scope.Q4Output = res.data.error;

 }
 else if (res.data.state ==1){
 $scope.Q4Output = "Compile Success!";

 }

   }).catch(function(error){
         
      
   
       });
}



$scope.getAnnouncements = function(){

   $http.post('/getStudentAnnouncements',{data:{ email : $scope.email }}).then(function(res){
   
          $scope.announcements = res.data; 

      }).catch(function(error){
         
      
   
       });

}


      $scope.submitSolution = function(){
        
if (confirm("Are you sure you want to save and submit?\n(Session will end)")) {
   

 $scope.Q1code = editor.getSession().getValue();
 $scope.Q2code = editor2.getSession().getValue();
 $scope.Q3code = editor3.getSession().getValue();
 $scope.Q4code = editor4.getSession().getValue();

   $http.post('/submitSolution',{data:{ username : $scope.username, session: $scope.sessionTitle, Q1code: $scope.Q1code, q1Title : $scope.Q1Title, Q2code: $scope.Q2code, q2Title: $scope.Q2Title, Q3code: $scope.Q3code, q3Title: $scope.Q3Title, Q4code : $scope.Q4code, q4Title : $scope.Q4Title,studentName : $scope.username }}).then(function(res){

      if(res.data.state==1){

         var form = $('<form action="/StudentHome" method="post">' + '<input type="hidden" name="" value=""></input>' + '</form>');
         $('body').append(form);
         $(form).submit();

      }
      

   }).catch(function(error){
         
      
   
       });

   }
}





});





app.component('headComponent', {
    
        //template : '<h1>Test</h1>'
      controller: 'studenthomeController',
      template: '<div class="header"><div class="container"><div class="row"><div class="col-md-5"><!-- Logo --><div class="logo"><h1><a href ng-click="selfRedirect();">'+ localStorage.getItem('username')+'</a></h1></div></div><div class="col-md-5"><div class="row"><div class="col-lg-12"></div></div></div><div class="col-md-2"><div class="navbar navbar-inverse" role="banner"><nav class="collapse navbar-collapse bs-navbar-collapse navbar-right" role="navigation"><ul class="nav navbar-nav"><li class="dropdown"><a href="" class="dropdown-toggle" data-toggle="dropdown">My Account <b class="caret"></b></a><ul class="dropdown-menu animated fadeInUp"><li><a href="profile.html">Profile</a></li><li><a href ng-click="logout();">Logout</a></li></ul></li></ul></nav></div></div></div></div></div>'
    //controller: adminhomeController
    
    
});

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

