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


	toElement(){
		// Title - subheading
		// description
		// (other infos)
		// datefrom - dateto

					
		var wrapper = getWrapperAndHeader(this, ["col", "col-4", "col-lg-4", "col-md-12", "col-sm-12"]);

		var wFooter = newDiv(['footer']);
		var dateText = "";
		if(this.dateFrom == "" || this.dateTo == "") {
			dateText = this.dateFrom + this.dateTo;
		} else {
			dateText = this.dateFrom + '&nbsp; - &nbsp;' + this.dateTo;
		}

		wFooter.appendChild(nextLine(dateText, 'dates'));

		var wBody = buildBody(this.description, this.title);

		if(this.extraPropertiesList) {
			for(var nextProperty of this.extraPropertiesList) {
				var nextVal = this[nextProperty];
				if(nextVal != "") {

					var bodyChild;

					if(typeof(nextVal) === "string" || nextVal === undefined) {
						bodyChild = nextLine(nextVal, nextProperty);	
					} else {
						bodyChild = this[nextProperty];	
					}
					wBody.appendChild(bodyChild);
				}
			}
		}

//		wrapper.appendChild(wHeader);
		if(wBody.hasChildNodes()) { 
			//			wBody.style.setProperty("display", "none");
			wrapper.appendChild(wBody);
			//			wrapper.addEventListener('mouseover', () =>{
			//				document.getElementById(this.title).style.setProperty("display", "block");
			//				
			//			});
			//			wrapper.addEventListener('mouseout', () =>{
			//				document.getElementById(this.title).style.setProperty("display", "none");
			//				
			//			});

		};
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
		super("project", projectConfig, configMap);
		this.image = buildImageElement(projectConfig.image, "Project Collage");
		this.linkedTo = projectConfig.linkedTo;
		this.extraPropertiesList = [ "image", "linkedTo" ];
	}
}


export class EducationRecord extends CareerInfo {

	constructor(educationConfig) {
		var configMap = [ "title", "languages", "description", "startDate", "endDate"];
		super("education", educationConfig, configMap);
		
		if(educationConfig.certificate) {
			this.element = buildImageElement(educationConfig.certificate, "Certificate of Acheivement");
			//			this.certificate = buildImageElement(educationConfig.certificate, "Certificate of Acheivement");
			//		   this.extraPropertiesList = [ "certificate" ];

			//			this.element = 
		} else {
			this.element = this.school(this);
			console.log("School is: ")
//			console.log(this.element);
		}
		console.log("cert or school?");
		console.log(this.element);
		
		return this.element; //asElement();
	}

	school(mainObj){
		
		var wrapper = getWrapperAndHeader(mainObj, []);
		var wBody = buildBody(mainObj.description, mainObj.title);
//		wBody.appendChild(nextLine(mainObj.description, 'description', 'block'));
//		console.log(mainObj.description);
		wrapper.appendChild(wBody);
		return wrapper;
	}
	
//	asElement() {
//		
//     return getWrapperAndHeader(this);
//	}



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
	wHeader.style.setProperty("display", 'block');

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