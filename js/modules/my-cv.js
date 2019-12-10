function toggleSidebar() {
	
	var sidebarElem = document.querySelector('.sidebar');
	
	if(sidebarElem.classList.contains('show')) {
		console.log("here");
		sidebarElem.setAttribute("style", "display:none");
		sidebarElem.classList.remove('show');
	} else {
		console.log("thereee");
		sidebarElem.setAttribute("style", "display:block");
		sidebarElem.classList.add('show');
	}
	
}
// set default image for linkedInProfile if broken


// instead of sidebar, open new page; have the 3 images in a bootstrap carousel
    // nope; will need to be v.2; carousel of 3 circular images that rotate visibly on x axis
//(2 fading in the background, one major in the fore, on click/swipe, swivel the three and bring another forward)

