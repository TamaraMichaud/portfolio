// career.js -> addImageEventListeners = 
//	document.getElementById('pdf-png').addEventListener('click', enlargeImage);

export function enlargeImage() {

    console.log(this);
    console.log(" ^^ oh, what was that?!");
    // ^^ set stuff in the attributes here for the variables we need below...
    
    var outerWrapper = document.createElement('div');
    outerWrapper.classList.add('enlarge-image-modal');

    var myExit = document.createElement('div');
    myExit.innerHTML = "X";
    myExit.classList.add('modal-close');   ///////////////////// TODO: generify this.
    myExit.addEventListener('click', destroyModal);

    outerWrapper.appendChild(myExit);

//    var myPdf = document.createElement('embed');
    var imgObj = document.createElement('img');
    imgObj.classList.add('zoom-img');
    imgObj.src = this.src;

    outerWrapper.appendChild(imgObj);

    document.querySelector('.main-image-modal').appendChild(outerWrapper);
//    document.querySelector('.sidebar').setAttribute("style", "display:none");
}


function destroyModal() {
//	var outerWrapper = document.querySelector('.enlarge-image-modal');
//	var parent = document.querySelector('.main-popup-modal');  
//    
//    //TODO: this div should sit in the header so it's on all pages regardless. -- done
//
////	outerWrapper.remove();
	this.parentNode.remove();
}