
//import {searchClients} from './SearchFilterClients.js';
//import {createCustomElement} from './modules/CustomElements.js';
//import {newElement} from './modules/StandardElements.js';
//
////global variables
//export var clientList, campaignList, fileList, settingsInfos, userList, userAccessLevel;
//
//var urlPathStart = window.location.protocol + "//" + window.location.host + "/";
//var projectDir = document.URL.replace(urlPathStart, "").replace(/\/.*$/, "");
//export var contextPath = urlPathStart + projectDir;
//
//var gotClients = 0;
//var gotSettings = 0;

var qodCredit = 'courtesy of &nbsp;&nbsp;<span style="z-index:50;font-size:0.9em;"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>';


// for index page only...
document.querySelectorAll('.orb.orb-major').forEach(elem => {
	
	elem.addEventListener('mouseover', function(){
    		
		var elems = this.parentElement.parentElement.
							getElementsByClassName('pivot');

		Array.prototype.forEach.call(elems, element => {

			element.classList.remove('moving');
			this.classList.add('caught');
		});

		setTimeout(() => {
				Array.prototype.forEach.call(elems, element => {
					element.classList.add('moving');
					this.classList.remove('caught');
				});
			}, 3000);
	});
});

document.querySelector('.orb.orb-major.play').addEventListener('click', function(){
    
//    alert("Load the workouts page somehow!");
    window.location.href = "./pages/workouts.html";
})

// for index page only...
document.querySelector('.orb.orb-major.work').addEventListener('click', function(){
    
//    alert("Load the workouts page somehow!");
    window.location.href = "./pages/work.html";
})



$(document).ready(function() {

    jQuery.support.cors = true;
// ^^ allows cross-origin control support to fetch() from 
// external urls
 // ^^ does nothing actually :(
	
    
//    $.ajax({
//       url: 'https://quotes.rest/qod',
//       headers: {
//            "Accept": "application/json"
//       },
//       method: 'GET',
//       success: function(responseData) {
//
//            updateQodAndCredit(responseData.contents.quotes[0]);
//       }
//    });
// AS A FREE USER WE HAVE LIMITS HERE SO I'VE COMMENTED THIS CODE WHILE SITE IS UNDER DEVELOPMENT
    
    
    
    

    

    
    
    
    
    
    function getElement(elementId) {
        return document.getElementById(elementId);
    }
    
    
    
    function updateQodAndCredit(qodObject) {
        
        ids = {
            textId: 'qod-text',
            authorId: 'qod-author',
            attributionId: 'qod-attribution'
        }
        
        getElement(ids.textId).innerHTML = qodObject.quote;
        getElement(ids.textId).title = qodObject.title;
        getElement(ids.authorId).innerHTML = qodObject.author;
        getElement(ids.attributionId).innerHTML = qodCredit;
    }
    

});

