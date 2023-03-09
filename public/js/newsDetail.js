const urlSearchParams = new URLSearchParams(window.location.search);
function renderNews() {
    const id = urlSearchParams.get("id");
<<<<<<< HEAD
    fetch(`https://isekainews.up.railway.app/newss/${id}`)
=======
    fetch(`http://localhost:3000/newss/${id}`)
>>>>>>> 877011aef818f3617976fdec3fdfef0d34cb15df
        .then((resp) => resp.json())
        .then(news => {
            console.log(news)
            let imgNews = document.getElementById('imgNews')
            let categoryNews = document.getElementById('categoryNews')
            let tittleNews = document.getElementById('tittleNews')
            let dateNews = document.getElementById('dateNews')
            let bodyNews = document.getElementById('bodyNews')
            const categories = ['Juegos', 'Anime', 'Japón']
            imgNews.src = `/img/uploads/${news.img}`
            imgNews.alt = news.tittle
            dateNews.textContent = news.createdAt.slice(0, 10)
            bodyNews.textContent = news.body
            categoryNews.textContent = categories[news.category_id - 1]
            tittleNews.textContent = news.tittle
<<<<<<< HEAD
            fetch(`https://isekainews.up.railway.app/users/${news.author}`)
=======
            fetch(`http://localhost:3000/users/${news.author}`)
>>>>>>> 877011aef818f3617976fdec3fdfef0d34cb15df
                .then((resp) => resp.json())
                .then(user => {
                    console.log(user)
                    let authorNews = document.getElementById('authorNews')
                    authorNews.textContent = user.username
                })
        })
}

renderNews()
