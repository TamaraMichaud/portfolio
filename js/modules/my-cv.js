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


	document.getElementById('pdf-png').addEventListener('click', () => {

		var myCvModal = document.createElement('div');
		myCvModal.classList.add('cv-pdf');

		var myExit = document.createElement('div');
		myExit.innerHTML = "X";
		myExit.classList.add('modal-close');
		myExit.addEventListener('click', destroyModal);
		
		myCvModal.appendChild(myExit);
		
		var myPdf = document.createElement('embed');
		myPdf.classList.add('the-pdf')
		myPdf.src = window.location.protocol + 
			"//" + window.location.host + "/portfolio/img/career/tm_cv-2019.pdf";
		myPdf.type = "application/pdf";
		myCvModal.appendChild(myPdf);

		document.querySelector('.main-image-modal').appendChild(myCvModal);
		document.querySelector('.sidebar').setAttribute("style", "display:none");

	});
}


function destroyModal(){
//	var myCvModal = document.querySelector('.cv-pdf');
//	var parent = document.querySelector('.mycvmodal');
////	console.log(myCvModal);
//	console.log(parent);
//	console.log(parent.firstChild);
//	while(parent.firstChild){
//		parent.removeChild();
//	}
//	myCvModal.remove();
    this.parentNode.remove();
}