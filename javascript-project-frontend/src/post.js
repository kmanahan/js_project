class Post {
    constructor(id, post) {
        this.id = id; 
        this.caption = post.caption;
        this.url = post.url;
        Post.all.push(this);
    }

    static findById(id){
        return this.all.find(post => post.id === id);
    }

    renderPostCard() {
        return `<div data-id=${this.id}>
                  <h3>${this.caption}</h3>
                  <img src=${this.url} height="200" width="250">

                  <button data-id=${this.id}>edit</button>
                </div>
                <br><br>`;
      }
    

    
    renderEdit() {
        return `
        <form data-id=${this.id}>
        <h3>Edit Post</h3>
        <input id="edit-caption" type="text" name="edit-caption" value="${this.caption}" placeholder="Enter a caption" class="input-text"/>
        <input id="edit-url" type="text" name="edit-url" value="${this.url}" placeholder="Enter image url" class="input-text"/>
        <input id='edit-button' type="submit" name="submit" class="submit"/>
        </form>
        `;
    }
}

Post.all = []