const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`

document.addEventListener('DOMContentLoaded', () => {
    loadPosts() 
    const createForm = document.querySelector('#add-post')
    createForm.addEventListener('submit', (e) => createFormHandler(e))

})

function loadPosts() {
    fetch(POSTS_URL)
        .then(res => res.json())
        .then(posts => {
            posts.data.forEach(post => {
                const newPost = new Post(post.id, post.attributes)
                newPost.renderPostCard()
            })
        });
}

function createFormHandler(e) {
    e.preventDefault() 
    const caption = document.querySelector('#caption').value
    const url = document.querySelector('#url').value
    fetchPost(caption, url)
}


function fetchPost(caption, url) {
let data = {caption, url}
const configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"},
    body: JSON.stringify(data)
}
 fetch(POSTS_URL, configObj)   
  .then(resp => resp.json())
  .then(posts => {
      const post = posts.data
      let newPost = new Post(post, post.attributes)
                newPost.renderPostCard()
            })
}


// function render(postData) {
//     const postMarkup = 
//       `
//                 <div data-id=${postData.id}>
//                   <h3>${postData.attributes.caption}</h3>
//                   <img src=${postData.attributes.url} height="200" width="250">
//                   <p>${postData.attributes.comments}
//                   <button data-id=${postData.id}>edit</button>
//                 </div>
//                 <br><br>`
//                 document.querySelector(`#post-container`).innerHtml += postMarkup
// }
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

// const renderPosts = (postHash) => {

//     const main = document.querySelector('main')
//     const div = document.createElement('div')
//     const p = document.createElement('p')
//     const img = document.createElement('img')
//     const button = document.createElement('button')
//     const updateButton = document.createElement('button')
  
//     div.setAttribute('class', 'card')
//     div.setAttribute('data-id', postHash.id)

//     img.setAttribute('src', postHash.url)
//     img.setAttribute('class', 'card')
//     button.setAttribute('class', "delete")
//     button.setAttribute('data-id', postHash.id)
//     button.addEventListener('click', deletePost)
//     button.innerHTML = 'Delete'

//     updateButton.setAttribute('class', 'update')
//     updateButton.setAttribute('data-id', postHash.id)
//     updateButton.addEventListener('click', editPost)
//     updateButton.innerHTML = 'Edit'

    
//     p.innerHTML = postHash.caption

//     div.appendChild(p)
//     div.appendChild(img)
//     div.appendChild(button)
//     div.appendChild(updateButton)
//     main.appendChild(div)
  
//     postHash.comments.forEach(comment => renderComment(comment))
// } 

// const renderComment = (comment) => {
//     const ul = document.querySelector(`[data-id="${comment.post_id}"]`)
//     const li = document.createElement('li')

//     li.innerHTML = `${comment.comment}`

//     ul.appendChild(li)
// }


// const createPost = (e) => {
//     e.preventDefault()
//     const captionText = document.querySelector('#caption').value
//     const imageUrl = document.querySelector('#url').value
//     fetchPost(captionText, imageUrl)
// }

// function fetchPost(caption, url) {
//     const formData = {caption, url}

//     const configObj ={
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(formData)
//     }

//     fetch(POSTS_URL, configObj)
//     .then(resp => resp.json())
//     .then(json => {renderPost(json)})
// }
function renderEdit() {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const cap = document.createElement('p')
    const u = document.createElement('p')
    // const capInput = document.createElement('input')
    // const urlInput = document.createElement('input')
    // urlInput.setAttribute('class', 'edit-url')
    // capInput.setAttribute('class', 'edit-caption')
    const capInput = document.getElementById('edit-caption')
    const urlInput = document.getElementById('edit-url')
    
    const button = document.createElement('button')

    h3.innerHTML = 'Edit Post'
    cap.innerHTML = 'caption'
    u.innerHTML = 'image url'
    capInput.innerText = this.caption
    urlInput.src = this.url

    button.innerText = 'submit'
    button.dataset.id = this.id 
    button.addEventListener('click',editPost)
    div.append(h3,cap,capInput,u,urlInput,button)
    div.dataset.id = this.id
    const container = document.querySelector('#edit-container')
    container.append(div)
    
}



const editPost = (e) => {
    e.preventDefault()
    const button = document.getElementById('edit')
    const id = button.dataset.id
    // const id = parseInt(e.target.dataset.id)
    const post = Post.findById(id)
    const captionText = document.getElementById('edit-caption').value
    const imageUrl = document.getElementById('edit-url').value
    updatePost(post, captionText, imageUrl)
}


// function updatePost(post, caption, url){
//     editHash = {caption, url}
//     const configObj = {
//         method:"PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(editHash)
//     }
//     fetch(`${POSTS_URL}/${post.id}`, configObj)
//     .then(res => res.json())
//      .then(posts => {
//       const post = posts.data
//       let newPost = new Post(post, post.attributes)
//                 newPost.loadPosts
//             })
// }

function updatePost(post, caption, url){
    editHash = {caption, url}
    const configObj = {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editHash)
    }
    fetch(`${POSTS_URL}/${post.id}`, configObj)
    .then(res => res.json())
    .then(posts => {
        const post = posts.data
        let newPost = new Post(post, post.attributes)
                  newPost.renderPostCard()
              })
}


const deletePost = (e) => {
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
