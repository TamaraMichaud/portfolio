import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord, TimeRecord} from './career/CareerInfo.js';
import {TimeLine} from './career/TimeLine.js'

var orbWidth = 15; //TODO: find a way to tie this dynamically to the css
var innerWidth = 100;
var globalConfig;
fetchFileContents("career").then((jsonContents) => {
	globalConfig = jsonContents;
	uiController.init();
});

var uiController = (function(){
	
	var careerItemArray = [];
	
	function addNextItem(nextItem) {
		
		careerItemArray.push({ 
			ref: nextItem.orderPosition,
			element: nextItem.asElement()
									});

	}
	
	function buildItemArray(itemList, ClassObject) {
	

		if(typeof(itemList) !== "string") {
			for (var nextItem of itemList ){
				var thisItem = new ClassObject(nextItem);
				addNextItem(thisItem);
			}
		} else {
			var thisItem = new ClassObject(itemList);
			addNextItem(thisItem);
		}
	}

	return {
		init: function(){
			console.log('Starting Up');

			// create an array of elements & their "value"
			buildItemArray(globalConfig.jobHistory, JobRecord);
			buildItemArray(globalConfig.projects, ProjectRecord);
			buildItemArray(globalConfig.education, EducationRecord);
			buildItemArray('', TimeRecord);
	
			var timeline = new TimeLine(careerItemArray, orbWidth, innerWidth);
			timeline.populateTimeline();

			window.addEventListener("resize", () => timeline.reset());
		}
	}
        
})();