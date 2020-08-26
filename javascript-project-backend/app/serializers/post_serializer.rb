class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :user_id, :url
end
