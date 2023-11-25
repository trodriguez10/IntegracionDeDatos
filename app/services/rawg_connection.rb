# USE HTTP PARTY / SOMETHING SIMILAR TO CONNECT TO THE API

class RawgConnection < SolidService::Base
  API_KEY = 'd8e03b4f29354cd5b76be7f5201f047d'
  RAWG_URL = 'https://api.rawg.io/api'

  def call
    response = get_games(params[:name], params[:page_size])

    if response.env.status.to_s.start_with?('4')
      fail!(error: 'There was an error with at least one of the files')
    else
      game = JSON.parse(response.env.response_body)['results'].first
      success!(response: filter_response(game))
    end
  end

  def filter_response(game)
    game.slice(*filters)
  end

  def filters
    %w[id name background_image platforms stores released rating metacritic esrb_rating genres]
  end

  def get_games(name, limit)
    Faraday.get("#{RAWG_URL}/games?key=#{API_KEY}&search=#{name}&page_size=#{limit || 40}", "Content-Type" => "application/json")
  end
end
