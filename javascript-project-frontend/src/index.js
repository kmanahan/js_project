const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`
const COMMENTS_URL = `${BASE_URL}/comments`

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

function commentHandler(e) {
    e.preventDefault
    const comment = document.querySelector('#comment').value
    fetchComment(comment)
}

function fetchComment(comment) {
    let data = {comment}
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(data)
}
    fetch(COMMENTS_URL, configObj)   
    .then(resp => resp.json())
    .then(comments => {
      const c = comments.data
      let newComment = new Comment(c)
            })
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

// function renderEdit(e) {
//     const id = e.target.dataset.id
//     const div = document.createElement('div')
//     const h3 = document.createElement('h3')
//     const cap = document.createElement('p')
//     const u = document.createElement('p')
//     // const capInput = document.createElement('input')
//     // const urlInput = document.createElement('input')
//     // urlInput.setAttribute('class', 'edit-url')
//     // capInput.setAttribute('class', 'edit-caption')
//     const capInput = document.getElementById('edit-caption')
//     const urlInput = document.getElementById('edit-url')
    
//     const button = document.createElement('button')

//     h3.innerHTML = 'Edit Post'
//     cap.innerHTML = 'caption'
//     u.innerHTML = 'image url'
//     capInput.innerText = this.caption
//     urlInput.src = this.url

//     button.id = 'submit-edit'
//     button.innerText = 'submit'
//     button.dataset.id = this.id 
//     // button.addEventListener('submit', editPost)
//     div.append(h3,cap,capInput,u,urlInput,button)
//     div.dataset.id = this.id
//     const container = document.querySelector('#edit-container')
//     container.append(div)
//     const post = Post.findById(id)
//     editPost(post)
// }

// function editPost(post) {
//     debugger
//     const captionText = document.getElementById('edit-caption').value
//     const imageUrl = document.getElementById('edit-url').value
//     updatePost(post, captionText, imageUrl)
// }

function editPost(e) {
    e.preventDefault()
    const newCaption = e.target.querySelector('#edit-caption').value
    const newUrl = e.target.querySelector('#edit-image').value 
    const card = e.target.parentElement
    const id = e.target.dataset.id
    const post = Post.findById(id)
    post.caption = newCaption
    post.url = newUrl
    // debugger
    // let caption = card.childNodes[0].innerText
    updatePost(post, card)
}

// const editPost = (e) => {
    // e.preventDefault()
    // const button = document.getElementById('edit')
    // const id = button.dataset.id
    // const post = Post.findById(id)
    // const captionText = document.getElementById('edit-caption').value
    // const imageUrl = document.getElementById('edit-url').value
    // const post = e.id 
    // const captionText = e.caption
    // const imageUrl = e.url 
    // const post = e 
    // updatePost(captionText, imageUrl)
    // updatePost(post)
// }


function updatePost(post, card){
    editHash = {post, card}
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
    .then(postData => {
        const newCaption = card.querySelector('#edit-caption').value 
        const newUrl = card.querySelector('#edit-image').value 
        card.querySelector('h3').innerHTML = newCaption
        card.querySelector('#post-url').src = newUrl
        console.log('success', postData)
        // postData.data.attributes.caption = newCaption

        // const p = data.data.id
        // const captionText = document.getElementById('edit-caption').value
        // const imageUrl = document.getElementById('edit-url').value
        // let pcaption = post.data.attributes.caption 
        // let purl = post.data.attributes.url 
        // let pcaption = p.caption 
        // let purl = p.url 
        // pcaption = captionText
        // purl = imageUrl
        // document.querySelector('#post-caption').innerHTML = newCaption
        // document.querySelector('#post-url').src = imageUrl
    })
              .catch(err => { console.log(err) })
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

