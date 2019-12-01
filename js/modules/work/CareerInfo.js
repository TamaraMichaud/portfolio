class CareerInfo {
	
	constructor(careerObject, objectMap) {
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
			return Date.UTC(...singleDate.split("-"));
			
		} else {
			
			var oldestDate = Date.UTC(...from.split("-"));
			var newestDate = Date.UTC(...to.split("-"));
				
			return [ oldestDate, newestDate ];
		}
	}
	
	
	asElement(){
		const propertiesList = [ "title", "subHeading", "description", "dateFrom", "dateTo"];
		if(this.extraPropertiesList) {
			propertiesList.push(...this.extraPropertiesList);
		}
		// create elements
		var nextLine = (textValue, title) => {
			var line = document.createElement("p");
			line.setAttribute("name", title);
			line.style.setProperty("color", "darkgreen");
			line.textContent = textValue;
			return line;
		}

		var wrapper = document.createElement("div");
		wrapper.classList.add("item-wrapper");
		wrapper.style.setProperty("position", "absolute");
		
		for(var nextProperty of propertiesList) {
			wrapper.appendChild(nextLine(this[nextProperty], nextProperty));	
		}
		
		return wrapper;
	}
}


export class JobRecord extends CareerInfo {

	constructor(jobConfig) {
		
		var configMap = [ "employer", "jobTitle", "description", "startDate", "endDate" ];
		super(jobConfig, configMap);
	}
	
}			


export class ProjectRecord extends CareerInfo {
	
	constructor(projectConfig) {
		var configMap = ["title", "technologies", "description", "startDate", "endDate"];
		super(projectConfig, configMap);
		this.image = projectConfig.image;
		this.linkedTo = projectConfig.linkedTo;
		this.extraPropertiesList = [ "image", "linkedTo" ];
	}

}


export class EducationRecord extends CareerInfo {
	
	constructor(educationConfig) {
		var configMap = [ "title", "languages", "description", "startDate", "endDate"];
		super(educationConfig, configMap);
		this.certificate = educationConfig.certificate;
		this.extraPropertiesList = [ "certificate" ];
	}
}

