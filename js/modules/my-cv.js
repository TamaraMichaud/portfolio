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
				
				document.querySelector(".job-history").appendChild(new JobRecord(obj));
			})

			globalConfig.education.forEach((obj, idx, array) => {
				var selector = ".education";
//				if(obj.certificate) {
//					selector = ".certs";
//				}
				document.querySelector(selector).appendChild(new EducationRecord(obj));
			})

			
			
//			eduItems.forEach((obj, idx, array) => {
//				
//				document.querySelector(".education").appendChild(obj.element);
//			})
console.log("ok now what?");
//console.log(careerItemArray);
//console.log(careerItemArray[2].element);
//			careerItemArray.forEach((obj, idx, array) =>{
//				
//				switch (obj.ref) {
//					case "job" :			
//						document.querySelector(".job-history").appendChild(obj.element);
//						break;
//					case "education" :
//						document.querySelector(".education").appendChild(obj.element);
//						break;
//				}
//			})
//			
			
		
		}
	}
        
})();