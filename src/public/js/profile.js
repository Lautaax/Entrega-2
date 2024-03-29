import { Logoutfunction } from "./logoutfunction.js"
const d = document

const uid = d.getElementById('userId').innerText

const addDocumentsForm = d.getElementById('addDocumentsForm')
const identification1 = d.getElementById('identification').files
const address1 = d.getElementById('address').files
const statement1 = d.getElementById('statement').files

const addProfilePictureForm = d.getElementById('addProfilePictureForm')
const updateProfilePictureForm = d.getElementById('updateProfilePictureForm')
const profilePictureInput = d.getElementById('profile')
const profilePicture = profilePictureInput.files
let logout = d.getElementById("logout")
const changeRoleForm = d.getElementById('changeRoleForm')

const checkDocumentationForm = d.getElementById('checkDocumentation')

// Documentation upload form

addDocumentsForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addDocumentsForm)

    for (let i = 0; i < identification1.length; i++) {
        formData.append('identification', identification1[i])
    }

    for (let i = 0; i < address1.length; i++) {
        formData.append('address', address1[i])
    }

    for (let i = 0; i < statement1.length; i++) {
        formData.append('statement', statement1[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/documents`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Subido con exito',
                html: `Sus achivos se han subido<br>
                    Su rol es premium`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
               
            })
        } else {
            throw data
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
})

// Profile picture form

profilePictureInput.addEventListener('change', () => {
    addProfilePictureForm.dispatchEvent(new Event('submit'))
})

addProfilePictureForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addProfilePictureForm)

    for (let i = 0; i < profilePicture.length; i++) {
        formData.append('profile', profilePicture[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/profile`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Su foto de perfil se subio con exito',
                toast: true,
                position: 'top-center',
                icon: 'success',
                timer: 3000,
                footer: 'Recargar pagina',
                timerProgressBar: true,
           
                willClose: () => {
                  location.reload()
                }
              })
        } else {
            throw data
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
})

updateProfilePictureForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addProfilePictureForm)

    for (let i = 0; i < profilePicture.length; i++) {
        formData.append('profile', profilePicture[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/profilechanges`, {
            method: 'PUT',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Exito',
                toast: true,
                position: 'top-center',
                icon: 'success',
                timer: 3000,
                footer: 'Recargar pagina',
                timerProgressBar: true,

                willClose: () => {
                    location.reload()
                }
            })
        } else {
            throw data
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
})
// Role change form

changeRoleForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'POST'
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Permisos cambiados con exito',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
          
                willClose: () => {
                  window.location.href = '/'
                }
              })
            await fetch('/api/sessions/logout')
        } else {
            throw data
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
})



checkDocumentationForm.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`/api/users/${uid}/status`)
        const docs = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                html: `<p>Aceptado</p>`,
                icon: 'error',
                timer: 4000,
                footer: 'Recargar pagina',
                timerProgressBar: true,
    
                willClose: () => {
                    location.reload()
                }
            })
   
        } else {
            throw data
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
})
Logoutfunction(logout)