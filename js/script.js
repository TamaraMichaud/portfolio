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

$(document).ready(function() {

    jQuery.support.cors = true;

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
        
        var qodTextElement = document.getElementById('qod-text');
        var qodAuthorElement = document.getElementById('qod-author');
        var qodAttributionElement = document.getElementById('qod-attribution');
        
        qodTextElement.innerHTML = qodObject.quote;
        qodTextElement.title = qodObject.title;
        qodAuthorElement.innerHTML = qodObject.author;
        qodAttributionElement.innerHTML = qodCredit;
    }
    

    

});

