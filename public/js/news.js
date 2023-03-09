function addNews() {
    const btn = document.getElementById('btnAddNews')
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let tittle = document.getElementById('tittle').value
        let category_idForm = document.getElementById('category_idForm')
        let category_id = category_idForm.options[category_idForm.selectedIndex].value
        let body = document.getElementById('body').value
        let fd = new FormData();
        fd.append("newsImg", document.getElementById("newsImg").files[0]);
        const data = {
            tittle,
            category_id,
            body
        }
        fd.append("data", JSON.stringify(data))
        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            let token = JSON.parse(localStorage.getItem('token'))
            const res = await fetch(`https://isekainews.up.railway.app/news/`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'x-access-token': token
                },
                body: fd
            })
            console.log(res)
            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Genial!',
                    text: `Noticia creada exitosamente`
                })
                location.href = "/index.html"
            } else {
                if (res.status == 401 || res.status == 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: `Debes iniciar sesión para crear una noticia.`
                    })
                } if (res.status == 402) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: `Debes elegir una categoria.`
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: `Error, recuerda iniciar sesion`
                    })
                }
            }
        }
    })
}

addNews()

function renderCards() {
    console.log('first')
    fetch("https://isekainews.up.railway.app/allnews")
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerNews = document.getElementById('containerNews')
            const fragment = document.createDocumentFragment()
            const templateCards = document.getElementById('templateCards').content;

            data.forEach(news => {
                let imgCard = templateCards.getElementById('imgCard')
                let categoryCard = templateCards.getElementById('categoryCard')
                let authorCard = templateCards.getElementById('authorCard')
                let titleCard = templateCards.getElementById('titleCard')
                const categories = ['Juegos', 'Anime', 'Japón']
                imgCard.src = `/img/uploads/${news.img}`
                imgCard.alt = news.tittle
                authorCard.textContent = news.tittle
                categoryCard.textContent = categories[news.category_id - 1]
                titleCard.href = `/news?id=${news.id}`
                titleCard.textContent = news.tittle
                const clone = templateCards.cloneNode(true)

                fragment.appendChild(clone)
            })
            console.log(fragment)
            containerNews.appendChild(fragment)
        })
}

renderCards()