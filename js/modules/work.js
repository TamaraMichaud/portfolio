import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord} from './work/CareerInfo.js';

var orbWidth = 7; //TODO: find a way to tie this dynamically to the css
var innerWidth = 100;
var globalConfig;
fetchFileContents("career").then((jsonContents) => {
	globalConfig = jsonContents;
	uiController.init();
});


//body.addEventListener("resize", positionOrbs);

var uiController = (function(){
	
	var timeLine = document.getElementById('timeline');
	var careerItemArray = [];
	
	function buildItemArray(itemList, ClassObject) {
	
		for (var nextItem of itemList ){
			var thisItem = new ClassObject(nextItem);
			careerItemArray.push({ ref: thisItem.orderPosition,
										  element: thisItem.asElement()
										});
		}
	}

	return {
	  init: function(){
			console.log('Starting Up');
		  
		  // create an array of elements & their "value"
			buildItemArray(globalConfig.jobHistory, JobRecord);
			buildItemArray(globalConfig.projects, ProjectRecord);
			buildItemArray(globalConfig.education, EducationRecord);
		  
console.log(careerItemArray);
		  
		  // get a list of timestamp values
			
			var orderedRefsArray = [];
		   var maxDate = getMaxDate();
			var minDate = maxDate;
			// we grab all the dates and print a div per 0^10
			careerItemArray.forEach(a => {
				var refValue = (Array.isArray(a.ref)) ? a.ref[0] : a.ref;
				minDate = (refValue > minDate) ? minDate : refValue;
				orderedRefsArray.push(refValue);
			});
			orderedRefsArray.push(maxDate);
console.log(orderedRefsArray.sort((a,b)=>a-b));
			var tlH = timeLine.getBoundingClientRect().top - 49;
		  	var tlW = (timeLine.clientWidth - orbWidth)  / (orderedRefsArray.length - 1);
		  
		   var leftPos = 0; 
		   var innerYRef = 0;
		   var innerXRef = 0;
			orderedRefsArray.forEach((ref, index, fullArray) =>  {
console.log("REF: " + ref);
				var item = careerItemArray.find(obj => {
var arrayitemref = (Array.isArray(obj.ref)) ? obj.ref[0] : obj.ref;
				console.log("matches " + arrayitemref + "?");
														  
														 return arrayitemref === ref});
console.log("ref:");
console.log(item);
				//create orb,
				var newOrb = document.createElement("div");
				newOrb.id = "orb-" + index;
				newOrb.classList.add("orb");

				// set item element invisible
				var elementObj;
				if(item) {
					elementObj = item.element;
				} else {
					elementObj = document.createElement("div");
					elementObj.textContent = "TODAYS DATE";
				}
				elementObj.id = "info-" + index;
				elementObj.style.setProperty("display", "none");
				elementObj.classList.add(`pos-${innerYRef}`);
				// append item element
	
				newOrb.appendChild(elementObj);

				// bind click action (show item element)
				newOrb.addEventListener('click', () => {

					var infoEl = document.getElementById(elementObj.id);
					var currVal = infoEl.style.display;
					var newVal = (currVal === "none") ? "inline" : "none";

					infoEl.style.setProperty("display", newVal);
				});

				// append orb at position
				newOrb.style.setProperty("position", "absolute");
				newOrb.style.setProperty("top", `${tlH}px`);
				newOrb.style.setProperty("left", `${leftPos}px`);
				
				timeLine.appendChild(newOrb);
				
				leftPos += tlW;
				innerYRef = (innerYRef === 2) ? 0 : ++innerYRef;
				innerXRef -= innerWidth  / (fullArray.length - 1);
				
				var innerElem = document.getElementById(elementObj.id);
				innerElem.style.left = `${innerXRef}px`;

			});
	  
	  }
	}
        
})();



function getMaxDate(){
	var d = new Date();
	return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}
