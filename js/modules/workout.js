// data controller


var Workout = function(name, level){
    this.name = name;
    this.level = level;
}
Workout.prototype.getDetails = function(workoutsConfig){
//    this.reps = workoutsConfig[this.id]
}

var nextWorkout = new Workout(32, 'easy');






{
"name" : "squats",
"reps" : 20,
"sets" : 5, 
"muscle-groups" : [ "legs" ],
"variations" : [ 
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


var newWorkoutObject = {
	populateProperties:function(){
		
		this.name = 'getthenamefromsomewhere...';
		this.reps = 5;
	}
}

newWorkoutObject.populateProperties();
//nextWrokoutObject = newWorkoutObject; 
// ^^ mm... not quite.
	
	
	


/////////////////////////// OBJECTS:  PROTOTYPES & INHERITANCE!  LET'S DO IT PROPERLY

// if we re-design the Person prototype:

var Person = function(name, yearOfBirth, job){
    
                    this.name = name;
                    this.yearOfBirth = yearOfBirth;
                    this.job = job;

            }
Person.prototype.sayHello = function(){
                        console.log("Hello you!");
                            }
                    
var john = new Person('John', 1990, 'teacher');

console.log("JOHN is a: " + john.job);
john.sayHello();