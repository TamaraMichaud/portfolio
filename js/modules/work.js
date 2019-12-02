import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord} from './work/CareerInfo.js';

var globalConfig;
fetchFileContents("career").then((jsonContents) => {
	globalConfig = jsonContents;
	uiController.init();
});


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
			var d = new Date();
			var maxDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
			var refArray = [];
			var minDate = maxDate;
			// we grab all the dates and print a div per 0^10
			careerItemArray.forEach(a => {
				var refValue = (Array.isArray(a.ref)) ? a.ref[0] : a.ref;
				minDate = (refValue > minDate) ? minDate : refValue;
				refArray.push(refValue);
			});
			refArray.push(maxDate);

			var tlH = timeLine.getBoundingClientRect();
		  	var tlW = timeLine.clientWidth / (refArray.length - 1);
//		  console.log(`tlh: top: ${tlH.top}, bottom: ${tlH.bottom}`)
//		  
//		  console.log(`${tlH.top + ((tlH.bottom - tlH.top) / 2)}px`)
		   var leftPos = 0; 
			refArray.forEach((ref, index) =>  {

				var item = careerItemArray[index];
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
				newOrb.style.setProperty("top", `${tlH.top - 49.5}px`);
				newOrb.style.setProperty("left", `${leftPos}px`);
				leftPos += tlW;
				
				timeLine.appendChild(newOrb);
				
				
//				console.log(`appending to ${timeLine.id} the positions of left ${leftPos}px. Top is... ${document.getElementById(newOrb.id).getAttribute("top")}?`);
			});

		  //TODO: push one final orb for "today", only the date in it.
		  
	  }
	}
        
})();




