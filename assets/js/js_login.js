/* -------------------------------Login------------------------------- */

/* >>>>>>>>>>>>>Login Layout<<<<<<<<<<<<<<<< */

$(function() {
  var SHOW_CLASS = 'show',
      HIDE_CLASS = 'hide',
      ACTIVE_CLASS = 'active';
  
  $( '.login_tab_links' ).on( 'click', 'li a', function(e){
    e.preventDefault();
    var $tab = $( this ),
         href = $tab.attr( 'href' );
  
     $( '.active' ).removeClass( ACTIVE_CLASS );
     $tab.addClass( ACTIVE_CLASS );
  
     $( '.show' )
        .removeClass( SHOW_CLASS )
        .addClass( HIDE_CLASS )
        .hide();
    
      $(href)
        .removeClass( HIDE_CLASS )
        .addClass( SHOW_CLASS )
        .hide()
        .fadeIn( 550 );
  });
});

/* >>>>>>>>>>>>> End of Login Layout<<<<<<<<< */



/* >>>>>>>>>>>>>Register Firebase<<<<<<<<<<<<<<<< */
var SignUpViewModel = function(makeLoginViewVisible) {
  
  var firebaseRoot = new Firebase("https://glaring-fire-1362.firebaseio.com"); 
  
  authClient = new FirebaseSimpleLogin(firebaseRoot, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
      alert("User name or password is not correct. Please try again.");
      } else if (user) {
        // user authenticated with Firebase
        console.log('Logging In User ID: ' + user.id + ', Provider: ' + user.email);  
      } else {
        // user is logged out
      console.log("User logged out");
      }
  });
  
  var self = this;
  
  self.userName = ko.observable();
  self.userPassword = ko.observable();
  self.isVisible = ko.observable(makeLoginViewVisible);
  
  self.signup = function() {
    
    console.log( "Signing up "+self.userName() );
    
    authClient.createUser(self.userName(), self.userPassword(), function(error, user) {
      // do signup authentication checks here
      if (!error) {
        // User not signed up so .... sign her up
        console.log( "Signed up "+self.userName() );
          console.log('Firebase User Id: ' + user.id + ', and Email: ' + user.email);
        //alert(user.email + " has successfully signed up. Please login.");

          authClient.login('password', {
            email: self.userName(),
            password: self.userPassword()
          });     
      
        } else {
        // User already signed up
        alert( error.message +" Please login. Thank you.");
      }
    });
    
  }
  
  self.goToLogin = function() {
    
    self.isVisible(false);
      
    
  }
}

/* >>>>>>>>>>>>>End of Register Firebase<<<<<<<<<<<<<<<< */

/* >>>>>>>>>>>>>Login Firebase<<<<<<<<<<<<<<<< */

var LoginViewModel = function(makeLoginViewVisible) {
    
  var firebaseRoot = new Firebase("https://glaring-fire-1362.firebaseio.com"); 
  
  var authClient = new FirebaseSimpleLogin(firebaseRoot, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
      alert("User name or password is not correct. Please try again.");
      self.isVisible(true);
      } else if (user) {
        // user authenticated with Firebase
       window.location.href = "library/library.html";
      } else {
        // user is logged out
      console.log("User logged out");
      }
  });
  
  var self = this;
  
  self.userName = ko.observable("");      
  self.userPassword = ko.observable(""); 
  self.isVisible = ko.observable(makeLoginViewVisible); 
  
  self.makeVisible = function() {
    self.isVisible(true);
    ViewModels.signupVM.isVisible(false);
  }
  
  self.login = function() {
    console.log("logging in");
    self.isVisible(false);
    authClient.login('password', {
      email: self.userName(),
        password: self.userPassword()
      });     
  }

}


/* >>>>>>>>>>>>>End of Login Firebase<<<<<<<<<<<<<<<< */

var ViewModels = {
    signupVM : new SignUpViewModel(true),
    loginVM : new LoginViewModel(false)
    
}


ko.applyBindings(ViewModels);
/* ----------------------------End of Login--------------------------- */
