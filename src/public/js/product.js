
const formButton= document.getElementById('botonForm');

  formButton.addEventListener("click", (e) => {
    e.preventDefault();

    const cartId = document.querySelector("#cid").value;

    const prod=document.getElementById('productId');
    const value=prod.innerText.split(" ")[4]
    const title=document.getElementById("title")


    fetch(`/api/carts/${cartId}/product/${value}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart!",
          text: `You added 1 unit of the product ${title.innerHTML}`,
          toast: true,
          position: "top-right",
          icon: "success",
          customClass: {
            popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
            confirmButton: "!bg-blue-600 !px-5",
            timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
          },
        });
      })
      .catch((error) => console.log(error));
  });
// });
