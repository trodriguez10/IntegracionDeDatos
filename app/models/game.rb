class Game
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :id_rawg, type: Integer
end
