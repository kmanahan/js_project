class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :comment, post_id 
  belongs_to :post
end
