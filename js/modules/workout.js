var workoutPageIds = {
                main: {
                    addNew: 'add',
                    editEx: 'edit',
                    getWorkout: 'workout'
                },
                addedit: {
                    wrapper: 'addedit',
                    dropdown: 'addedit-exercises',
                    
                }
}

// load data
loadConfigFromFile("exercises", loadWorkouts);

// bind event listeners to buttons
document.getElementById(workoutPageIds.main.addNew).addEventListener('click', function(){
        showAddEdit('new');
    });

document.getElementById(workoutPageIds.main.editEx).addEventListener('click', function(){
        showAddEdit('edit');
});


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
    
    const inputWrapperElement = document.getElementById(workoutPageIds.addedit.wrapper);
/*       "name" : "template",
            "muscle-groups" : [ ],
            "workout-type" : [ ],
            "variations" : [ 
                    {
                        "level" : "easy",
                        "description" : "",
                        "reps" : 10,
                        "sets" : 3 
                    },
                    {
                        "level" : "medium",
                        "description" : "",
                        "reps" : 15,
                        "sets" : 5 
                    },
                    {
                        "level" : "hard",
                        "description" : "",
                        "reps" : 20,
                        "sets" : 8 
                    }*/
    
    
    
    
    
    
    
    
    if(option === 'edit'){
        
    // if edit, display select name dropdown only,
    }
    //      on select, call showInputs(exercise);
    // if new, showInputs(blank);
    
}

function showInputs(contents){
    // show addEdit div
    
}

function loadExercisesDropdown(exercisesArray, dropdownElement){
    
    function createOption(value){
        
        var optionElement = document.createElement('option');
        optionElement.name = optionElement.textContent = value;
        selectElement.appendChild(optionElement);
    }
    
    var selectElement = document.getElementById(dropdownElement);
    createOption('select an exercise');
    
    exercisesArray.forEach(nextExercise => {
        createOption(nextExercise.name);
    })
}


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