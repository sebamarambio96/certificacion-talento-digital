function addComments(){
const btn = document.getElementById('btnComment')
console.log(btn)
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id2 = urlSearchParams.get("id");
    let comment = document.getElementById('comments').value
    const data = {
        newsC: id2,
        comment
    }
    console.log(data)
    if (!Object.values(data).every(value => value != '')) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes rellenar todos los campos!'
        })
    } else {
        let tokenC = JSON.parse(localStorage.getItem('token'))
        fetch(`https://isekainews.up.railway.app/comments/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': tokenC
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has comentado`
                    })
                    location.reload
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
)}


addComments()