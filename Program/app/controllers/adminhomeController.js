app.controller("adminhomeController", function($scope,$http,Upload,$timeout) {

$scope.username = localStorage.getItem('username');
$scope.proceed =0;


$scope.getSessions = function(){


   $http.post('/getSessions').then(function(res){
   
          $scope.sessions = res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}



$scope.getStudents = function(){


   $http.post('/getStudents').then(function(res){
   
          $scope.users = res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}

$scope.getLabQuestions = function(){


   $http.post('/getLabQuestions').then(function(res){
   
          $scope.questions= res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}

$scope.getQuizQuestions = function(){


   $http.post('/getQuizQuestions').then(function(res){
   
          $scope.quizquestions= res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });

}

$scope.getAnnouncements = function(){


   $http.post('/getAnnouncements').then(function(res){
   
          $scope.announcements = res.data; 
         //alert(res.data[0].aTitle);

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

			
   	}


$scope.submitDeleteQuestion= function() {

var questionType = document.getElementById("questionType").value;

if (confirm("Confirm delete question?")) {
  $http.post('/DeleteQuestionFromDB', { data : { questionID: $scope.questionID , questionCat: questionType } }).then(function(res){

 if(res.data.state==0){

             $scope.failureMessage = "Question delete was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/DeleteQuestions" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("deleteQuestionForm").reset();

             $scope.successMessage = "Question deleted successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/DeleteQuestions" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }


  });
}



}

$scope.deleteLabInServer = function(){
if (confirm("Confirm delete lab?")) {
  $http.post('/DeleteLabFromDB', { data : { labName : $scope.labDeletion} }).then(function(res){


               if(res.data.state==0){

             $scope.failureMessage = "Lab delete was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/deleteLabs" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }
             else if(res.data.state==1){

             document.getElementById("DeleteLabForm").reset();

             $scope.successMessage = "Lab deleted successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/deleteLabs" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }

});
}
}


$scope.createSessionInDB = function(){


   $http.post('/createSessionInDB', { data : { sessionTitle : $scope.sessionTitle, quizDescription : $scope.quizDescription , sessionPass : $scope.sessionPass, timeLimit: $scope.timeLimit , Sid : $scope.Sid } }).then(function(res){
   
 if(res.data.state==0){

             $scope.failureMessage = "Session creation was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/createSession" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("sessionForm").reset();

             $scope.successMessage = "Session created successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/createSession" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }

      }).catch(function(error){
         
      
   
       });

}


$scope.selfRedirect = function() {

         var form = $('<form action="/AdminHome" method="post">' + '<input type="hidden" name="" value=""></input>' + '</form>');
         $('body').append(form);
         $(form).submit();
};

$scope.addStudent = function() {
  var form = $('<form action="/AddStudent" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();
};


//Functions to delete Student(s)

$scope.deleteStudent = function() {
  var form = $('<form action="/DeleteStudent" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();
};


$scope.modifyStudent = function() {
  var form = $('<form action="/ModifyStudent" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();
};



$scope.subDeleteStudent = function() {

if (confirm("Confirm delete student?")) {
  $http.post('/DeleteStudentFromDB', { data : { deleteKey: $scope.deleteKey} }).then(function(res){


               if(res.data.state==0){

             $scope.failureMessage = "Student delete was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/DeleteStudent" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("deleteStudentForm").reset();

             $scope.successMessage = "Student deleted successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/DeleteStudent" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }




   }).catch(function(error){

      });

}

};

$scope.submitDeleteAnnoucement = function() {

if (confirm("Confirm delete annoucement?")) {
  $http.post('/DeleteAnnoucementFromDB', { data : { deleteAID : $scope.annoucementID }}).then(function(res){



               if(res.data.state==0){
                 
             $scope.failureMessage = "Annoucement deletion was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/DeleteAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                 $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("deleteAnnoucementForm").reset();

             $scope.successMessage = "Annoucement deleted successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/DeleteAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
               $('body').append(form);
              $(form).submit();
           
          
                 }, 3000);

               }




   }).catch(function(error){

      });

}

};



$scope.searchSession= function(){


 $http.post('/searchSession', { data : { searchSessionKey : $scope.searchSessionKey }}).then(function(res){

   if(res.data.state==0){

             $scope.failureMessage = "Session ID does not exist";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){
                     //alert(res.data.results[0].username);
                     
                     $scope.modifySid = res.data.results[0].Sid;
                     $scope.modifySessionPass = res.data.results[0].Spass;
                     $scope.modifyStitle = res.data.results[0].Stitle;
                     $scope.modifySDescription= res.data.results[0].Sdescription;
                     $scope.modifyTLimit = res.data.results[0].TLimit;


               }
 });




}


$scope.submitDeleteSession = function(){



 $http.post('/deleteSessionInDB', { data : { searchDeleteSessionKey : $scope.searchDeleteSessionKey }}).then(function(res){

     if(res.data.state==0){
                 
             $scope.failureMessage = "Session deletion was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/deleteSession" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                 $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("deleteSessionForm").reset();

             $scope.successMessage = "Session deleted successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/deleteSession" method="post"><input type="hidden" name="" value=""></input></form>');
               $('body').append(form);
              $(form).submit();
           
          
                 }, 3000);

               }

 });
}




$scope.modifySessionInDB = function(){

 $http.post('/modifySessionInDB', { data : { modifySid : $scope.modifySid , modifySessionPass : $scope.modifySessionPass , modifyStitle : $scope.modifyStitle , modifySDescription : $scope.modifySDescription, modifyTLimit : $scope.modifyTLimit, searchSessionKey : $scope.searchSessionKey}}).then(function(res){

       if(res.data.state==0){
                 
             $scope.failureMessage = "Session modify was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/modifySession" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                 $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("modifySessionForm").reset();

             $scope.successMessage = "Session modified successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/modifySession" method="post"><input type="hidden" name="" value=""></input></form>');
               $('body').append(form);
              $(form).submit();
           
          
                 }, 3000);

               }



 });


}
$scope.searchQuestion = function(){



var questionType = document.getElementById("questionType").value;



 $http.post('/searchQuestion', { data : { searchQuestion: $scope.modifyQid , questionCat : questionType }}).then(function(res){


   if(res.data.state==0){

             $scope.failureMessage = "Question Id does not exist";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){

                var syntaxSlider = document.getElementById("syntaxSlider");
                var compileSlider = document.getElementById("compileSlider");
                var outputSlider = document.getElementById("outputSlider");
                     //alert(res.data.results[0].username);
                     syntaxSlider.value = res.data.results[0].QSyntaxWeight;
                     outputSlider.value = res.data.results[0].QOutputWeight;
                     compileSlider.value = res.data.results[0].QCompileWeight;

                     syntaxValue.innerHTML = res.data.results[0].QSyntaxWeight;
                     outputValue.innerHTML = res.data.results[0].QOutputWeight;
                     compileSlider.innerHTML = res.data.results[0].QCompileWeight;

                     $scope.modifyQuestionTitle = res.data.results[0].Qtitle;
                     $scope.modifyQuestionDescription = res.data.results[0].Qdescription;
                     $scope.modifyConfigFile = res.data.results[0].QConfigFile;


               }

 });
}


$scope.modifyQuestionInDB = function(){

var questionType = document.getElementById("questionType").value;

var syntaxSlider = document.getElementById("syntaxSlider");
var outputSlider = document.getElementById("outputSlider");
var compileSlider = document.getElementById("compileSlider");
$http.post('/modifyQuestionInDB', { data : { modifiedTitle :  $scope.modifyQuestionTitle , modifiedDesc :  $scope.modifyQuestionDescription , modifiedSyntaxWeight : syntaxSlider.value , modifiedOutputWeight : outputSlider.value , modifiedCompileWeight : compileSlider.value ,modifiedQid : $scope.modifyQid , questionCat :questionType, modifyConfigFile : $scope.modifyConfigFile   }}).then(function(res){




               if(res.data.state==0){
                  alert("here");
             $scope.failureMessage = "Question update was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/ModifyQuestion" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                 $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("modifyQuestionForm").reset();

             $scope.successMessage = "Question updated successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/ModifyQuestion" method="post"><input type="hidden" name="" value=""></input></form>');
               $('body').append(form);
              $(form).submit();
           
          
                 }, 3000);

               }


});


}



$scope.searchAnnoucementInDB = function(){


 $http.post('/searchAnnoucementInDB', { data : { searchAnnouncement: $scope.modifyAnnoucmentID }}).then(function(res){


   if(res.data.state==0){

             $scope.failureMessage = "Student creation was unsuccessfully";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){
                     //alert(res.data.results[0].username);
                     $scope.modifyTitle = res.data.results[0].aTitle;
                     $scope.modifyDesc = res.data.results[0].annoucement;
                     $scope.modifyLabGroup = res.data.results[0].labGroup;
                     $scope.modifyCreator =  res.data.results[0].createBy;
                    

               }

 });


}


$scope.modifyAnnoucementInDB = function() {

if (confirm("Confirm modify annoucement?")) {
 $http.post('/ModifyAnnoucementDB', { data : { aID: $scope.modifyAnnoucmentID ,modifiedTitle: $scope.modifyTitle, modifiedAnnoucement : $scope.modifyDesc, modifiedLabGroup : $scope.modifyLabGroup,modifiedCreator : $scope.modifyCreator }}).then(function(res){


  if(res.data.state==0){

             $scope.failureMessage = "Annoucement update was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/ModifyAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("modifyAnnoucementForm").reset();

             $scope.successMessage = "Annoucement update successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/ModifyAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }

 });

}
}



$scope.modifyStudentInDB = function() {
if (confirm("Confirm update student?")) {
 $http.post('/ModifyStudentDB', { data : { modifiedUsername: $scope.modifyStudentName, modifiedPassword : $scope.modifyStudentPassword, modifiedLabGroup : $scope.modifyLabGroup, modifiedEmail : $scope.modifyEmail , modifyKey : $scope.modifyKey }}).then(function(res){


             if(res.data.state==0){

             $scope.failureMessage = "Student update was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
                var form = $('<form action="/ModifyStudent" method="post"><input type="hidden" name="" value=""></input></form>');
                  $('body').append(form);
                $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("modifyStudentForm").reset();

             $scope.successMessage = "Student update successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
                var form = $('<form action="/ModifyStudent" method="post"><input type="hidden" name="" value=""></input></form>');
                $('body').append(form);
                $(form).submit();
           
          
                 }, 3000);

               }

 }).catch(function(error){

      });
}

};



$scope.searchModifyStudent = function() {

 $http.post('/SearchStudent', { data : { modifyKey: $scope.modifyKey }}).then(function(res){


   if(res.data.state==0){

             $scope.failureMessage = "Student email does not exist";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){
                     //alert(res.data.results[0].username);
                     $scope.modifyStudentName = res.data.results[0].username;
                     $scope.modifyStudentPassword = res.data.results[0].password;
                     $scope.modifyLabGroup = res.data.results[0].labGroup;
                     $scope.modifyEmail = res.data.results[0].email;


               }


            

            }).catch(function(error){

      });

};


 $scope.getLabsDropdown = function(){

  $http.post('/getLabsDropdown').then(function(res){
   
          $scope.labs = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });
 }

     $scope.submitCreateAnnoucement = function(){


      if (confirm("Confirm create annoucement?")) {
   $http.post('/submitCreateAnnoucement',{data:{ annoucementTitle: $scope.annoucementTitle, description: $scope.annoucementDesc, labGroup : $scope.Group, creator: $scope.createBy , username: $scope.username}}).then(function(res){

      if(res.data.state==0){

             $scope.failureMessage = "Annoucement creation was unsuccessful";
             $scope.failureMessagebool = true;
              $timeout(function () {
                   $scope.failureMessagebool = false;
             //   var form = $('<form action="/ModifyStudent" method="post"><input type="hidden" name="" value=""></input></form>');
                //  $('body').append(form);
              // $(form).submit();
           
          

                 }, 3000);
               }

               else if(res.data.state==1){

             document.getElementById("annoucementForm").reset();

             $scope.successMessage = "Annoucement created successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
                  $scope.successMessagebool = false;
               // var form = $('<form action="/ModifyStudent" method="post"><input type="hidden" name="" value=""></input></form>');
               // $('body').append(form);
               // $(form).submit();
           
          
                 }, 3000);

               }

   }).catch(function(error){
         
      
   
      });
}
      }



      $scope.createStudent = function(){


        //alert($scope.studentName + "\n" + $scope.studentPassword +"\n" + $scope.confirmPassword + "\n" + $scope.matricNo + "\n" + $scope.labGroup);
if (confirm("Confirm create student?")) {
        $http.post('/CreateStudent', { data : { studentName: $scope.studentName,
            studentPassword: $scope.studentPassword, labGroup : $scope.labGroup , email : $scope.email} }).then(function(res){



               if(res.data.state==0){

             $scope.failureMessage = "Student creation was unsuccessfully";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){

             document.getElementById("studentForm").reset();

             $scope.successMessage = "Student created successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
               $scope.successMessagebool = false;
          
                 }, 5000);

               }

            }).catch(function(error){

      });



}

}


$scope.uploadLabFile = function(file,errFiles){
$scope.labFile = file;
$scope.errFile = errFiles && errFiles[0];
$scope.labFilename = file.name;
}


$scope.createLabInServer = function(){
     
      
     
      file = $scope.labFile;

  
         if (file) {
         
                file.upload = Upload.upload({
                url: '/adminCreateLab',
                method: 'POST',
                file : $scope.labFile,
                data: {file: file}
            });

               file.upload.then(function (response) {
                if(response.data.state==1){
                  
                   $http.post('/adminWriteLabToDB', { data : { labNo : $scope.labNo, labName: $scope.labName, labFileName : $scope.labFilename} }).then(function(res){

              if(res.data.state==0){

             $scope.failureMessage = "Lab creation was unsuccessfully";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){

             document.getElementById("LabForm").reset();

             $scope.successMessage = "Lab created successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
               $scope.successMessagebool = false;
          
                 }, 5000);

               }

            });


                }

            }, function (response) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });

      }
      

}







 $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];


 }

$scope.viewStudentResults= function(){

  var form = $('<form action="/ViewStudentResults" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}


 $scope.modifyAnnoucement = function() {
  var form = $('<form action="/ModifyAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();
};

 $scope.modifyQuestions = function() {
  var form = $('<form action="/ModifyQuestion" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();
};



$scope.uploadConfigFile = function(file,errFiles){
      $scope.configFile = file;
      $scope.configFilename = file.name;
      $scope.errFile = errFiles && errFiles[0];
      file = $scope.configFile;



  
         if (file) {

                file.upload = Upload.upload({
                url: '/uploadConfigFile',
                method: 'POST',
                file : $scope.configFile,
                data: {file: file}
            });

               file.upload.then(function (response) {
                if(response.data.state==1){
                  //alert("here");
                }

            }, function (response) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });

      }
      

}

 $scope.uploadSolFile = function(file, errFiles) {
      $scope.solutionFileName = file;
      $scope.errFile = errFiles && errFiles[0];
      file = $scope.solutionFileName;

   if (file) {

             

                file.upload = Upload.upload({
                url: '/UploadSolutionTest',
                method: 'POST',
                file : $scope.solutionFileName,
                data: {file: file}
            });
                


               file.upload.then(function (response) {

                  $("#runBtn").show();
                }, function (response) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });

      }

 }

  $scope.getAllSubmissionRecords = function(){

   $http.post('/getAllSubmissionRecords').then(function(res){
   
         $scope.labsubmissionrecords = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });




}

  $scope.createConfigFile = function(){

var questionType = document.getElementById("questionType").value;
var configFiletype ="";
   if(questionType=="labQuestion"){
    configFileType = "labQuestion";
   }    
   else  
    if(questionType=="quizQuestion"){
     configFileType = "quizQuestion";
           }
   

    var d = new Date();
          $http.post('/createConfigFile', { data : { configFileName : $scope.manualConfigFilename , input : $scope.inputs, output : $scope.outputs, keywords : $scope.keywords, score : $scope.score, configFileLoc : configFileType , title: $scope.questionName , main: $scope.main} }).then(function(res){

          if(res.data.state==0){
             document.getElementById('logs').value += d + ":\nError In Creating Config File\n";
          }
           if(res.data.state==1){
             document.getElementById('logs').value += d + ":\nConfig File created successfully\n";
          }
          
  
          });
        
        
  }

  $scope.createAssessmentQuestion = function(){
 var d = new Date();
var questionType = document.getElementById("questionType").value;
var syntaxSlider = document.getElementById("syntaxSlider");
var outputSlider = document.getElementById("outputSlider");
var compileSlider = document.getElementById("compileSlider");
var configType = document.getElementById("configFileType").value;
var syntaxValue = syntaxSlider.value;
var outputValue = outputSlider.value;
var compileValue = compileSlider.value;
var configFileName ="";
if(configType=="Upload"){
 configFileName= $scope.configFilename;
}
else if(configType=="Manual"){
 configFileName= $scope.manualConfigFilename+".txt";
}
var configFilename = "";

        $http.post('/createQuestionInDB', { data : { questionName : $scope.questionName, description : $scope.description, syntaxWeight : syntaxValue, outputWeight : outputValue, compileWeight : compileValue, questionCat : questionType , configFilename : configFileName, configFileType: configType} }).then(function(res){

          if(res.data.state==0){
             document.getElementById('logs').value += d + ":\nError In creating Questions\n";
          }
           if(res.data.state==1){
             document.getElementById("questionForm").reset();
             document.getElementById('logs').value += d + ":\nQuestion created successfully\n";
          }

  
          });

      
  }


  $scope.getAllQuizSubmissionRecords = function(){

   $http.post('/getAllQuizSubmissionRecords').then(function(res){
   
         $scope.quizsubmissionrecords = res.data.results; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });




}



  $scope.uploadTestFiles = function(file, errFiles) {
   $scope.tempFile = file;
   $scope.errFile = errFiles && errFiles[0];
   file = $scope.TempFile;

   var sList = document.getElementById("fileSelect");
   var option = document.createElement("option");
   option.text = $scope.tempFile.name;
   sList.add(option);

alert($scope.tempFile.name);

   if (file) {
      alert($scope.tempFile);
   }

  }

 $scope.compileSol = function(){
var configType = document.getElementById("configFileType").value;
 
       var d = new Date();
  document.getElementById('logs').value += d + ":\n"+ "Testing Solution....please wait....."+ "\n";

   if(configType=="Upload"){
   
     $http.post('/testRun', { data : { fileName : $scope.solutionFileName.name, configFileName : $scope.configFilename, configType : "Upload" } }).then(function(res){



          if(res.data.state==0){

             // alert(res.data.err);
              console.log(res.data.err);

              //var logs = $('#logs');
              //logs.val(d + ": " +logs.val() + res.data.err + "\n");

              document.getElementById('logs').value += d + ":\n"+ res.data.err + "\n";

          }  if(res.data.state==1){
  document.getElementById('logs').value += d + ":\n"+ "Compile successful!"+ "\n";
  var inputSize = res.data.inputArr.length;
  var input= res.data.inputArr;
  var resultSize = res.data.resultArr.length;
  var output= res.data.resultArr;

  var inputString ="";
  var outputString ="";
for(var i =0;i<inputSize;i++){

inputString += input[i]+"\n";

}
for(var j =0;j<resultSize;j++){
outputString += output[j]+"\n";
}
document.getElementById('logs').value += d + ":\nInput:\n"+ inputString+ "\n";
document.getElementById('logs').value += d + ":\nOutput:\n"+ outputString+ "\n";


      $scope.proceed=1;

          }

            }).catch(function(error){

      });



          }
          else if(configType=="Manual"){
             $http.post('/testRun', { data : {  fileName : $scope.solutionFileName.name,input : $scope.inputs, output : $scope.outputs , configType : "Manual"} }).then(function(res){

                var d = new Date();

            if(res.data.state==0){

             // alert(res.data.err);
              console.log(res.data.err);

              //var logs = $('#logs');
              //logs.val(d + ": " +logs.val() + res.data.err + "\n");

              document.getElementById('logs').value += d + ":\n"+ res.data.err + "\n";

             }  if(res.data.state==1){
             document.getElementById('logs').value += d + ":\n"+ "Compile successful!"+ "\n";

              $scope.proceed=1;

          }


             }).catch(function(error){

      });

          }

        }


  $scope.createNewLab = function(){

   file = $scope.labFile;
 
 /*$http.post('/adminCreateLab', { data : { fileName : $scope.labFile.filename, labName : $scope.labName } }).then(function(res){


 });*/


        }





      $scope.getLabs = function(){
           $http.post('/getLabs').then(function(res){
   
          $scope.labs = res.data; 
         //alert(res.data[0].username);

      }).catch(function(error){
         
      
   
       });
      }

    


      $scope.submitSolutionFile = function(){
/*

        if($scope.proceed==0){
          $("#cannotProceed").show();

        }
        else{
*/
var message="";
 if($scope.proceed==0){

  message = "Config File has not been tested. Proceed to create question?";

 }
 else
  message = "Confirm create question?";
if (confirm(message)) {
var syntaxSlider = document.getElementById("syntaxSlider");
var outputSlider = document.getElementById("outputSlider");
var outputSlider = document.getElementById("compileSlider");

var maxErrors = $scope.maxErrors;
var questionTitle = $scope.questionName;
var questionDesc = $scope.description;
var syntaxValue = syntaxSlider.value;
var outputValue = outputSlider.value;

 $http.post('/createNewQuestion', { data : { questionTitle : $scope.questionName , description: $scope.description, syntaxWeight: syntaxValue, outputWeight: outputValue} }).then(function(res){

            if(res.data.state==0){

             $scope.failureMessage = "Question creation was unsuccessfully";
             $scope.failureMessagebool = true;
              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);
               }

               else if(res.data.state==1){

             document.getElementById("questionForm").reset();

             $scope.successMessage = "Question created successfully";
             $scope.successMessagebool = true;
              $timeout(function () {
               $scope.successMessagebool = false;
          
                 }, 5000);

               }





});

}
        //}
    


      }


$scope.createSession = function(){
  var form = $('<form action="/createSession" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.deleteSession = function(){
  var form = $('<form action="/deleteSession" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.modifySession = function(){
  var form = $('<form action="/modifySession" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}


$scope.createLabs = function(){
  var form = $('<form action="/createLabs" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.deleteLabs = function(){
  var form = $('<form action="/deleteLabs" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.modifyLabs = function(){
  var form = $('<form action="/modifyLabs" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}


$scope.addQuestions = function(){
  var form = $('<form action="/AddQuestions" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.modifyScoreScheme = function(){
  var form = $('<form action="/ModifyScoreScheme" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}


$scope.createAnnoucement = function(){
  var form = $('<form action="/CreateAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.deleteAnnoucement = function(){
  var form = $('<form action="/DeleteAnnoucement" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}



$scope.getHome = function(){
  var form = $('<form action="/home" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}


$scope.deleteQuestions = function(){
  var form = $('<form action="/DeleteQuestions" method="post"><input type="hidden" name="" value=""></input></form>');
  $('body').append(form);
  $(form).submit();

}

$scope.submitModifiedScoreScheme = function(){
var syntaxSlider = document.getElementById("syntaxSlider");

var outputSlider = document.getElementById("outputSlider");
if(+syntaxSlider.value + +outputSlider.value ==100){
  alert("success");
}
else
alert(+syntaxSlider.value  + +outputSlider.value );


}


  $scope.submitUploadedFiles = function() {
      file = $scope.f;

   if (file) {

             

                file.upload = Upload.upload({
                url: '/UploadStudents',
                method: 'POST',
                file : $scope.f,
                data: {file: file}
            });

               file.upload.then(function (response) {

               if(response.data.state==0){
               $scope.f = "";
              $scope.failureMessage = "Upload was unsuccessfully";
              $scope.failureMessagebool = true;

              $timeout(function () {
               $scope.failureMessagebool = false;
          
                 }, 5000);

                }
               else if(response.data.state==1){


                $scope.f = "";
        
              $scope.successMessage = "Upload successfully";
              $scope.successMessagebool = true;
              $timeout(function () {
           
               $scope.successMessagebool = false;
          
                 }, 5000);

                      }

                $timeout(function () {
                    file.result = response.data;
                });



            }, function (response) {

              
                      /*
                if (response.status > 0)
                    $scope.errMsg = response.status + ': ' + response.data;
                 */
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });

      }

  }


});

app.component('sidebarComponent', {
   
        controller: 'adminhomeController',
        template : '<div class="col-md-2"><!--grid 2 for bootstrap --><div class="sidebar content-box" style="display: block;"><ul class="nav"><!-- Main menu --><li class="current"><a href="" ng-click="viewStudentResults()"><i class="glyphicon glyphicon-home"></i> Dashboard</a></li><br><li class="submenu"><a href=""><i class="glyphicon glyphicon-list"></i> Manage Annoucements<span class="caret pull-right"></span></a><!-- Sub menu --><ul><li><a href="" ng-click="createAnnoucement()">Create Annoucements</a></li><li><a href="" ng-click="deleteAnnoucement()">Delete Annoucements</a></li><li><a href="" ng-click="modifyAnnoucement()">Modify Annoucements</a></li></ul></li><br><li class="submenu"><a href=""><i class="glyphicon glyphicon-list"></i> Manage Sessions<span class="caret pull-right"></span></a> <!-- Sub menu --><ul><li><a href="" ng-click="createSession()">Create Quiz Sessions</a></li><li><a href="" ng-click="deleteSession()">Delete Quiz Sessions</a></li><li><a href="" ng-click="modifySession()">Modify Quiz Sessions</a></li></ul></li><br><li class="submenu"><a href=""><i class="glyphicon glyphicon-list"></i> Manage Labs<span class="caret pull-right"></span></a><!-- Sub menu --><ul><li><a href="" ng-click="createLabs()">Create Labs</a></li><li><a href="" ng-click="deleteLabs()">Delete Labs</a></li><li><a href="" ng-click="modifyLabs()">Modify Labs</a></li> </ul></li><br><li class="submenu"><a href=""><i class="glyphicon glyphicon-list"></i> Manage Assessment Questions<span class="caret pull-right"></span></a><!-- Sub menu --><ul><li><a href="" ng-click="addQuestions()">Add Assessment Questions</a></li><li><a href="" ng-click="deleteQuestions()">Delete Assessment Questions</a></li><li><a href="" ng-click="modifyQuestions()">Modify Assessment Questions</a></ul></li><br><li class="submenu"><a href=""><i class="glyphicon glyphicon-list"></i> Manage Student Records<span class="caret pull-right"></span></a><!-- Sub menu --><ul><li><a href="" ng-click="addStudent()">Add Students Record</a></li><li><a href="" ng-click="deleteStudent()">Delete Students Record</a></li><li><a href="" ng-click="modifyStudent()">Modify Students Record</a></li></ul></li></ul></div></div>'


   
});


app.component('headerComponent', {
    
        //template : '<h1>Test</h1>'
		  controller: 'adminhomeController',
        template: '<div class="header"><div class="container"><div class="row"><div class="col-md-5"><!-- Logo --><div class="logo"><h1><a href ng-click="selfRedirect();">'+ localStorage.getItem('username')+'</a></h1></div></div><div class="col-md-5"><div class="row"><div class="col-lg-12"></div></div></div><div class="col-md-2"><div class="navbar navbar-inverse" role="banner"><nav class="collapse navbar-collapse bs-navbar-collapse navbar-right" role="navigation"><ul class="nav navbar-nav"><li class="dropdown"><a href="" class="dropdown-toggle" data-toggle="dropdown">My Account <b class="caret"></b></a><ul class="dropdown-menu animated fadeInUp"><li><a href="profile.html">Profile</a></li><li><a href ng-click="logout();">Logout</a></li></ul></li></ul></nav></div></div></div></div></div>'
		//controller: adminhomeController
		
		
});
