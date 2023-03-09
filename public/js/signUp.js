function register() {
    const btn = document.getElementById('btnSendRegister')
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let username = document.getElementById('usernameRegister').value
        let password = document.getElementById('password1').value
        let password2 = document.getElementById('password2').value
        console.log(password)
        console.log(password2)

        if (password !== password2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden'
            })
        } else {
            const data = {
                username,
                password
            }
            if (!Object.values(data).every(value => value != '')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes rellenar todos los campos!'
                })
            } else {
<<<<<<< HEAD
                fetch(`https://isekainews.up.railway.app/register/`, {
=======
                fetch(`http://localhost:3000/register/`, {
>>>>>>> 877011aef818f3617976fdec3fdfef0d34cb15df
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(res => {
                        if (res.auth) {
                            console.log(res)
                            localStorage.setItem('token', JSON.stringify(res.token))
                            Swal.fire({
                                icon: 'success',
                                title: 'Genial!',
                                text: `Te has registrado correctamente`
                            })
                            location.href = "/index.html"
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${res.message}`
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    })
}



register()