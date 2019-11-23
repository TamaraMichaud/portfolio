var workout = {
	name : "squats",
	reps : 20,
	sets : 5,
	calcSettings: function(){
		this.level = 'hard';
	}
	muscle-groups : [ 'legs' ],
	variations : [ 
						{
								"level" : "easy",
								"description" : ""
						},
						{
								"level" : "medium",
								"description" : "squat 1 pulse 2"
						},
						{
								"level" : "hard",
								"description" : "hands overhead; squat 1 pulse 2 squat 1 hold:5secs = 1 rep"
						}
							]
	}
	;



var newWorkoutObject = {
	populateProperties:function(){
		
		this.name = 'getthenamefromsomewhere...';
		this.reps = 5;
	}
}

newWorkoutObject.populateProperties();
//nextWrokoutObject = newWorkoutObject; 
// ^^ mm... not quite.
	
	
	