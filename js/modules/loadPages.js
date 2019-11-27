function loadCommonElements(){
	
	const includesArray = [ 'header', 'footer'];
	$.each(includesArray, function(item) {
		
		var pathToFile = "/includes/" + includesArray[item] + ".html";
		var fileType = "html";
		var elementId = includesArray[item];
		
		readFileContents(pathToFile, fileType, elementId);
	});
}


function readFileContents(pathToFile, fileType, elementId) {
	var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
	var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");

	$.ajax({
				type: "GET",
				url: urlPathStart + projectDir + pathToFile,
				dataType: fileType,
				error: function (e) {
						console.log("Failed to read file: " + pathToFile, e);
				},
				success: function (fileContents) {

						document.getElementById(elementId).innerHTML = setHrefLinks(fileContents, urlPathStart + projectDir);
				}
	 }); 
}



function setHrefLinks(fileContents, urlPath){

	return fileContents.replace("href=\"", "href=\"" + urlPath + "/");
}

loadCommonElements();