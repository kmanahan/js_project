class Post {
    constructor(id, post) {
        this.id = id; 
        this.caption = post.caption;
        this.comments = post.comments
        this.url = post.url;
        Post.all.push(this);
    }

    static findById(id){
        return this.all.find(post => post.id === id);
    }

    renderPostCard() {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const url = document.createElement('img')
        const ul = document.createElement('ul')
        const button = document.createElement('button')
        const addButton = document.createElement('button')
        const commentInput = document.createElement('input')
        const form = document.createElement('form')
        const input = document.createElement('input')
        const inputUrl = document.createElement('input')
        const eButton = document.createElement('input')
       

        this.comments.forEach(c => {
            const li = document.createElement('li')
            li.innerHTML = c.comment
            ul.appendChild(li)
        }) 

        div.id = 'posts-card'
        div.dataset.id = this.id 
        
        h3.innerText = this.caption
        h3.id = 'post-caption'
        url.src = this.url 
        url.id = 'post-url'

        button.innerText = 'delete'
        button.dataset.id = this.id 
        button.id = 'delete'
        button.addEventListener('click', deletePost)

        commentInput.dataset.id = this.id
        commentInput.id = 'comment'

        addButton.innerText = 'add a comment'
        addButton.dataset.id = this.id 
        addButton.id = 'add'
        addButton.addEventListener('click', commentHandler)

        form.dataset.id = this.id
        form.id = 'edit-form'
        form.addEventListener('submit', editPost)

        input.placeholder = 'edit caption'
        input.id = 'edit-caption'
        input.type = 'text'
        input.name = 'caption'

        inputUrl.placeholder = 'edit image'
        inputUrl.id = 'edit-image'
        inputUrl.type = 'text'
        inputUrl.name = 'image'

        eButton.value = 'edit'
        eButton.id = 'edit'
        eButton.type = 'submit'
        eButton.class = 'input-text'
        eButton.name = 'submit-edit'
        eButton.dataset.id = this.id 
        

        form.appendChild(input)
        form.appendChild(inputUrl)
        form.appendChild(eButton)

        div.append(h3,url,ul,commentInput,addButton,form,button)
        div.dataset.id = this.id
        const container = document.querySelector('#post-container')

        container.append(div)

      }
       
}

Post.all = []