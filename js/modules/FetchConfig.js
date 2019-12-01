export async function fetchFileContents(fileName){
                            
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var urlPath = urlPathStart + projectDir + "/config/";

    console.log("Reading contents of config file: " + fileName)
    var rawResults = await fetch(urlPath + fileName + ".json");
    var jsonContents = await rawResults.json();
    
	return jsonContents;
//    globalExercisesConfig = jsonContents;
//    controller.init();    
};