const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => loadPosts())

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
    const ul = document.createElement('p')

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


const createPost = (event) => {
    const postForm = document.createElement('container')
    const button = document.createElement('button')
    const input = document.createElement('input')
    
    button.setAttribute("class", "addPost")
    button.innerHTML = "Create Post"
    button.addEventListener('click')
    
    postForm.appendChild(button)
    postForm.appendChild(input)
    

    
    event.preventDefault()
    const configObj ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            caption: post.caption.value,
            url: post.url.value, 
        })
    }

    fetch(POST_URL, configObj)
    .then(resp => resp.json())
    .then(json => {renderPost(json)})
}

