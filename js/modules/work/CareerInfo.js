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
	
	// Title - subheading
	// description
	// datefrom - dateto
	// other infos
	asElement(){
		const propertiesList = [ "title", "subHeading", "description", "dateFrom", "dateTo"];
		// create elements
		var nextLine = (textValue, title) => {
			var line = document.createElement("div");
			line.setAttribute("name", title);
			line.style.setProperty("display", "inline");
			line.innerHTML = textValue;
			return line;
		}

		var elemArray = []
		for(var nextProperty of propertiesList){
			elemArray.push(nextLine(this[nextProperty], nextProperty));
		}
		
		var wrapper = document.createElement("div");
		wrapper.classList.add("item-wrapper");
		wrapper.classList.add(this.type);
		wrapper.style.setProperty("position", "absolute");

		var wrapperHeader = document.createElement("div");
		wrapperHeader.classList.add('header');
		wrapperHeader.appendChild(elemArray[0]);
		if(elemArray[1].innerHTML != "") {
			wrapperHeader.appendChild(elemArray[1]);
		}
		var wrapperDates = document.createElement("div");
		wrapperDates.classList.add('footer');
		wrapperDates.appendChild(elemArray[3]);
		wrapperDates.appendChild(nextLine('&nbsp; - &nbsp;', "spacer"));	
		wrapperDates.appendChild(elemArray[4]);

		wrapper.appendChild(wrapperHeader);
		elemArray[2].style.setProperty("display", "block")
		wrapper.appendChild(elemArray[2]);
	
		if(this.extraPropertiesList) {
			for(var nextProperty of this.extraPropertiesList) {
				if(this[nextProperty] != "") {
					console.log(nextProperty);
					console.log(this[nextProperty]);
					if(typeof(this[nextProperty]) === "string" || this[nextProperty] === undefined) {
						wrapper.appendChild(nextLine(this[nextProperty], nextProperty));	
					} else {
						wrapper.appendChild(this[nextProperty]);	
					}
				}
			}
		}

		wrapper.appendChild(wrapperDates);
			
		return wrapper;
	}
}


export class JobRecord extends CareerInfo {

	constructor(jobConfig) {
		
		var configMap = [ "employer", "jobTitle", "description", "startDate", "endDate" ];
		super("job", jobConfig, configMap);
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
	wrapper.appendChild(img);
	return wrapper;
}


