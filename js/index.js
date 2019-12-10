import {InfinityOrb} from './modules/Orbs.js';
import {getElement} from './modules/ElementSeeker.js';


var workOrbPair = new InfinityOrb('work');
workOrbPair.addListeners("./pages/work.html");

var playOrbPair = new InfinityOrb('play');
//playOrbPair.addListeners("./pages/workouts.html");
playOrbPair.addListeners("./pages/under-construction.html");



var qodCredit = 'courtesy of &nbsp;&nbsp;<span style="z-index:50;font-size:0.9em;"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>';


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