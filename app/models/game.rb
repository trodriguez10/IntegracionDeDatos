class Game
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  fiels :id_rawg, type: Integer
end
