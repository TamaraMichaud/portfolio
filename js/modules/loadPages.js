function loadCommonElements(){
	
	const includesArray = [ 'header', 'footer'];
	$.each(includesArray, function(item) {
		
		console.log("item: " + includesArray[item])
		var pathToFile = "./includes/" + includesArray[item] + ".html";
		var fileType = "html";
		var elementId = includesArray[item];
		
		readFileContents(pathToFile, fileType, elementId);
	});
}


function readFileContents(pathToFile, fileType, elementId) {
	
	 $.ajax({
				type: "GET",
				url: pathToFile,
				dataType: fileType,
				error: function (e) {
						console.log("Failed to read file: " + pathToFile, e);
				},
				success: function (fileContents) {
						document.getElementById(elementId).innerHTML = fileContents;
				}
	 }); 
}