class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :caption, :url, :comments
  has_many :comments
end
