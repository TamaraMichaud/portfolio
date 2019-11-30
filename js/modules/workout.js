import {AddEditModal} from './AddEditModal.js';

var globalExercisesConfig;
fetchFileContents("exercises");
//
//function getElement(elementId){
//	return document.getElementById(elementId);
//}
//
//function findElement(identifier){
//	return document.querySelector(identifier);
//}
//

//// --- UI Controller --- //
var workoutUiController = (function(){
   
    var workoutPageIds = {
            main: {
                addNew: 'add',
                editEx: 'edit',
                getWorkout: 'workout'
            },
            addedit: {
                wrapper: 'addedit',
                dropdown: 'addedit-select',
                inputs: 'addedit-inputs',
                variations: 'addedit-variations-'
            },
            workout: {
                filters: 'workout-inputs',
                workout: 'workout-details'
            }
    };

    var addEditModal = new AddEditModal(workoutPageIds.addedit);

    return {
            // show the Add/Edit pane
         displayAddEdit: function(addOrEdit){
				//hide workouts info
document.getElementById(workoutPageIds.workout.filters).style = 'display:none';
             addEditModal.showHide('block');
             if(addOrEdit === 'edit') {
                 console.log("clicked Edit, display dropdown");
                 addEditModal.displayEditDropdown();
             } else {
                 console.log("clicked New, display inputs");
                 addEditModal.displayInputs(globalExercisesConfig.exerciseTemplate);
             }
         },
        
        displayAddEditInputs: function(exerciseName){
			   var selectedAnExercise = addEditModal.getSelectedExercise();
			   var theExercise = globalExercisesConfig.exerciseTemplate;
			   if(selectedAnExercise != 'select an exercise') {	
					// get the exercise object that matches this name
        			var exInd = globalExercisesConfig.exercises
										.findIndex((nextEx) => {
												return nextEx.name === selectedAnExercise;
					  				});
					theExercise = globalExercisesConfig.exercises[exInd];
				}
			   console.log(theExercise);
            addEditModal.displayInputs(theExercise);
        },
        
        getAddEditModal: function(){

            return addEditModal;
        },
            // show the CreateNewWorkout pane
         displayCreateWorkout: function(){
        //      hide addEditModal
				addEditModal.showHide('none');
        //      display createNewWorkout pane
				document.getElementById(workoutPageIds.workout.filters).style = 'display:block';
        // ------ make this a permanent feature, and the AddEdit is a modal window... ------- //
				console.log("showing workout selection?");
         },
        
            // (re-)populate exercises dropdown
        // populateExercisesList: function(exercisesList, dropdownId){
        //  
        // },
        
            // retreive the values intered in CreateWorkout() pane
        // getWorkoutFilterOptions: function(){
        //      return the values entered into displayCreateWorkout()
        //},
        
            // prepare the workout!
        // prepareWorkout: function(){
        //      print the filtered workouts list into a workout "page" with a timer img and a START/PAUSE/STOP button...  (result of getWorkoutFilterOptions())
        //      bind function to allow user to Do a workout (hit start/stop/pause button)
        //  (future, allow option to swap out exercises etc)
        //}
        
//             retreive the workoutPageIds object
         getWorkoutPageIds: function(){
             return workoutPageIds;
         }
        
    }
    
})();


// --- Data Controller --- /

var workoutDataController = (function(){
    
    return {
        loadInitialData: async function(dropdownElement){
            loadExercisesDropdown(globalExercisesConfig['exercises'], dropdownElement);
            console.log("...config loaded? " + globalExercisesConfig);
        }
//        ,

            // set new/editted exercise information into memory
        // createUpdateExercises:  function(){
            // overwrite the json config file
            // reload exercises config
            // mail corrected config file for PR request into project  //TODO: investigate whether i have any other options here; create PR directly || print to/read-from OneDrive(?)
        //},
        
            // filter exercises list by workout selection criteria
        // filterExercises: function(filterCriteria){
        //   // loop exercisesConfig["exercises"]  
        //   // return filtered list
        // } 
          
        
    }
    
})();


// --- Main Page Controller --- //

var controller = (function(dataCtrl, UICtrl){
    
    return {
        init: function(){
            dataCtrl.loadInitialData(UICtrl.getAddEditModal().dropdown);
            console.log('Starting Up');
            bindEventListeners(UICtrl);
        }
    }
        
})(workoutDataController, workoutUiController);


// ---------------------------------------------------------------------------------- //

var Exercise = function(name, variations, muscleGroups, types){
    this.name = name;
    this.variations = [ /* array of VARiATION objects */ ];
    this.muscleGroups = muscleGroups;
    this.types = types;    
}
Exercise.prototype.loadAddEdit = function(inputsRootId){
    var nameElement = document.querySelector(`#${inputsRootId} #name`);
    nameElement.innerHTML = "exercise name goes here";   
    nameElement.setAttribute('placeholder', "exercise name goes here");   
}

var Variation = function(){
	this.name = "easy";
	this.desc = "";
	this.reps = "";
	this.sets = "";
}





var Workout = function(filterOptions) {

//     this.exercises = [];
//     this.duration = filterOptions.duration;
//     this.level = filterOptions.level;
    // optional: muscle-groups / types
    
}
Workout.prototype.loadWorkout = function(exercisesList){
    //iterate exercisesList
        //if item matches filterOptions criteria,
            //this.exercises.push(item)
};
// ^^ this is not right.  nor is the Exercises one.  this should be a method of the main controller (or even the ui controller maybe...)







async function fetchFileContents(fileName){
                            
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var urlPath = urlPathStart + projectDir + "/config/";

    console.log("Reading contents of config file: " + fileName)
    var rawResults = await fetch(urlPath + fileName + ".json");
    var jsonContents = await rawResults.json();
    
    globalExercisesConfig = jsonContents;
    controller.init();    
};


function loadExercisesDropdown(exercisesArray, dropdownElement){
    
    console.log("Loading Dropdown: " + dropdownElement + ", with " + exercisesArray);
    
    var tmpCreateOption = (value) => {
        var optionElement = document.createElement('option');
        optionElement.name = optionElement.textContent = value;
        dropdownElement.appendChild(optionElement);
    }
    tmpCreateOption('select an exercise');

    exercisesArray.forEach(nextExercise => {
        tmpCreateOption(nextExercise.name);
    })
}






// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---- WIP -------------------- //




// bind event listeners to buttons
function bindEventListeners(uiCtrl) {

    var pageIdStrings = uiCtrl.getWorkoutPageIds();

    //TOGGLE VISIBILITY:
    
    // show "add new exercise"
   document.getElementById(pageIdStrings.main.addNew).addEventListener('click', function(){
            uiCtrl.displayAddEdit('new');
    });

    // show "edit existing exercise"
    document.getElementById(pageIdStrings.main.editEx).addEventListener('click', function(){
            uiCtrl.displayAddEdit('edit');
    });
    
    // pre-populate exercise inputs with selected exercise info
    document.getElementById(pageIdStrings.addedit.dropdown).addEventListener('change', function(){
        uiCtrl.displayAddEditInputs();
    });
    
    // save exercise
    ///////////////////////////
    /////////////////////////// addEditModal needs a "save/cancel" button
    
    // show "create a new workout"
    document.getElementById(pageIdStrings.main.getWorkout).addEventListener('click', function(){
           uiCtrl.displayCreateWorkout();
    });
//        // start new workout
//        document.getElementById('').addEventListener('click', function(){
//                console.log("NEED TO BIND THIS TO CREATENEWWORKOUT/GO ... AND start the workout");
//        });
}