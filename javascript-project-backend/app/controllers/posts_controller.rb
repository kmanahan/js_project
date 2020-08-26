class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: posts
    end 

    def show
        post = Post.find(params[:id]) 
        render json: post
    end 

    def create
        post = Post.new(post_params)
        render json: post.save
    end 

    def destroy 
        post = Post.find(params[:id])
        post.destroy
    end 
end

