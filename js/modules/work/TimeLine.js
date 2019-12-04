export class TimeLine {
	
	constructor(careerItemArray, orbWidth, innerWidth){
		this.careerArray = careerItemArray;
		this.orbWidth = orbWidth;
		this.innerWidth = innerWidth;
		this.element = () => document.getElementById('timeline');
	}

	getPositionPoints(divisor) {
		// grab all the dates and print a div per [space]
		this.posX = this.element().getBoundingClientRect().left - 20;
		this.posY = this.element().getBoundingClientRect().top - 57;
		this.space = (this.element().clientWidth - this.orbWidth) / (divisor - 1);
console.log(`SPACER: ${this.space}`)
		return [this.posX, this.posY, this.space];
	}
	
	reset(){

		this.getPositionPoints(this.careerArray.length);
		var leftPos = this.posX;
		this.careerArray.forEach((ref, index, fullArray) =>  {

			var nextOrb = document.getElementById(`orb-${index}`);
			nextOrb.style.setProperty("top", `${this.posY}px`);
			nextOrb.style.setProperty("left", `${leftPos}px`);		
			leftPos += this.space;
		})
	}

	
	populateTimeline(){

		var maxDate = this.getMaxDate();
		var minDate = maxDate;
		// order the career objects (add one for "today")
		this.careerArray.sort((a,b) => {
			var refA = (Array.isArray(a.ref)) ? a.ref[0] : a.ref;
			var refB = (Array.isArray(b.ref)) ? b.ref[0] : b.ref;
			minDate = (refA > minDate) ? minDate : refA;
			return refA - refB;
		});
		this.careerArray.push(maxDate);

		// grab all the dates and print a div per [space]
		this.getPositionPoints(this.careerArray.length);

		var leftPos = this.posX; 
		var innerYRef = 0;
		var innerXRef = 0;
		this.careerArray.forEach((ref, index, fullArray) =>  {

			//create orb,
			var careerObj = this.createCareerItem(index, ref, innerXRef, innerYRef);
			var newOrb = this.createPopulatedOrb(index, careerObj, leftPos);

			this.element().appendChild(newOrb);

			leftPos += this.posX;
			innerYRef = (innerYRef === 2) ? 0 : ++innerYRef;
			innerXRef -= this.innerWidth  / (fullArray.length - 1);
		});
		this.reset();
	}

	
	createCareerItem(index, ref, innerXRef, innerYRef){
			
		var elementObj;
		if(ref.element) {
			elementObj = ref.element;
		} else {
			elementObj = document.createElement("div");
			elementObj.textContent = "TODAYS DATE";
		}
		elementObj.id = "info-" + index;
		elementObj.style.setProperty("display", "none");
		elementObj.style.setProperty("left", `${innerXRef}px`);
		elementObj.classList.add(`pos-${innerYRef}`);

		return elementObj;
	}
	
	
	createPopulatedOrb(index, elementObj, leftPos){

		var newOrb = document.createElement("div");
		newOrb.id = "orb-" + index;
		newOrb.classList.add("orb-large");
		newOrb.classList.add("orb");

		// append item element
		newOrb.appendChild(elementObj);

		// bind click action (show item element)
		newOrb.addEventListener('click', () => {

		var infoEl = document.getElementById(elementObj.id);
		var newVal = 
			 (infoEl.style.display === "none") ? "inline" : "none";
		infoEl.style.setProperty("display", newVal);
		});

		// append orb at position
		newOrb.style.setProperty("position", "absolute");

		return newOrb;
	}
					 

	getMaxDate(){
		var d = new Date();
		return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
	}	
}
