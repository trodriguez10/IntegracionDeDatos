class Game
  include Mongoid::Document
  include Mongoid::Timestamps

  field :already_scraped, type: Boolean, default: false
  field :name, type: String

  # RAWG
  field :rawg_id, type: Integer
  field :rawg_name, type: String
  field :rawg_released, type: String
  field :background_image, type: String
  field :rawg_rating, type: String # Or integer
  field :rawg_metacritic, type: String # Or integer
  field :rawg_platforms, type: String
  field :rawg_stores, type: String
  field :rawg_esrb_rating, type: String
  field :rawg_genres, type: String

  # IGDB
  field :igdb_id, type: Integer
  field :igdb_rating, type: Integer
  field :igdb_name, type: String
  field :igdb_slug, type: String
  field :igdb_summary, type: String
  field :igdb_url_igdb, type: String

  # STEAM
  field :store_url, type: String
  field :store_uscore, type: String
  field :full_price, type: Integer
  field :current_price, type: Integer
  field :developers, type: String
  field :publishers, type: String
  field :languages, type: String
  field :meta_score, type: String
  field :meta_url, type: String
  field :igdb_url_steam, type: String
  field :igdb_score, type: String
  field :igdb_popularity, type: String

  def game_name
    igdb_name || rawg_name || name
  end

  def igdb_url
    igdb_url_igdb || igdb_url_steam
  end

  def parse_game
    self.as_json
        .except(*fields_to_exclude)
        .merge!({ name: game_name, igdb_url: igdb_url })
        .symbolize_keys
  end

  private

  def fields_to_exclude
    %w[already_scraped created_at updated_at igdb_url_igdb igdb_url_steam igdb_name rawg_name name]
  end
end
