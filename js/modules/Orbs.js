import {getElement} from './ElementSeeker.js';

class OrbActions {
	
	constructor(orbElementObj) {
	// createOrb(major/large)
	 	this.orbsList = [];
		this.orbsList.push(orbElementObj);
	}

	addOrb(orbElementObj){
		this.orbsList.push(orbElementObj);
	}
	
	//getOrb(){
	
//}
	
	
	
}



export class TimelineOrb extends OrbActions {
	
	constructor(orbId, elementObj){
		var newOrb = document.createElement("div");
		newOrb.id = orbId;
		newOrb.classList.add("orb-large");
		newOrb.classList.add("orb");

				// append item element
		newOrb.appendChild(elementObj);

		// bind click action (show item element)
		newOrb.addEventListener('click', () => {

			var infoEl = getElement(elementObj.id);
			var newVal = 
			 (infoEl.style.display === "none") ? "inline" : "none";
			infoEl.style.setProperty("display", newVal);
		});

		// append orb at position
		newOrb.style.setProperty("position", "absolute");

		super(newOrb);
		return newOrb;
	}
	
}




export class InfinityOrb extends OrbActions {
	
	constructor(orbLinkType){
		this.type = orbLinkType;
		this.a = { 
			orb: this.getOrb('a'),
			pivot: this.getPivot('a')
		}
		this.b = { 
			orb: this.getOrb('b'),
			pivot: this.getPivot('b')
		}		
	}
	
	getPivot(ab){
		console.log("err...");
	}
	
	
	
//this.orbsList == pairs of orbs
	//classList.add()
	//appendCareerItem(careerInfo object)
	//setEventListener(on-hover/click)
	
	
}


























console.log("BEGIN");
//(function() {
	
	var mainOrbs = document.getElementsByClassName('orb-major');

	for(var o = 0; o < mainOrbs.length ; o++){

		// get the children
//		var children = mainOrbs[o].children;
		
		

		
			// scatter them around their parent
    	// make them shiver
			// make them float in figure of 8

	
	
	}


	
// on click of major, freeze children and display their title

// on click of child, go to destination

//listeners, keyboard events:  keydown, keypress, keyup

	
	
//})();