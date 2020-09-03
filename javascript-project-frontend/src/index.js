const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`

document.addEventListener('DOMContentLoaded', () => {
  
    loadPosts() 
    let createForm = document.querySelector('#add-post')
    createForm.addEventListener('submit', (e) => createFormHandler(e))
})

function loadPosts() {
    fetch(POSTS_URL)
        .then(res => res.json())
        .then(posts => {
            posts.data.forEach(post => {
                const newPost = new Post(post.id, post.attributes)
                document.querySelector('#post-container').innerHTML += newPost.renderPostCard()
            })
        });
}

// function createFormHandler(e) {
//     e.preventDefault() 
//     const caption = document.querySelector('#caption').value
//     const url = document.querySelector('#url').value
//     postPost(caption, url)
// }

// function postPost(caption, value) {
// let data = {caption, value}

// fetch(POSTS_URL, {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(data)
//   })
//   .then(resp => resp.json())
//   .then(posts => {
//       console.log(posts);
//       const postData = posts.data
//       debugger
//       const postMarkup = 
//       `
//                 <div data-id=${posts.id}>
//                   <h3>${postData.attributes.caption}</h3>
//                   <img src=${postData.attributes.url} height="200" width="250">
//                   <p>${postData.attributes.comments}
//                   <button data-id=${postData.id}>edit</button>
//                 </div>
//                 <br><br>`
//                 document.querySelector(`#post-container`).innerHtml += postMarkup
//             })
//         }
// function render(posts) {
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

// const renderPost = (postHash) => {
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

// const deletePost = (e) => {
//     e.preventDefault()
//     const configObj = {
//         method:"DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//     }
//         fetch(`${POSTS_URL}/${e.target.dataset.id}`, configObj)
//         e.target.parentElement.remove()
// }


// const editPost = (e) => {
// const post = parseInt(e.target.dataset.id)
// const captionText = e.target.querySelector('#edit-caption').value
// const imageUrl = e.target.querySelector('#edit-url').value
// const render = document.querySelector('#update-post')
// render.innerHTML = post.renderPost
// updatePost(post, captionText, imageUrl, render)
// }


// function updatePost(post){
//     editHash = {post}
//     const configObj = {
//         method:"PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(editHash)
//     }
//     fetch(`${POST_URL}`, configObj)
//     .then(res => res.json())
//     .then(edited => console.log(edited))
// }