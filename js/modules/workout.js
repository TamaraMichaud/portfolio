var globalExercisesConfig;
fetchFileContents("exercises");

function getElement(elementId){
	return document.getElementById(elementId);
}

function findElement(identifier){
	return document.querySelector(identifier);
}

var AddEditModal = function(mainElementIds) {
	this.wrapper = getElement(mainElementIds.wrapper);
	this.dropdown = getElement(mainElementIds.dropdown);
	this.inputs = getElement(mainElementIds.inputs);

	this.inputsId = mainElementIds.inputs;
	this.variationsId = mainElementIds.variations;
	this.origVariation = findElement(`#${this.variationsId}0`);
	
	this.variationsArray = ['level', 'description', 'reps', 'sets'];
}

AddEditModal.prototype.showHide = function(showOrHide){

    console.log(`set wrapper id ${this.wrapper} visibility to: ${showOrHide}`);
    this.wrapper.setAttribute('style', `display:${showOrHide}`);
	 this.dropdown.options[0].selected = true;
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
	 this.resetInputs();
    this.inputs.setAttribute('style', 'display:block');
	
    // if isset exerciseObj -> populate inputs
    var exName = this.dropdown
	 			.options[this.dropdown.selectedIndex]
	 			.value;
	
    if(exName != 'select an exercise') {
	 // get the exercise object that matches this name
        var exInd = globalExercisesConfig.exercises
					  .findIndex((nextEx) => {
							return nextEx.name === exName;
					  });

        var theExercise = globalExercisesConfig.exercises[exInd];
		 
		  this.populateInputs(theExercise);
	 } else {
		  // replicate the variations
		  console.log(globalExercisesConfig.exerciseTemplate);
		  this.populateVariations(globalExercisesConfig.exerciseTemplate.variations)
	 }
}


AddEditModal.prototype.populateInputs = function(exercise){
	//populate the name
	findElement(`#${this.inputsId} #name`)
			.setAttribute('value', exercise.name);
	//populate the variation elements, and copy as needed
	this.populateVariations(exercise.variations);
}

AddEditModal.prototype.populateVariations = function (exerciseVariations) {
	console.log(this.origVariation)
	var loopNum = 0;
	// loop variations
	for(variation of exerciseVariations){

		var elementBlock = this.origVariation;
		if(loopNum > 0) {
			elementBlock = this.origVariation.cloneNode(true);
			elementBlock.id = this.variationsId + loopNum; 
		}

		for(varDetail of this.variationsArray){
			console.log(`seeking id: #${varDetail}-${loopNum}`)
			var detailElement = 
			elementBlock.querySelector(`#${varDetail}-0`);
			if(varDetail === 'level') {
				detailElement.textContent = variation[varDetail];
			} else {
				detailElement.setAttribute('value', variation[varDetail]);
			}
			detailElement.id = varDetail + '-' + loopNum;
		}

		if(loopNum > 0){
			getElement(this.inputsId).appendChild(elementBlock);
		}
		loopNum++;
	}
}


AddEditModal.prototype.resetInputs = function(){
	// empty any contents
	// delete variations > 0
	
	
	
	
	
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