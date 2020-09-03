class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :caption, :url
  has_many :comments
end
