class CommentsController < ApplicationController
    def index 
       comments = Comment.all
        render json: CommentSerializer.new(comments)
    end 
    

    def create
        post = Post.find_by(id: params[:comment][:post_id])
        comment = Comment.new(comment_params)
        comment.save
        render json: comment
    end 

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
    end 
end
