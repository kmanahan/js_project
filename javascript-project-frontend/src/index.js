const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`
const main = document.querySelector('main')
let form = document.getElementById('add-post')
let editForm = document.getElementById('edit-post')
const editButton = document.getElementsByClassName('update')

document.addEventListener('DOMContentLoaded', () => {
    loadPosts()
})

form.addEventListener("submit", (e) => createPost(e))
// editForm.addEventListener("submit", (e) => editPost(e))

function loadPosts() {
    fetch(POSTS_URL)
        .then(res => res.json())
        .then(posts => {
            posts.data.forEach(post => {
                const postMarkup = `
                <div data-id=${post.id}>
                  <h3>${post.title}</h3>
                  <img src=${post.url} height="200" width="250">

                  <button data-id=${post.id}>edit</button>
                </div>
                <br><br>`
                document.querySelector(`#post-container`).innerHtml += postMarkup
            })
        });
}

// const loadPosts = () => {
//     fetch(POSTS_URL)
//     .then(response => response.json())
    // .then(json => {
    //     json.forEach(post => renderPost(post))
    // })
//     .then(posts => {
//         posts.data.forEach(post => {
//             const newPost = new Post(post.id, post.attributes)
//             document.querySelector('#main').innerHTML += newPost.renderPostCard()
//         })
//     })
// }

const renderPost = (postHash) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const img = document.createElement('img')
    const button = document.createElement('button')
    const updateButton = document.createElement('button')
  
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', postHash.id)

    img.setAttribute('src', postHash.url)
    img.setAttribute('class', 'card')
    button.setAttribute('class', "delete")
    button.setAttribute('data-id', postHash.id)
    button.addEventListener('click', deletePost)
    button.innerHTML = 'Delete'

    updateButton.setAttribute('class', 'update')
    updateButton.setAttribute('data-id', postHash.id)
    updateButton.addEventListener('click', editPost)
    updateButton.innerHTML = 'Edit'

    
    p.innerHTML = postHash.caption

    div.appendChild(p)
    div.appendChild(img)
    div.appendChild(button)
    div.appendChild(updateButton)
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
    const formData = {caption, url}

    const configObj ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch(POSTS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {renderPost(json)})
}

const deletePost = (e) => {
    e.preventDefault()
    const configObj = {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
        fetch(`${POSTS_URL}/${e.target.dataset.id}`, configObj)
        e.target.parentElement.remove()
}


const editPost = (e) => {
const post = parseInt(e.target.dataset.id)
const captionText = e.target.querySelector('#edit-caption').value
const imageUrl = e.target.querySelector('#edit-url').value
const render = document.querySelector('#update-post')
render.innerHTML = post.renderPost
updatePost(post, captionText, imageUrl, render)
}


function updatePost(post){
    editHash = {post}
    const configObj = {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editHash)
    }
    fetch(`${POST_URL}`, configObj)
    .then(res => res.json())
    .then(edited => console.log(edited))
}