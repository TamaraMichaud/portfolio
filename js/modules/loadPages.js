const relativeDir = getRelativeDir();
const includesArray = [ 'header', 'footer'];
const urlPathStart = window.location.protocol + 
		"//" + window.location.host + "/";
const projectDir = document.URL
  		.replace(urlPathStart, "").replace(/\/.*$/, "\/");
const pathRoot = urlPathStart + projectDir;


for(var i = 0; i < includesArray.length; i++){
	doAjax(includesArray[i]);
}

function doAjax(item){
  $.ajax({
			type: "GET",
			url: relativeDir + 'includes/' + item + '.html',
			dataType: 'html',
			error: function (e) {
					console.log("Failed to read file: " + 'x', e);
			},
			success: function (fileContents) {

					document.getElementById(item).innerHTML = setHrefLinks(fileContents);
			}
	}); 
}

function getRelativeDir(){
	const folderDepth = document.URL.replace(/^.*portfolio\//, '').replace(/[^\/]*/g, '').length;
	var relativeDir = '';
	for(var d = 0; d < folderDepth; d++) {
		relativeDir += '../';
	}
	return relativeDir;
}

function setHrefLinks(fileContents){

	return fileContents.replace("href=\"", "href=\"" + pathRoot + "/");
}