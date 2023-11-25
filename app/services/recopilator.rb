class Recopilator < SolidService::Base
  def call
    success!(response: game.already_scraped? ? game : joint_information)

    error!(response: 'Algo salio mal')
  end

  # INFORMATION
    # rawg RATINGS?
    # "ratings"=>
    # [{"id"=>4, "title"=>"recommended", "count"=>1597, "percent"=>46.67},
    #  {"id"=>3, "title"=>"meh", "count"=>892, "percent"=>26.07},
    #  {"id"=>5, "title"=>"exceptional", "count"=>550, "percent"=>16.07},
    #  {"id"=>1, "title"=>"skip", "count"=>383, "percent"=>11.19}],

  private

  def joint_information
    data = { already_scraped: true }

    data.merge!(igdb_data) if igdb.present?
    data.merge!(rawg_data) if rawg.present?

    game.update(data)

    game.reload
    game
  end

  def igdb_data
    {
      igdb_id: igdb['id'],
      igdb_rating: igdb['aggregated_rating'],
      igdb_name: igdb['name'],
      igdb_slug: igdb['slug'],
      igdb_summary: igdb['summary'],
      igdb_url_igdb: igdb['url']
    }
  end

  def rawg_data
    {
      rawg_id: rawg['id'],
      rawg_name: rawg['name'],
      rawg_released: rawg['released'],
      background_image: rawg['background_image'],
      rawg_rating: rawg['rating'],
      rawg_metacritic: rawg['metacritic'],
      rawg_platforms: scrap_names(rawg['platforms'].flat_map(&:values)),
      rawg_stores: scrap_names(rawg['stores'].flat_map(&:values)),
      rawg_esrb_rating: rawg['esrb_rating']['name'],
      rawg_genres: scrap_names(rawg['genres'])
    }
  end

  def game_data
    {
      steam_store_url: game.store_url,
      steam_store_uscore: game.store_uscore,
      steam_full_price: game.full_price,
      steam_current_price: game.current_price,
      steam_developers: game.developers,
      steam_publishers: game.publishers,
      steam_languages: game.languages,
      steam_igdb_score: game.igdb_score,
      steam_igdb_url: game.igdb_url,
      steam_igdb_popularity: game.igdb_popularity,
      steam_meta_score: game.meta_score,
      steam_meta_url: game.meta_url
    }
  end

  def igdb
    @igdb ||= IgdbConnection.call(name: game_name).response
  end

  def rawg
    @rawg ||= RawgConnection.call(name: game_name, page_size: 1).response
  end

  def game
    regex = Regexp.new(Regexp.escape(game_name), 'i') # 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas

    @game ||= Game.where(name: regex).first
  end

  def scrap_names(collection)
    collection.map { |hash| hash['name'] }.join(', ')
  end

  def game_name
    @name ||= params[:name]
  end
end

# VALID GAMES
# Counter-Strike: Global Offensive
# Need for Speed Undercover
# Grand Theft Auto IV
# FIFA 21
# God of War
