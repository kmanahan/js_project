class CommentsController < ApplicationController
    def index
        comment = Comment.all
        render json: comment
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
