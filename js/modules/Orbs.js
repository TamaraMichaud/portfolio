import {findElement, getElement} from './ElementSeeker.js';


export class TimelineOrb {
	
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
			if(infoEl.style.display === "none") {
				
				infoEl.style.setProperty("display", "inline");
				infoEl.classList.add('show');
			} else {
				infoEl.classList.remove('show');
				infoEl.style.setProperty("display", "none");
			}
			
			
			
		});

		// append orb at position
		newOrb.style.setProperty("position", "absolute");

//this.orb = newOrb;
		return newOrb;
	}
	
}




export class InfinityOrb {
//	extends OrbActions {
	
	constructor(orbLinkType){

		this.type = orbLinkType;
		this.orbsList = ["a", "b"];
		this.a = { 
			orb: `.${orbLinkType}.orb-major.a`,
			pivot: `.${orbLinkType}.pivot.a`
		}
		this.b = { 
			orb: `.${orbLinkType}.orb-major.b`,
			pivot: `.${orbLinkType}.pivot.b`
		}		
	}
	
	
	addListeners(href_link) {
					
		for(var nextOrb of this.orbsList) {
			
			this.addClick(this[nextOrb].orb, href_link);
			
			var other = (nextOrb === "a") ? "b" : "a";
			this.addMouseOver(this[nextOrb], this[other]);
		}
	}
			
	
	addClick(orbRef, href){

		findElement(orbRef).addEventListener('click', function(){

			window.location.href = href;
		})
	}
	
	
	addMouseOver(mainRefs, otherRefs){

		var mainOrb = findElement(mainRefs.orb);
		var mainPivot = findElement(mainRefs.pivot);
		var otherOrb = findElement(otherRefs.orb);
		var otherPivot = findElement(otherRefs.pivot);
				
		mainOrb.addEventListener('mouseover', function(){

			if(mainPivot.classList.contains('moving')) {

				// freeze, ...wait... unfreeze
				mainPivot.classList.remove('moving');
				otherPivot.classList.remove('moving');
				mainOrb.classList.add('caught');
				otherOrb.classList.add('caught');

				setTimeout(() => {

					mainPivot.classList.add('moving');
					otherPivot.classList.add('moving');
					mainOrb.classList.remove('caught');
					otherOrb.classList.remove('caught');

				}, 3000);
			} 
		});
	}
	
}
