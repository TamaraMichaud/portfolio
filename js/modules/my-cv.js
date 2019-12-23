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
				
				nextJobRecord.id = (idx === array.length - 1) ? "oldest" : "job-" + idx;
				nextJobRecord.classList.add("job");
				document.getElementById("job-history").appendChild(nextJobRecord);
			})

			globalConfig.education.forEach((obj, idx, array) => {
				document.getElementById("education").appendChild(new EducationRecord(obj));
			})

			
			globalConfig.projects.forEach((obj, idx, array) => {

				var nextProjectObj = new ProjectRecord(obj);
				var nextProjectInner = nextProjectObj.toElement();
				
				var nextProjectOuter = document.createElement('div');
				nextProjectOuter.classList.add('project-overlay');
				nextProjectOuter.classList.add('carousel-item');
				nextProjectOuter.style.background = 'url(' + nextProjectObj.image + ') center center no-repeat';
				
				nextProjectOuter.appendChild(nextProjectInner);
				
				var indicatorElement = document.createElement('li');
				indicatorElement.setAttribute('data-target', '#carouselContents');
				indicatorElement.setAttribute('data-slide-to', idx);

				if(idx === 0){
					nextProjectOuter.classList.add("active");
					indicatorElement.classList.add("active");
				}
				document.querySelector(".carousel-inner").appendChild(nextProjectOuter);
				
				document.querySelector(".carousel-indicators").appendChild(indicatorElement);
				
			});
		
		}
	}
        
})();