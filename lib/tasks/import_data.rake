namespace :import_data do
  task steamdb: :environment do
    require 'json'

    json_data = File.read('steamdb.json')
    data_array = JSON.parse(json_data)

    data_array.map! do |game_data|
      {
        name: game_data['name'],
        store_url: game_data['store_url'],
        store_uscore: game_data['store_uscore'],
        published_meta: game_data['published_meta'],
        published_igdb: game_data['published_igdb'],
        full_price: game_data['full_price'],
        current_price: game_data['current_price'],
        developers: clear_collection(game_data['developers']),
        publishers: clear_collection(game_data['publishers']),
        languages: clear_collection(game_data['languages']),
        meta_score: game_data['meta_score'],
        meta_url: game_data['meta_url'],
        igdb_url: game_data['igdb_url'],
        igdb_score: game_data['igdb_score'],
        igdb_popularity: game_data['igdb_popularity'],
      }
    end

    Game.collection.insert_many(data_array)

    puts 'Importación masiva completada.'
  end

  private

  def clear_collection(collection)
    return if collection.blank? || collection.is_a?(Integer)

    collection.split(',').map(&:strip).join(', ')
  end
end
