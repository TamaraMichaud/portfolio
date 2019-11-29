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
                variations: 'addedit-variations'
            },
            workout: {
                alltheelementsrequiredtoceateanewworkout: 'WIP ##################################'
            }
    };

    return {
            // show the Add/Edit pane
         displayAddEdit: function(addOrEdit){
               showAddEdit(addOrEdit, workoutPageIds.addedit);
         },
        
            // show the CreateNewWorkout pane
        // displayCreateWorkout: function(){
        //
        // },
        
            // (re-)populate exercises dropdown
        // populateExercisesList: function(exercisesList, dropdownId){
        //  
        // },
        
            // retreive the values intered in CreateWorkout() pane
        // getWorkoutFilterOptions: function(){
        //      return the values entered into displayCreateWorkout()
        //      use them to filter the list of exercises
        
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
    
    var exercisesConfig = fetchFileContents("exercises");

    return {

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
        // }  ,
          
            // retreive the exercisesConfig object
         getExercisesConfig: function(){
             return exercisesConfig;
        }
        
      }
    
});


// --- Main Page Controller --- //

var controller = (function(dataCtrl, UICtrl){

    
    
  // -- -- //   
    return {
        init: function(){
            console.log('Starting Up');
            loadExercisesDropdown(UICtrl.getWorkoutPageIds().addedit.dropdown);
            bindEventListeners(UICtrl);
        }
    }
        
})(workoutDataController, workoutUiController);

controller.init(); 
// ^^ the only actual thing that's public.



// ---------------------------------------------------------------------------------- //

var Exercise = function(name, variations, muscleGroups, types){
    this.name = name;
    this.variations = variations;
    this.muscleGroups = muscleGroups;
    this.types = types;    
}
Exercise.prototype.loadAddEdit = function(inputsRootId){
    var nameElement = document.querySelector(`#${inputsRootId} #name`);
    nameElement.innerHTML = "exercise name goes here";   
    nameElement.setAttribute('placeholder', "exercise name goes here");   
    
}

async function fetchFileContents(fileName){
                            
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var urlPath = urlPathStart + projectDir + "/config/";

    console.log("Reading contents of config file: " + fileName)
    var rawResults = await fetch(urlPath + fileName + ".json");
    var jsonContents = await rawResults.json();

    return jsonContents;
};


function loadExercisesDropdown(elementId){
    
    console.log("Loading Exercises Dropdown Menu");
    fetchFileContents('exercises').then((exercisesArray) => {
    
        var tmpCreateOption = (value) => {
            var optionElement = document.createElement('option');
            optionElement.name = optionElement.textContent = value;
            selectElement.appendChild(optionElement);
        }

        var selectElement = document.querySelector(`#${elementId}`);
        tmpCreateOption('select an exercise');

        exercisesArray['exercises'].forEach(nextExercise => {
            tmpCreateOption(nextExercise.name);
        })
    })
}






// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---- WIP -------------------- //











function showAddEdit(option, addEditIds) {
    

    toggleVisible(addEditIds.wrapper, 'block');
    //TODO: toggle off the new-workout

    console.log("option: " + option);
    if(option === 'edit'){
        console.log("toggling...");
        // if edit, display select name dropdown only,
        
        toggleVisible(addEditIds.dropdown, 'block');
        toggleVisible(addEditIds.inputs, 'none');
    } else {
        var exercise = new Exercise("exampleExercise", ["easy"], ["brain"], ["strength"] );
        exercise.loadAddEdit(addEditIds.inputs);
        showInputs(addEditIds);
    }
    //      on select, call showInputs(exercise);
    // if new, showInputs(blank);
    
    
}

function showInputs(inputIdsRoot){
    // show addEdit div
    toggleVisible(inputIdsRoot.dropdown, 'none');
    toggleVisible(inputIdsRoot.wrapper, 'block');
    toggleVisible(inputIdsRoot.inputs, 'block');
}




function toggleVisible(elementId, showhide){
    document.getElementById(elementId).setAttribute('style', `display:${showhide}`);
} //toggleVisible(workoutPageIds.addedit.wrapper, 'block'); // none

/* addExercise(){
    get main obj.exerciseTemplate;
    populate contents with values from ui
    overwrite file with updated contents
};
*/
/* editExercise(name){
    get main obj.exercises[name]
    replace contents with values from ui
    overwrite file with updated contents
}
*/
/* generateWorkout(musclegroups, workouttype, level, duration) {
    iterate workoutList
        pull
}
*/


    // bind event listeners to buttons
    function bindEventListeners(uiCtrl) {
        
        var mainPageIdStrings = uiCtrl.getWorkoutPageIds().main;
       
        //TOGGLE VISIBILITY:
            // show "add new exercise"
        document.getElementById(mainPageIdStrings.addNew).addEventListener('click', function(){
                uiCtrl.displayAddEdit('new');
//            console.log("toggle visibility of NEW")
        });
            // show "edit existing exercise"
        document.getElementById(mainPageIdStrings.editEx).addEventListener('click', function(){
//                console.log("calling the edit function!");
                uiCtrl.displayAddEdit('edit');
//            console.log("toggle dropdown of exercises to EDIT")
        });
            // show "create a new workout"
//        document.getElementById('').addEventListener('click', function(){
//                console.log("NEED TO BIND THIS TO CREATENEWWORKOUT... AND DO SOMETHING!! ########");
//        });
//        // start new workout
//        document.getElementById('').addEventListener('click', function(){
//                console.log("NEED TO BIND THIS TO CREATENEWWORKOUT/GO ... AND start the workout");
//        });
    }