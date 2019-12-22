import {enlargeImage} from "../displayImageModal.js";

class CareerInfo {
	
	constructor(type, careerObject, objectMap) {
		this.type = type;
		this.title = careerObject[objectMap[0]];
		this.subHeading = careerObject[objectMap[1]];
		this.description = careerObject[objectMap[2]];
		this.dateFrom = careerObject[objectMap[3]];
		this.dateTo = careerObject[objectMap[4]];
		this.orderPosition = this.calculatePosition();
	}
	
	
	calculatePosition(){
		
		var from = this.dateFrom;
		var to = this.dateTo;
		if (from === "" || to === "" || from === to) {
		
			var singleDate = (from === "" ) ? to : from;
			// convert this into a timestamp value
			return Date.UTC(...(singleDate.split("/")).reverse());
			
		} else {
			
			var oldestDate = Date.UTC(...(from.split("/")).reverse());
			var newestDate = Date.UTC(...(to.split("/")).reverse());
			return [ oldestDate, newestDate ];
		}
	}
	

	asElement(){
		// Title - subheading
		// description
			// (other infos)
		// datefrom - dateto

		var nextLine = (textValue, title, display) => {
			var line = newDiv();
			line.setAttribute("name", title);
			line.style.setProperty("display", display);
			line.innerHTML = textValue;
			return line;
		}
		
		var newDiv = (classList) => {
			var tmpDiv = document.createElement("div");
			if(classList) {
				tmpDiv.classList.add(...classList);
			}
			return tmpDiv;
		}

		var wrapper = newDiv(['item-wrapper', this.type]);
		wrapper.style.setProperty("position", "absolute");

		var wHeader = newDiv(["header"]);
		wHeader.style.setProperty("display", 'block');
		
		wHeader.appendChild(nextLine(this.title, 'title', 'inline'));
		if(this.subHeading !== "") {
			wHeader.appendChild(nextLine(this.subHeading, 'subHeading', 'inline'));
		}

		var wFooter = newDiv(['footer']);
		var dateText = "";
		if(this.dateFrom == "" || this.dateTo == "") {
			dateText = this.dateFrom + this.dateTo;
		} else {
			dateText = this.dateFrom + '&nbsp; - &nbsp;' + this.dateTo;
		}
		
		wFooter.appendChild(nextLine(dateText, 'dates'));

		var wBody = newDiv(['body']);
		wBody.id = this.title;
		if(this.description !== "") {
			
			wBody.appendChild(nextLine(this.description, 'description', 'block'));
		}
	
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
		
		wrapper.appendChild(wHeader);
		if(wBody.hasChildNodes()) { 
			wBody.style.setProperty("display", "none");
			wrapper.appendChild(wBody);
			wrapper.addEventListener('mouseover', () =>{
				document.getElementById(this.title).style.setProperty("display", "block");
				
			});
			wrapper.addEventListener('mouseout', () =>{
				document.getElementById(this.title).style.setProperty("display", "none");
				
			});

		};
		wrapper.appendChild(wFooter);
			
		return wrapper;
	}
	
	
	toElement(){
		// Title - subheading
		// description
			// (other infos)
		// datefrom - dateto

		var nextLine = (textValue, title, display) => {
			var line = newDiv();
			line.setAttribute("class", title);
//			line.style.setProperty("display", display);
			line.innerHTML = textValue;
			return line;
		}
		
		var newDiv = (classList) => {
			var tmpDiv = document.createElement("div");
			if(classList) {
				tmpDiv.classList.add(...classList);
			}
			return tmpDiv;
		}

		var wrapper = newDiv(['item-wrapper', this.type]);
//		wrapper.style.setProperty("position", "absolute");

		var wHeader = newDiv(["header"]);
		wHeader.style.setProperty("display", 'block');
		
		wHeader.appendChild(nextLine(this.title, 'title', 'inline'));
		if(this.subHeading !== "") {
			wHeader.appendChild(nextLine(this.subHeading, 'subHeading', 'inline'));
		}

		var wFooter = newDiv(['footer']);
		var dateText = "";
		if(this.dateFrom == "" || this.dateTo == "") {
			dateText = this.dateFrom + this.dateTo;
		} else {
			dateText = this.dateFrom + '&nbsp; - &nbsp;' + this.dateTo;
		}
		
		wFooter.appendChild(nextLine(dateText, 'dates'));

		var wBody = newDiv(['body']);
		wBody.id = this.title;
		if(this.description !== "") {
			
			wBody.appendChild(nextLine(this.description, 'description', 'block'));
		}
	
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
		
		wrapper.appendChild(wHeader);
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
	}
	
}			


export class TimeRecord extends CareerInfo {

	constructor(){
		const propertiesList = [ "title", "subHeading", "description", "dateFrom", "dateTo"];
		
		var timeObj = {};
		propertiesList.forEach(propName => {
			timeObj[propName] = "";
		});
		var now = new Date();
		timeObj.title = now.toGMTString();
		timeObj.dateFrom = now.toLocaleDateString();
		super("date", timeObj, propertiesList);
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
			this.certificate = buildImageElement(educationConfig.certificate, "Certificate of Acheivement");
		   this.extraPropertiesList = [ "certificate" ];
		}
	}
}


function buildImageElement(location, title){
	var wrapper = document.createElement("div");
	wrapper.classList.add("thumb");
	var img = document.createElement("img");
	img.setAttribute("src", location);
	img.setAttribute("title", title);
    img.addEventListener('click', enlargeImage);
	wrapper.appendChild(img);
	return wrapper;
}

