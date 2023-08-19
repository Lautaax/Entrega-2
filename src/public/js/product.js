import { Logoutfunction } from "./logoutfunction.js";
const logout = document.getElementById("logout")
const formButton = document.getElementById('botonForm');
let cId = document.getElementById("cid").value;

let pId = document.getElementById('pid').value;
let stock = document.getElementById('stock').value;

formButton.addEventListener("click", async (e) => {
  e.preventDefault();




  const title = document.getElementById("title")

  try {
    let response = await  fetch(`/api/carts/${cId}/product/${pId}`, {
      method: "POST",
    })


      if (response.ok) {
        Swal.fire({
          title: "Producto agregado al carrito",
          text: `Agrego 1 unidad al carrito ${title.innerHTML}`,
          toast: true,
          position: "top-center",
          icon: "success",

        });
      } 
  

  } catch ({ error }) {
    Swal.fire({
      title: 'Error!',
      html: `<p>Error en el ingreso</p>`,
      icon: 'error',
      timer: 4000,
      footer: 'Recargar pagina por favor',
      timerProgressBar: true,
      willClose: () => {
        location.reload()
      }
    })
  }



});


home.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/products";
})
logout.addEventListener("click", (e) => {
  fetch(`/api/sessions/logout`, {
    method: "GET",
  }).then(() => {
    Swal.fire({
      title: "Logout successful!",
      text: `Redirecting you to the login`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,


      willClose: () => {
        window.location.href = "/";
      }

    });
  })
    .catch((error) => console.log(error));

})
Logoutfunction(logout)
// });
