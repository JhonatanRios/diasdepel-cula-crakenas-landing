document.addEventListener("DOMContentLoaded", e => {

  const form = document.getElementById('loginWithForm'),
    formName = document.getElementById('name'),
    formLastName = document.getElementById('lname'),
    formEmail = document.getElementById('email'),
    formID = document.getElementById('userID'),
    formLogin = document.getElementById('loginwith'),
    formPicture = document.getElementById('picture'),
    checkBoxAge = document.getElementById('acceptage'),
    checkboxTyC = document.getElementById('acceptdata'),
    formContent = document.getElementById('form__content'),
    formLoading = document.getElementById('formLoading')


  form.addEventListener('submit', e => {
    e.preventDefault();
    LoginByForm();
  })

  function LoginByForm() {

    if (formName.value != "" && formLastName.value != "" && formEmail.value != "") {

      if (checkBoxAge.checked && checkboxTyC.checked) {

        formContent.style.display = "none";
        formLoading.style.display = "block";

        let userFormat = {
          id: (formID.value == "") ? ID() : formID.value,
          first_name: formName.value,
          last_name: formLastName.value,
          email: formEmail.value,
          picture: formPicture.value,
          login: formLogin.value,
          created_at: new Date()
        }

        console.log(userFormat)

        let params = {
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userFormat),
          method: "POST"
        };
        fetch("https://crakenas-royal-films.firebaseapp.com/api/add-user", params)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {

            //alert('Usuario registrado, lleva a sgte sección');
            window.location.href = "./gracias-por-participar.html";


          });

      } else {
        // alert("Es necesario que aceptes nuestros términos y condiciones para participar");

        Swal.fire({
          icon: 'error',
          text: 'Es necesario que aceptes nuestros términos y condiciones para participar'
        }
        )

      }

    } else {

      Swal.fire({
        icon: 'error',
        text: 'Ingresa tus datos para participar'
      }
      )


    }


  }

  function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

});