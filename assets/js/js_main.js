/*-------------------------------------Logout Button-------------------------------------*/
document.getElementById("btn_logout").addEventListener("click", function(){
    var myRef = new Firebase("https://glaring-fire-1362.firebaseio.com");
var auth = new FirebaseSimpleLogin(myRef, function(error, user) {
 auth.logout();
  window.location.href = "../index.html";
});
});
/*-------------------------------------End of Logout button------------------------------*/

/*-------------------------------------Create Transistion--------------------------------*/
$(document).ready(function(){

    $("#savememeshow").hide();

  $("#saveBtn").click(function(){
    $("#editmemeshow").hide(550);
    $("#savememeshow").show(550);
  });

});
/*------------------------------End of Create Transistion--------------------------------*/

/*-------------------------------------Popup Transistion--------------------------------

------------------------------Popup Transistion--------------------------------*/
/*function handleFileSelect(evt) {
  var idRand = Math.floor(Math.random() * 1e4) + 1;
  var firebaseRef = 'https://flickering-fire-8139.firebaseio.com/';
  var f = evt.target.files[0];
  var reader = new FileReader();
    var album = "";
  var comments = "";
  var tags = "";
  var rating = 1;
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      //alert(filePayload);
      var fname = theFile.name.replace(/\.[^\.]+$/, '');
      var f = new Firebase(firebaseRef);
             f.push({ID: idRand,
              album: album,
              comments: comments,
              imageSource: filePayload,
              rating: rating,
              tags: tags,
              timeStamp: dateStamper()
                        });
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      firebaseRef.set(filePayload, function() { 
 
        //document.getElementById("first_meme").src = e.target.result;
        $('#file-upload').hide();
        $('#nav_add_img').show();
          
        // Update the location bar so the URL can be shared with others
      });
    };
  })(f);
  reader.readAsDataURL(f);

}

function dateStamper() {
    var e = new Date;
    var t = e.getDate();
    var n = e.getMonth() + 1;
    var r = e.getFullYear();
    if (t < 10) {
        t = "0" + t
    }
    if (n < 10) {
        n = "0" + n
    }
    e = n + "/" + t + "/" + r;
    var i = new Date;
    var s = i.getHours();
    var o = i.getMinutes();
    if (o < 10) {
        o = "0" + o
    }
    if (s > 11) {
        var u = "PM"
    } else {
        var u = "AM"
    }
    var a = e + " @ " + s + ":" + o + " " + u;
    return a
}


$(function() {
  $('#nav_upload_txt').on('click', function(e) {

  $('#nav_add_img').hide();
  $('#file-upload').show();
  });
  
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
});*/