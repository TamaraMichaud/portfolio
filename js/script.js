//import {searchClients} from './SearchFilterClients.js';
//import {createCustomElement} from './modules/CustomElements.js';
//import {newElement} from './modules/StandardElements.js';
//
////global variables
//export var clientList, campaignList, fileList, settingsInfos, userList, userAccessLevel;
//
//var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
//var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
//export var contextPath = urlPathStart + projectDir;
//
//var gotClients = 0;
//var gotSettings = 0;

var qodCredit = 'courtesy of &nbsp;&nbsp;<span style="z-index:50;font-size:0.9em;"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>';

$(document).ready(function() {

    jQuery.support.cors = true;

 
	
    
//    $.ajax({
//       url: 'https://quotes.rest/qod',
//       headers: {
//            "Accept": "application/json"
//       },
//       method: 'GET',
//       success: function(responseData) {
//
//            updateQodAndCredit(responseData.contents.quotes[0]);
//       }
//    });
// AS A FREE USER WE HAVE LIMITS HERE SO I'VE COMMENTED THIS CODE WHILE SITE IS UNDER DEVELOPMENT
    
    
    
    
    console.log("reading WORKOUTS json from file...");
    var workoutsConfig = readJsonConfig("workouts");

    console.log(workoutsConfig);
    // muscle-groups, workout-types, workouts
//    var workoutsList = workoutsConfig["workouts"];
//    var musclesList = workoutsConfig["muscle-groups"];
//    var typesList = workoutsConfig["workout-types"];
    

    
    
    
    
    
    function getElement(elementId) {
        return document.getElementById(elementId);
    }
    
    
    
    function updateQodAndCredit(qodObject) {
        
        ids = {
            textId: 'qod-text',
            authorId: 'qod-author',
            attributionId: 'qod-attribution'
        }
        
        getElement(ids.textId).innerHTML = qodObject.quote;
        getElement(ids.textId).title = qodObject.title;
        getElement(ids.authorId).innerHTML = qodObject.author;
        getElement(ids.attributionId).innerHTML = qodCredit;
    }
    
    
    function readJsonConfig(configFile){
			
				var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
				var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
			
				var urlPath = urlPathStart + projectDir + "/config/";

        var result;
				$.ajax({
						type: "GET",
						url: urlPath + configFile + ".json",
						dataType: "json",

						error: function (e) {
								alert("OOPS failed to load json config file!");
								console.log("JSON file-reading Failed: ", e);
						},

						success: function (responseObj) {

							 console.log("Top-level contents are: ")
							 $.each(responseObj, function(key, val) {

									 console.log("key: " + key + ", value: " + val);


							 });
                            var workoutsList = responseObj['workouts'];
                            console.log(workoutsList);
//return responseObj;
//                            this.result = responseObj;
						}
          })
//        return result;
    }
    

    
    

});

