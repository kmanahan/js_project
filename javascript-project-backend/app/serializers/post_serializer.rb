class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :user_id, :url
  has_many :comments
end
