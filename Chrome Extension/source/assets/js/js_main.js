/*-------------------------------------Logout Button-------------------------------------*/
document.getElementById("btn_logout").addEventListener("click", function(){
    var myRef = new Firebase("https://glaring-fire-1362.firebaseio.com");
var auth = new FirebaseSimpleLogin(myRef, function(error, user) {
 auth.logout();
  window.location.href = "popup.html";
});
});
/*-------------------------------------End of Logout button------------------------------*/

