class Comment {
    constructor(id, postComment) {
        this.id = id; 
        this.comment = postComment.comment
        Comment.all.push(this);
    }
}

Comment.all = []