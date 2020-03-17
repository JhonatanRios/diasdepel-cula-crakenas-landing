document.addEventListener("DOMContentLoaded", e => {
  const mailButton = document.getElementById("loginWithGmail"),
  userData = document.getElementById('userData')

  mailButton.addEventListener("click", e => {
    gapi.load("auth2", function() {

      const auth2 = gapi.auth2.init({
        client_id:
          "476273419082-nopag73t87c489sgip2odf6daoit64uq.apps.googleusercontent.com",
        fetch_basic_profile: true,
        scope: "profile"
      });

      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then(function() {
        let profile = auth2.currentUser.get().getBasicProfile();

        let userFormat = {
          id: profile.getId(),
          first_name: profile.getGivenName(),
          last_name: profile.getFamilyName(),
          email: profile.getEmail(),
          picture: profile.getImageUrl(),
          login: 'withGoogle',
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
      });
    });
  });
});
