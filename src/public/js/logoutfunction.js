export const Logoutfunction=(logout)=>{
    logout.addEventListener("click",(e)=>{
        fetch(`/api/sessions/logout`, {
          method: "GET",
        }) .then(() => {
          Swal.fire({
            title: "Desconexion con exito",
            text: `Redirigiendo al incio`,
            allowOutsideClick: false,
      
            icon: "success",
            timer: 3000,
            //timerProgressBar: true,
            willClose: () => {
              window.location.href = "/";
            }
            
          });
        })
        .catch((error) => console.log(error));
      
      })
}