var globalExercisesConfig;
fetchFileContents("exercises");

var AddEditModal = function(mainElementIds) {
    this.wrapper = document.getElementById(mainElementIds.wrapper);
    this.dropdown = document.getElementById(mainElementIds.dropdown);
    this.inputs = document.getElementById(mainElementIds.inputs);
    console.log("Created new modal object; wrapper id: " + this.wrapper);
}

AddEditModal.prototype.showHide = function(showOrHide){

    console.log("set wrapper id " + this.wrapper + " visibility to: " + showOrHide);
    this.wrapper.setAttribute('style', `display:${showOrHide}`);
}

AddEditModal.prototype.displayEditDropdown = function(){
    // (hide inputs)
    this.inputs.setAttribute('style', 'display:none');
    // show dropdown
    this.dropdown.options[0].selected = true; // reset default selection to "please select"
    this.dropdown.setAttribute('style', 'display:block');
}

AddEditModal.prototype.displayInputs = function(){
    // (hide dropdown)
    this.dropdown.setAttribute('style', 'display:none');
    // show inputs
    this.inputs.setAttribute('style', 'display:block');
    // if isset exerciseObj -> iterate properties // inputs list
    
    var exName = this.dropdown.options[this.dropdown.selectedIndex].value;
    if(exName != 'select an exercise') {
        console.log("Name Chosen Was: " + exName);
// get the exercise object that matches this name
        var theEx = globalExercisesConfig['exercises'].findIndex((nextEx) => {
            return nextEx.name === exName;
        })

        console.log("which is config Index: " + theEx);
        var theExercise = globalExercisesConfig['exercises'][theEx];
        console.log(theExercise);
        
//        console.log(globalExercisesConfig);
        
//        var exercise = new Exercise(exName);
//        console.log("Editting Exercise Named: " + exerciseObj.name);
        console.log("UNDER CONSTRUCTION");
        // populate values where name matches
    }

}

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
                filters: 'workout-inputs',
                workout: 'workout-details'
            }
    };

    var addEditModal = new AddEditModal(workoutPageIds.addedit);

    return {
            // show the Add/Edit pane
         displayAddEdit: function(addOrEdit){
//
//             if(!addEditModal) {
//                 addEditModal = new AddEditModal(workoutPageIds.addedit);
//             }
             addEditModal.showHide('block');
             if(addOrEdit === 'edit') {
                 console.log("clicked Edit, display dropdown");
                 addEditModal.displayEditDropdown();
             } else {
                 console.log("clicked New, display inputs");
                 addEditModal.displayInputs();
             }
         },
        
        displayInputs: function(exerciseName){
            addEditModal.displayInputs(exerciseName);
        },
        
        getAddEditModal: function(){
//             if(!addEditModal) {
//                 addEditModal = new AddEditModal(workoutPageIds.addedit);
//             }
            return addEditModal;
        },
            // show the CreateNewWorkout pane
        // displayCreateWorkout: function(){
        //      hide addEditModal
        //      display createNewWorkout pane
        // ------ make this a permanent feature, and the AddEdit is a modal window... ------- //
        // },
        
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
    
//    var exercisesConfig;

    return {
        loadInitialData: async function(dropdownElement){
//            console.log("...loading config");
//            if(!this.exercisesConfig){
//                this.exercisesConfig = await fetchFileContents("exercises");
//            }
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
        // }  ,
          
            // retreive the exercisesConfig object
//         getExercisesConfig: function(){
//             console.log("WHY ARE YOU COMING HERE FOR THIS FOOL?? IT's GLOBAL");
//             return this.exerciseConfig;
//         }
        
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
        //,
//        getExercisesConfig: function(){
//            var fuckyou = dataCtrl.getExercisesConfig();
//            console.log("where do we lose ourselves: " + fuckyou);
//            return fuckyou;
//        }
    }
        
})(workoutDataController, workoutUiController);

//controller.init(); 
// ^^ the only actual thing that's public.  (...apart from all the below...)



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









//function setGlobalConfig(configObj) {
//    this.globalExercisesConfig = configObj;
//    console.log("ARRRRGGGGHHHHHH" + configObj);
//    controller.init();
//}






async function fetchFileContents(fileName){
                            
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
    var urlPath = urlPathStart + projectDir + "/config/";

    console.log("Reading contents of config file: " + fileName)
    var rawResults = await fetch(urlPath + fileName + ".json");
    var jsonContents = await rawResults.json();
    
//    setGlobalConfig(jsonContents);
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

        uiCtrl.displayInputs();
    });
    
    // save exercise
    ///////////////////////////
    /////////////////////////// addEditModal needs a "save/cancel" button
    
    // show "create a new workout"
    document.getElementById(pageIdStrings.main.getWorkout).addEventListener('click', function(){
            console.log("Need to display the workout!!");
    });
//        // start new workout
//        document.getElementById('').addEventListener('click', function(){
//                console.log("NEED TO BIND THIS TO CREATENEWWORKOUT/GO ... AND start the workout");
//        });
}