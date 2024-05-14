class RawgConnection < SolidService::Base
  API_KEY = Rails.application.credentials.dig(:rawg, :api_key).freeze
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
    Faraday.get(
      "#{RAWG_URL}/games?key=#{API_KEY}&search=#{name}&page_size=#{limit || 40}", 
      "Content-Type" => "application/json"
    )
  end
end
