class IgdbConnection < SolidService::Base
  CLIENT_ID = Rails.application.credentials.dig(:igdb, :client_id).freeze
  CLIENT_SECRET = Rails.application.credentials.dig(:igdb, :client_secret).freeze
  REDIRECT_URI = 'localhost:3000'.freeze

  def call
    success!(response: query_builder)

    fail!(error: 'There was an error')
  end

  private

  def query_builder
    connection = Faraday.new('https://api.igdb.com/v4/games/')

    response = connection.post do |req|
      req.headers['Client-ID'] = CLIENT_ID
      req.headers['Authorization'] = "Bearer #{access_token}"
      req.params['search'] = game_name
      req.body = 'fields name;'
    end

    search_results =  JSON.parse(response.body)

    res = connection.post do |req|
      req.headers['Client-ID'] = CLIENT_ID
      req.headers['Authorization'] = "Bearer #{access_token}"
      req.body = "fields #{igdb_body_fields}; where id = #{search_results.first['id']};"
    end

    JSON.parse(res.body).first
  end

  def authenticate_twitch
    connection = Faraday.new('https://id.twitch.tv/oauth2/token')

    response = connection.post do |req|
      req.params['client_id'] = CLIENT_ID
      req.params['client_secret'] = CLIENT_SECRET
      req.params['grant_type'] = 'client_credentials'
      req.params['redirect_uri'] = REDIRECT_URI
      req.params['response_type'] = 'token'
    end
  end

  def igdb_body_fields
    %w[
      aggregated_rating involved_companies name platforms rating rating_count slug summary url
    ].join(', ')
  end

  def access_token
    @access_token ||= JSON.parse(authenticate_twitch.body)['access_token']
  end

  def game_name
    params[:name]
  end
end
