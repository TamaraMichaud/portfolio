import {getElement} from './elementSeeker.js';

export class CreateWorkout {
//	this.workoutExercises = [];
	constructor(workoutFilterIds, exercisesList){
		this.fullExercisList = exercisesList;
		this.filterMain = getElement(workoutFilterIds["filters"]);
		this.detailsMain = getElement(workoutFilterIds["details"])
	}
	
	showHide(showOrHide){
		this.filterMain.style = `display:${showOrHide}`;
	}
	
	loadWorkout(filterOptions, fullexerciseList){
		this.filterMain.style ='display:none';
		
		// calculate exercise list
		console.log(filterOptions);
		console.log(fullexerciseList);
		// load list into page
		
		
		this.detailsMain.style = 'display:block';
	}
	
}

/* workoutFilter
	-> level
	-> duration 
	(v2 -> muscle-groups / types)
	-> calculateWorkoutDetails(filter, exercisesList)
	
	workoutDetails
	-> finalExercisesList
	-> totalTime
	-> start workout
	
	*/