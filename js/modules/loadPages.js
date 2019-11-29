function loadCommonElements(){
	
	const includesArray = [ 'header', 'footer'];
	$.each(includesArray, function(item) {
		
		var pathToFile = "../includes/" + includesArray[item] + ".html";
		var fileType = "html";
		var elementId = includesArray[item];
		
		readFileContents(pathToFile, fileType, elementId);
	});
}

//
//function getServerPath(){
//    //HACK: new security on my work laptop requires me to use this workaround when developing locally here.
//    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
//    if (window.location.host === "") {
//        // testing by loading file in browser instead of localhost
//        return document.URL.replace(urlPathStart, "").replace(/\/[^\/]*$/, '\/');
//    } else {
//        
//	    return document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
//    }
//    //FUCKSAKKKKKEEEE
//}


function readFileContents(pathToFile, fileType, elementId) {
	
//var serverPath = '../includes/'
//    console.log("Path root: " + "DIEEEEE");
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var pathRoot = urlPathStart + projectDir;
	$.ajax({
				type: "GET",
				url: pathRoot + pathToFile,
				dataType: fileType,
				error: function (e) {
						console.log("Failed to read file: " + pathToFile, e);
				},
				success: function (fileContents) {

						document.getElementById(elementId).innerHTML = setHrefLinks(fileContents, pathRoot);
                    //TODO: we can't do relative references... but thanks to this update, now we can't do full paths either. ARGHHHHHHH
				}
	 }); 
}



function setHrefLinks(fileContents, urlPath){

	return fileContents.replace("href=\"", "href=\"" + urlPath + "/");
}

loadCommonElements();