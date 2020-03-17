document.addEventListener("DOMContentLoaded", e => {
  const fbButton = document.getElementById("loginWithFacebook"),
  userData = document.getElementById('userData')

  window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId: "205470000660296", // FB App ID
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true, // parse social plugins on this page
      version: "v6.0" // use graph api version 2.8
    });

  };

  fbButton.addEventListener("click", e => {
    fbLogin();
  });

  // Facebook login with JavaScript SDK
  const fbLogin = () => {
    FB.login(
      response => {
        if (response.authResponse) {
          // Get and display the user profile data
          getFbUserData();
        }
      },
      { scope: "email" }
    );
  };

  // Fetch the user profile data from facebook
  const getFbUserData = () => {
    
    FB.api(
      "/me",
      {
        fields: "id,first_name,last_name,email,link,gender,locale,picture"
      },
      response => {

        let userFormat = {
          id: response.id,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          picture: response.picture.data.url,
          login: 'withFacebook',
          created_at: new Date()
        };

        const formID = document.getElementById('userID'),
        formName = document.getElementById('name'),
        formLastName = document.getElementById('lname'),
        formEmail= document.getElementById('email'),
        formLogin = document.getElementById('loginwith'),
        formAvatar = document.getElementById('picture')

        formID.value = userFormat.id
        formName.value = userFormat.first_name
        formLastName.value = userFormat.last_name
        formEmail.value = userFormat.email
        formLogin.value = userFormat.login
        formAvatar.value = userFormat.picture
        
      }
    );
  };
});
