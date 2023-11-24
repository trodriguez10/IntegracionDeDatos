namespace :import_data do
  task steamdb: :environment do
    require 'json'

    json_data = File.read('steamdb.json')
    data_array = JSON.parse(json_data)

    data_array.map! do |game_data|
      binding.pry
      {
        name: game_data['name'],
        # ADD MORE RELEVANT FIELDS
      }
    end

    Game.collection.insert_many(data_array)

    puts 'Importación masiva completada.'
  end
end

# {
#   "sid"=>10,
#   "tags"=>
#    "Action,FPS,Multiplayer,Shooter,Classic,Team-Based,First-Person,Competitive,Tactical,1990's,e-sports,PvP,Military,Strategy,Score Attack,Survival,Assassin,1980s,Ninja,Tower Defense",
#   "achievements"=>nil,
#   "gfq_url"=>"https://gamefaqs.gamespot.com/pc/429818-counter-strike?ftag=MCD-06-10aaa1f",
#   "gfq_difficulty"=>"Just Right-Tough",
#   "gfq_difficulty_comment"=>
#    "<a href=\"/games/rankings?platform=19&amp;genre=54&amp;list_type=diff&amp;dlc=1&amp;page=33&amp;game_id=429818&amp;min_votes=2#1656\"><b>#1656</b></a> hardest PC action game (<a href=\"/games/rankings?platform=19&amp;list_type=diff&amp;dlc=1&amp;page=111&amp;game_id=429818&amp;min_votes=2#5600\"><b>#5600</b></a> on PC, <b>#22929</b> overall)",
#   "gfq_rating"=>3.9,
#   "gfq_rating_comment"=>
#    "<a href=\"/games/rankings?platform=19&amp;genre=54&amp;list_type=rate&amp;dlc=1&amp;page=21&amp;game_id=429818&amp;min_votes=2#1079\"><b>#1079</b></a> highest rated PC action game (<a href=\"/games/rankings?platform=19&amp;list_type=rate&amp;dlc=1&amp;page=121&amp;game_id=429818&amp;min_votes=2#6055\"><b>#6055</b></a> on PC, <b>#18721</b> overall)",
#   "gfq_length"=>64.5,
#   "gfq_length_comment"=>
#    "<a href=\"/games/rankings?platform=19&amp;genre=54&amp;list_type=time&amp;dlc=1&amp;game_id=429818&amp;min_votes=2#46\"><b>#46</b></a> longest PC action game (<a href=\"/games/rankings?platform=19&amp;list_type=time&amp;dlc=1&amp;page=15&amp;game_id=429818&amp;min_votes=2#773\"><b>#773</b></a> on PC, <b>#2305</b> overall)",
#   "stsp_owners"=>15000000,
#   "stsp_mdntime"=>200,
#   "hltb_url"=>"https://howlongtobeat.com/game?id=1953",
#   "hltb_single"=>nil,
#   "hltb_complete"=>nil,
#   "meta_url"=>"https://www.metacritic.com/game/pc/counter-strike?ftag=MCD-06-10aaa1f",
#   "meta_score"=>88,
#   "meta_uscore"=>92,
#   "grnk_score"=>nil,
#   "igdb_url"=>"https://www.igdb.com/games/counter-strike",
#   "igdb_single"=>nil,
#   "igdb_complete"=>nil,
#   "igdb_score"=>70,
#   "igdb_uscore"=>83,
#   "igdb_popularity"=>25.74
# }
