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
        // displayAddEdit: function(addOrEdit){
        //      // showAddEdit(addOrEdit);
        // },
        
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
            bindEventListeners(UICtrl.getWorkoutPageIds());
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
Exercise.prototype.loadAddEdit = function(){
    var nameElement = document.querySelector(`#${workoutPageIds.addedit.inputs} #name`);
    nameElement.innerHTML = "exercise name goes here";   
    nameElement.setAttribute('placeholder', "exercise name goes here");   
    
}

async function fetchFileContents(fileName){
                            
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var urlPath = urlPathStart + projectDir + "/config/";

    var rawResults = await fetch(urlPath + fileName + ".json");
    var jsonContents = await rawResults.json();

    loadExercisesDropdown(jsonContents["exercises"], workoutPageIds.addedit.dropdown);
    return jsonContents;
};



// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---- WIP -------------------- //







function showAddEdit(option) {
    
    toggleVisible(workoutPageIds.addedit.wrapper, 'block');
    //TODO: toggle off the new-workout

    console.log("option: " + option);
    if(option === 'edit'){
        console.log("toggling...");
        // if edit, display select name dropdown only,
        
        toggleVisible(workoutPageIds.addedit.dropdown, 'block');
        toggleVisible(workoutPageIds.addedit.inputs, 'none');
    } else {
        var exercise = new Exercise("exampleExercise", ["easy"], ["brain"], ["strength"] );
        exercise.loadAddEdit();
        showInputs();
    }
    //      on select, call showInputs(exercise);
    // if new, showInputs(blank);
    
    
}

function showInputs(contents){
    // show addEdit div
    toggleVisible(workoutPageIds.addedit.dropdown, 'none');
    toggleVisible(workoutPageIds.addedit.wrapper, 'block');
    toggleVisible(workoutPageIds.addedit.inputs, 'block');
}


function loadExercisesDropdown(exercisesArray, dropdownElement){
    
    var tmpCreateOption = (value) => {
        var optionElement = document.createElement('option');
        optionElement.name = optionElement.textContent = value;
        selectElement.appendChild(optionElement);
    }
    
    var selectElement = document.querySelector(`#${dropdownElement}`);
    tmpCreateOption('select an exercise');
    
    exercisesArray.forEach(nextExercise => {
        tmpCreateOption(nextExercise.name);
    })
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
    function bindEventListeners(pageIdStrings) {
        
        console.log("Page ElementId Strings: " + pageIdStrings);
       
        //TOGGLE VISIBILITY:
            // show "add new exercise"
        document.getElementById(pageIdStrings.main.addNew).addEventListener('click', function(){
                showAddEdit('new');
        });
            // show "edit existing exercise"
        document.getElementById(pageIdStrings.main.editEx).addEventListener('click', function(){
                console.log("calling the edit function!");
                showAddEdit('edit');
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