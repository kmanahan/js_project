class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: PostSerializer.new(posts)
    end 

    def show
        post = Post.find(params[:id]) 
        render json: post
    end 

    def create
        post = Post.new(post_params)
        post.save
        render json: PostSerializer.new(post)
    end 

    def update 
        post = Post.find(params[:id])
        post.update(post_params)
        render json: PostSerializer.new(post)
    end 

    def destroy 
        post = Post.find(params[:id])
        post.destroy
    end 

    private 

    def post_params
        params.require(:post).permit(:caption, :url)
    end
end

