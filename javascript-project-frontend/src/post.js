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
        const eButton = document.createElement('button')

        this.comments.forEach(c => {
            const li = document.createElement('li')
            li.innerHTML = c.comment
            ul.appendChild(li)
        }) 

        h3.innerText = this.caption
        url.src = this.url 

        eButton.innerText = 'edit'
        eButton.id = 'edit'
        eButton.dataset.id = this.id 
        eButton.addEventListener('click', renderEdit)

        button.innerText = 'delete'
        button.dataset.id = this.id 
        button.id = 'delete'
        button.addEventListener('click', deletePost)

        div.append(h3,url,ul,button,eButton)
        div.dataset.id = this.id
        const container = document.querySelector('#post-container')

        container.append(div)

      }
      
       renderPostCard() {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const url = document.createElement('img')
        const ul = document.createElement('ul')
        const button = document.createElement('button')
        const eButton = document.createElement('button')

        this.comments.forEach(c => {
            const li = document.createElement('li')
            li.innerHTML = c.comment
            ul.appendChild(li)
        }) 

        h3.innerText = this.caption
        url.src = this.url 

        eButton.innerText = 'edit'
        eButton.id = 'edit'
        eButton.dataset.id = this.id 
        eButton.addEventListener('click', renderEdit)

        button.innerText = 'delete'
        button.dataset.id = this.id 
        button.id = 'delete'
        button.addEventListener('click', deletePost)

        div.append(h3,url,ul,button,eButton)
        div.dataset.id = this.id
        const container = document.querySelector('#post-container')

        container.append(div)

      }
    

    
 
}

Post.all = []