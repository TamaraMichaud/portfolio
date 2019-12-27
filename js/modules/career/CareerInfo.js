import {enlargeImage} from "../displayImageModal.js";

class CareerInfo {

	constructor(type, careerObject, objectMap) {
		this.type = type;
		this.title = careerObject[objectMap[0]];
		this.subHeading = careerObject[objectMap[1]];
		this.description = careerObject[objectMap[2]];
		this.dateFrom = careerObject[objectMap[3]];
		this.dateTo = careerObject[objectMap[4]];
	}


	toElement(extraElement){
		// Title - subheading
		// description
		// (other infos)
		// datefrom - dateto

					
		var wrapper = getWrapperAndHeader(this, []);

		var wFooter = newDiv(['footer']);
		var dateText = "";
		if(this.dateFrom == "" || this.dateTo == "") {
			dateText = this.dateFrom + this.dateTo;
		} else {
			dateText = this.dateFrom + '&nbsp; - &nbsp;' + this.dateTo;
		}

		wFooter.appendChild(nextLine(dateText, 'dates'));

		var wBody = buildBody(this.description, this.title);

		if(extraElement) {
					wBody.appendChild(extraElement);
		}

		if(wBody.hasChildNodes()) { 
			wrapper.appendChild(wBody);
		}
		wrapper.appendChild(wFooter);

		return wrapper;
	}

}


export class JobRecord extends CareerInfo {

	//employer -   datef/datet
	//title
	//description

	constructor(jobConfig) {

		var configMap = [ "employer", "jobTitle", "description", "startDate", "endDate" ];
		super("job", jobConfig, configMap);
		
		return this.toElement();
	}

}			


export class ProjectRecord extends CareerInfo {

	constructor(projectConfig) {
		var configMap = ["title", "technologies", "description", "startDate", "endDate"];
		var tech = projectConfig.technologies.toString().replace(/,/g, ' &#9679 ');
		projectConfig.technologies = tech;
		super("project", projectConfig, configMap);

		this.id = projectConfig.id;
		this.image = projectConfig.image;
	}
}


export class EducationRecord extends CareerInfo {

	constructor(educationConfig) {
		var configMap = [ "title", "languages", "description", "startDate", "endDate"];
		super("education", educationConfig, configMap);
		
		if(educationConfig.certificate) {
			var mainCertDiv = newDiv(['cert-outer']);
			var imageDiv = buildImageElement(educationConfig.certificate, "Certificate of Acheivement");

			var tech = '&#9679 ' + educationConfig.languages.toString().replace(/,/g, '<br>&#9679 ');
			var languagesDiv = newDiv(['cert-langs']);
			languagesDiv.innerHTML = tech;
			mainCertDiv.appendChild(languagesDiv);
			mainCertDiv.appendChild(imageDiv);
				
			this.element = mainCertDiv;
		} else {
			this.element = this.school(this);
		}
		return this.element; //asElement();
	}

	school(mainObj){
		
		var wrapper = getWrapperAndHeader(mainObj, []);
		var wBody = buildBody(mainObj.description, mainObj.title);
		wrapper.appendChild(wBody);
		return wrapper;
	}
	
}


function buildImageElement(location, title){
	var wrapper = document.createElement("div");
	wrapper.classList.add("img");
	var img = document.createElement("img");
	img.setAttribute("src", location);
	img.setAttribute("title", title);
	img.addEventListener('click', enlargeImage);
	wrapper.appendChild(img);
	return wrapper;
}

function nextLine(textValue, title) {
	var line = newDiv();
	line.setAttribute("class", title);
	//			line.style.setProperty("display", display);
	line.innerHTML = textValue;
	return line;
}

function newDiv(classList) {
	var tmpDiv = document.createElement("div");
	if(classList) {
		tmpDiv.classList.add(...classList);
	}
	return tmpDiv;
}

function getWrapperAndHeader(obj, classList){
	var wrapper = newDiv(['item-wrapper', obj.type, ...classList]);
	//		wrapper.style.setProperty("position", "absolute");

	var wHeader = newDiv(["header"]);
//	wHeader.style.setProperty("display", 'block');

	wHeader.appendChild(nextLine(obj.title, 'title'));
	if(obj.subHeading !== "") {
		wHeader.appendChild(nextLine(obj.subHeading, 'subHeading'));
	}
	wrapper.appendChild(wHeader);

	return wrapper;
}

function buildBody(description, title) {
	var wBody = newDiv(['body']);
	wBody.id = title;
	if(description !== "") {

		wBody.appendChild(nextLine(description, 'description'));
	}
	return wBody;
}