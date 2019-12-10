function toggleSidebar() {
	
	var sidebarElem = document.querySelector('.sidebar');
	
	if(sidebarElem.classList.contains('show')) {
		sidebarElem.setAttribute("style", "display:none");
		sidebarElem.classList.remove('show');
	} else {
		sidebarElem.setAttribute("style", "display:block");
		sidebarElem.classList.add('show');
	}
	
	setTimeout(() => {
		
		if(sidebarElem.classList.contains('show')) {
			sidebarElem.setAttribute("style", "display:none");
			sidebarElem.classList.remove('show');
		}	
		
	}, 5000);
	
}
// set default image for linkedInProfile if broken

