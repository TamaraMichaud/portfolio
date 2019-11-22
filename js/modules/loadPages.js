//$(document).ready(function() {
//
////function fetchTopTail(){
//
//    
//    console.log("err... what's happening!!");
//    
//    fetch("./includes/header.html").then(response => {
//        console.log("HEADER CONTENTS: " + response.text());
////        return response.text()
//    }).then(data => {
//        console.log("OR MAYBE: " + data.text());
////        document.querySelector("header").innerHTML = response;
//    });
////
////    fetch("./includes/footer.html").then(response => {
////        return response.text()
////    }).then(data => {
////        document.querySelector("footer").innerHTML = data;
////    });
////}
//    })
//
//
//
//




function fetchTopTail(){
              $.ajax({
                type: "GET",
                url: "./includes/header.html",
                dataType: "html",



                error: function (e) {
                    alert("OOPS failed to load json config file!");
                    console.log("JSON file-reading Failed: ", e);
                },



                success: function (headerObj) {
//console.log("Read the contents well!! ...now what...");

//                    console.log(response.permissionsTypes[1]);
                    console.log("HEADER FOUND: ")
//                   $.each(responseObj, function(key, val) {
//                       
//                       console.log("key: " + key + ", value: " + val);
//                       
                    
                    
                    console.log(headerObj);
                    document.getElementById('header').innerHTML = headerObj;
                    
                       
                   }
                    
                
          })
    
}