//   CV: pdf/image, or link to LinkedIn
//        Languages: worked in
//        Projects completed: command-line helpme, selenium suite, cypress suite(s), dwt, finance app

// FRONT-END:

//      [ -------------------------- timeline ------------------------ ]
//   ^^ language; on-hover: show project img thumb								^^ full CV pdf here
//					   on-click: show project img Large								^^ linkedIn URL

// education -> starts at school, certificates for study
// career history -> job-starts
// acheivements -> projects-made / languages-used


// BACK-END:

// loadTimeline() -> read config/career.json
		
		// education, jobHistory, projects
		// foreach
		// name, start, end, title, description, image, [linked with = langaues / linkedTo]
		// order by startDate
	// place an orb on timeline, link an event

import {fetchFileContents} from './FetchConfig.js';
import {JobRecord} from './JobRecord.js';

var globalCareerInfo;
fetchFileContents("career").then((jsonContents) => {
	globalCareerInfo = jsonContents;
	uiController.init();
});


var uiController = (function(){
	
	var timeLine = document.getElementById('timeline-anchor');
	
	return {
        init: function(){
            console.log('Starting Up');
            console.log(globalCareerInfo);
			  	loadCareerHistory(timeLine);
        }
	}
        
})();

function loadCareerHistory(timeLine){
	
	var jobHistory = globalCareerInfo.jobHistory;
	for(var nextJob of jobHistory){
		
		var thisJobRecord = new JobRecord(nextJob);
		timeLine.appendChild(thisJobRecord.asElement());
	}
}


// ----
//export class JobRecord {
//	
//	constructor(jobConfig) {
//		this.employer = jobConfig.employer;
//		this.jobTitle = jobConfig.jobTitle;
//		this.description = jobConfig.description;
//		this.startDate = jobConfig.startDate;
//		this.endDate = jobConfig.endDate;
//	}
//	
//	asElement(){
//		
//		var nextLine = textValue => {
//			var line = document.createElement("p");
//			line.textContent = textValue;
//			return line;
//		}
//		
//		var wrapper = document.createElement("div");
//		wrapper.id = `job-${this.employer}`;
//		
//		wrapper.appendChild(nextLine(this.employer));
//		wrapper.appendChild(nextLine(this.jobTitle));
//		wrapper.appendChild(nextLine(this.description));
//		wrapper.appendChild(nextLine(this.startDate));
//		wrapper.appendChild(nextLine(this.endDate));
//		
//		return wrapper;
//	}
//}
//
