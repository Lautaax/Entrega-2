const form = document.getElementById("login");
const inputEmail=document.getElementById("email");
const inputPass=document.getElementById("password");
const githubBtn = document.getElementById('githubBtn')
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  
  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }) 


  if(response.ok){
    Swal.fire({
      title: 'A ingresado con exito',
      text: `Bienvenido`,
      allowOutsideClick: false,
      icon: 'success',

      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        window.location.href = '/products'
      }
    })

  }else{
    Swal.fire({
      title: "Contraseña incorrecta",
      toast: true,
      position: "top-center",
      icon: "error",
    });
  }
});
githubBtn.addEventListener('click', (e) => {
  if (e.target.matches('#githubBtn')) {
    Swal.fire({
      title: 'Espere.',
      text: 'Un momento',
      allowOutsideClick: false,
      icon: 'info',
      timer: 3000,
      timerProgressBar: true
    })
  }
})