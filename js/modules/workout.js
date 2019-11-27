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
                }
}

// load data
loadConfigFromFile("exercises", loadWorkouts);

// bind event listeners to buttons
document.getElementById(workoutPageIds.main.addNew).addEventListener('click', function(){
        showAddEdit('new');
    });

document.getElementById(workoutPageIds.main.editEx).addEventListener('click', function(){
        console.log("calling the edit function!");
        showAddEdit('edit');
});



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





// 
function loadConfigFromFile(fileName, onSuccessFunction){

    console.log("Processing contents of json config file: " + fileName);		
    var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
    var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");

    var urlPath = urlPathStart + projectDir + "/config/";

    $.ajax({
            type: "GET",
            url: urlPath + fileName + ".json",
            dataType: "json",

            error: function (e) {
                    alert("OOPS failed to load json config file!");
                    console.log("JSON file-reading Failed: ", e);
            },

            success: function (responseObj) {

                onSuccessFunction(responseObj);
            }
    })
}; 


function loadWorkouts(allExercisesConfigs){

    // muscle-groups, workout-types, workouts
    var exercisesList = allExercisesConfigs["exercises"];
    var musclesList = allExercisesConfigs["muscle-groups"];
    var typesList = allExercisesConfigs["workout-types"];

    loadExercisesDropdown(exercisesList, workoutPageIds.addedit.dropdown);
    // ^^ now we have an array of workout options, which we need to pass around to other objects...
}



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
    
    function createOption(value){
        
        var optionElement = document.createElement('option');
        optionElement.name = optionElement.textContent = value;
        selectElement.appendChild(optionElement);
    }
    
    var selectElement =  document.querySelector(`#${dropdownElement}`);
    createOption('select an exercise');
    
    exercisesArray.forEach(nextExercise => {
        createOption(nextExercise.name);
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