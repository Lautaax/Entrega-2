import { Logoutfunction } from "./logoutfunction.js";
const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');
let cId=document.getElementById("cid").value

let logout=document.getElementById("logout")
addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    
    const productId = form.getAttribute("id").split("-")[1];

    const prodTitle = form.closest("div").querySelector("h5").textContent;

    try {
      let response = await fetch(`/api/carts/${cId}/product/${productId}`, {
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
});
Logoutfunction(logout)