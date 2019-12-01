export class JobRecord {
	
	constructor(jobConfig) {
		this.employer = jobConfig.employer;
		this.jobTitle = jobConfig.jobTitle;
		this.description = jobConfig.description;
		this.startDate = jobConfig.startDate;
		this.endDate = jobConfig.endDate;
	}
	
	asElement(){
		
		var nextLine = textValue => {
			var line = document.createElement("p");
			line.textContent = textValue;
			return line;
		}
		
		var wrapper = document.createElement("div");
		wrapper.id = `job-${this.employer}`;
		
		wrapper.appendChild(nextLine(this.employer));
		wrapper.appendChild(nextLine(this.jobTitle));
		wrapper.appendChild(nextLine(this.description));
		wrapper.appendChild(nextLine(this.startDate));
		wrapper.appendChild(nextLine(this.endDate));
		
		return wrapper;
	}
}
