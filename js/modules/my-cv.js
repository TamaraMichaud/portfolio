import {fetchFileContents} from './FetchConfig.js';
import {ProjectRecord, JobRecord, EducationRecord} from './career/CareerInfo.js';
//import {ShowProject} from './career/ShowProject.js';

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
				document.getElementById("job-wrapper").appendChild(nextJobRecord);

			})

			globalConfig.education.forEach((obj, idx, array) => {
				document.getElementById("education").appendChild(new EducationRecord(obj));
			})


			globalConfig.projects.forEach((obj, idx, array) => {

				var nextProjectObj = new ProjectRecord(obj);
				var nextProjectInner = nextProjectObj.toElement();

				var nextProjectOuter = document.createElement('div');
				nextProjectOuter.id = "proj-" + nextProjectObj.id;
				nextProjectOuter.classList.add('project-overlay', 'carousel-item');
				nextProjectOuter.style.background = 'url(' + nextProjectObj.image + ')';

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


			// bind event listener to "learn more"'s
			document.querySelectorAll('.job .description span').forEach((item, idx, array) => {

				item.addEventListener('click', () => {
					$('.carousel').carousel(item.id *1);
					document.getElementById('projects-carousel').focus();

				});
			});


			document.querySelector('.to-top').addEventListener('click', () => {
				document.getElementById('div-0').scrollIntoView();
			});

			document.querySelector('#up-down-nav #up').addEventListener('click', updownNav);
			document.querySelector('#up-down-nav #down').addEventListener('click', updownNav);

			if(window.innerWidth >= 650){
				document.getElementById('div-0').scrollIntoView(true);
			}
		}
	}

})();



function updownNav(){

	var currElementIdx = this.parentNode.getAttribute('data-next') *1;
	var nextElementIdx = (this.id == 'up') ? currElementIdx - 1 : currElementIdx + 1;

	if(nextElementIdx < 0 || nextElementIdx > 3 ) {
		nextElementIdx = currElementIdx;
	}

	document.getElementById('div-' + nextElementIdx).scrollIntoView({ behaviour: 'smooth', block: 'start'});

	//	$().animate({
	//    scrollTop: $("#elementId").offset().top
	//}, 1000);


	this.parentNode.setAttribute('data-next', nextElementIdx);
}

