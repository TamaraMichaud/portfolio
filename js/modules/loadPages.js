const relativeDir = getRelativeDir();
//const includesArray = [ 'header', 'footer', 'footer-lazy'];
const urlPathStart = window.location.protocol + 
		"//" + window.location.host + "/";
const projectDir = document.URL
  		.replace(urlPathStart, "").replace(/\/.*$/, "\/");
const pathRoot = urlPathStart + projectDir;

//for(var i = 0; i < includesArray.length; i++){
//	doAjax(includesArray[i], true);
//}

doAjax('header', 'header', true);
//doAjax('footer', 'footer', true);
//doAjax('footer', 'footer-lazy', true);


function doAjax(docname, item, relative){
  $.ajax({
			type: "GET",
			url: relativeDir + 'includes/' + docname + '.html',
			dataType: 'html',
			error: function (e) {
					console.log("Failed to read file: " + 'x', e);
			},
			success: function (fileContents) {

					document.getElementById(item).innerHTML = (relative) ? setHrefLinks(fileContents) : fileContents;
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
    
	return fileContents.replace(/href=\"\.\//g, "href=\"" + pathRoot).replace(/src=\"\.\//g, "src=\"" + pathRoot);
}