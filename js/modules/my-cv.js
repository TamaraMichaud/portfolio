import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord} from './career/CareerInfo.js';

var globalConfig;
fetchFileContents("career").then((jsonContents) => {
	globalConfig = jsonContents;
	uiController.init();
});

var uiController = (function(){

	return {
		init: function(){
			console.log('Starting Up');

			globalConfig.jobHistory.forEach((obj, idx, array) => {
				
				var nextJobRecord = new JobRecord(obj);
				
				if(idx === array.length -1) {
					nextJobRecord.id="oldest";
				}
				nextJobRecord.classList.add("job");
				document.getElementById("job-history").appendChild(nextJobRecord);
			})

			globalConfig.education.forEach((obj, idx, array) => {
				document.getElementById("education").appendChild(new EducationRecord(obj));
			})

			
			globalConfig.projects.forEach((obj, idx, array) => {

				var nextProject = new ProjectRecord(obj);
				nextProject.classList.add('carousel-item');				
				
				var indicatorElement = document.createElement('li');
				indicatorElement.setAttribute('data-target', '#carouselExampleIndicators');
				indicatorElement.setAttribute('data-slide-to', idx);

				if(idx === 0){
					nextProject.classList.add("active");
					indicatorElement.classList.add("active");
				}
				document.querySelector(".carousel-inner").appendChild(nextProject);
				
				document.querySelector(".carousel-indicators").appendChild(indicatorElement);
				
			});
		
		}
	}
        
})();