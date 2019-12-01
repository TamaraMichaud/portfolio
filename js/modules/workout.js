import {getElement} from './elementSeeker.js';
import {AddEditModal} from './AddEditModal.js';
import {CreateWorkout} from './CreateWorkout.js';
import {fetchFileContents} from './FetchConfig.js';

var globalExercisesConfig;
fetchFileContents("exercises").then((jsonContents) => {
	 globalExercisesConfig = jsonContents;
    controller.init();
});

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
                filters: 'workout-filter',
                details: 'workout-details',
					 load: 'create-workout',
					 start: 'start-workout'
            }
    };

    var addEditModal = new AddEditModal(workoutPageIds.addedit);
	 var createWorkout = new CreateWorkout(workoutPageIds.workout);

    return {
            // show the Add/Edit pane
         displayAddEdit: function(addOrEdit){
				//hide workouts info
				 createWorkout.showHide('none');
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
			  	createWorkout.showHide('block');
	
        // ------ make this a permanent feature, and the AddEdit is a modal window... ------- //
				console.log("showing workout selection?");
         },
		 
		 loadWorkout: function(){
			 createWorkout.loadWorkout();
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


// -------------------------------------------------------- //
// -------------------------------------------------------- //

//async function fetchFileContents(fileName){
//                            
//    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
//    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
//    var urlPath = urlPathStart + projectDir + "/config/";
//
//    console.log("Reading contents of config file: " + fileName)
//    var rawResults = await fetch(urlPath + fileName + ".json");
//    var jsonContents = await rawResults.json();
//    
//    globalExercisesConfig = jsonContents;
//    controller.init();    
//};


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


// bind event listeners to buttons
function bindEventListeners(uiCtrl) {

    var pageIdStrings = uiCtrl.getWorkoutPageIds();

    //TOGGLE VISIBILITY:
    
    // show "add new exercise"
    getElement(pageIdStrings.main.addNew).addEventListener('click', function(){
            uiCtrl.displayAddEdit('new');
    });

    // show "edit existing exercise"
    getElement(pageIdStrings.main.editEx).addEventListener('click', function(){
            uiCtrl.displayAddEdit('edit');
    });
    
    // pre-populate exercise inputs with selected exercise info
    getElement(pageIdStrings.addedit.dropdown).addEventListener('change', function(){
        uiCtrl.displayAddEditInputs();
    });
    
    // save exercise
    ///////////////////////////
    /////////////////////////// addEditModal needs a "save/cancel" button
    
    // show "create a new workout"
    getElement(pageIdStrings.main.getWorkout).addEventListener('click', function(){
           uiCtrl.displayCreateWorkout();
    });
	
	 // start new workout
	 getElement(pageIdStrings.workout.load).addEventListener('click', function(){
		  //hide filter
		  // show workout
		  uiCtrl.loadWorkout();
	 });
}