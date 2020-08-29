const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`
const main = document.querySelector('main')
let form = document.getElementById('add-post')


document.addEventListener('DOMContentLoaded', () => loadPosts())

form.addEventListener("submit", (e) => createPost(e))

const loadPosts = () => {
    fetch(POSTS_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(post => renderPost(post))
    })
}

const renderPost = (postHash) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const img = document.createElement('img')

    div.setAttribute('class', 'card')
    div.setAttribute('data-id', postHash.id)

    img.setAttribute('src', postHash.url)
    img.setAttribute('class', 'card')

    p.innerHTML = postHash.caption

    div.appendChild(p)
    div.appendChild(img)
    main.appendChild(div)
    postHash.comments.forEach(comment => renderComment(comment))
} 

const renderComment = (comment) => {
    const ul = document.querySelector(`[data-id="${comment.post_id}"]`)
    const li = document.createElement('li')

    li.innerHTML = `${comment.comment}`

    ul.appendChild(li)
}


const createPost = (e) => {
    e.preventDefault()
    const captionText = document.querySelector('#caption').value
    const imageUrl = document.querySelector('#url').value
    fetchPost(captionText, imageUrl)
}

function fetchPost(caption, url) {
    const data = {caption, url}

    const configObj ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(POSTS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {console.log(json)})
}

