import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord} from './work/CareerInfo.js';
import {TimeLine} from './work/TimeLine.js'

var orbWidth = 15; //TODO: find a way to tie this dynamically to the css
var innerWidth = 100;
var globalConfig;
fetchFileContents("career").then((jsonContents) => {
	globalConfig = jsonContents;
	uiController.init();
});

var uiController = (function(){
	
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

			var timeline = new TimeLine(careerItemArray, orbWidth, innerWidth);
			timeline.populateTimeline();

			window.addEventListener("resize", () => timeline.reset());
		}
	}
        
})();