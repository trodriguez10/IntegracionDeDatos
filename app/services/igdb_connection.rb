class IgdbConnection < SolidService::Base
  def call
    success!(response: query_builder)

    fail!(error: 'There was an error')
  end

  private

  def query_builder
    connection = Faraday.new('https://api.igdb.com/v4/games/')

    response = connection.post do |req|
      req.headers['Client-ID'] = client_id
      req.headers['Authorization'] = "Bearer #{access_token}"
      req.params['search'] = 'Counter-Strike: Global Offensive'
      req.body = 'fields name;'
    end

    search_results =  JSON.parse(response.body)

    res = connection.post do |req|
      req.headers['Client-ID'] = client_id
      req.headers['Authorization'] = "Bearer #{access_token}"
      req.body = "fields #{igdb_body_fields}; where id = #{search_results.first['id']};"
    end
    res = connection.post do |req|
      req.headers['Client-ID'] = client_id
      req.headers['Authorization'] = "Bearer #{access_token}"
      req.body = "fields #{igdb_body_fields}; where id = 172876;"
    end


    b = JSON.parse(res.body)

    binding.pry
  end

  def authenticate_twitch
    connection = Faraday.new('https://id.twitch.tv/oauth2/token')

    response = connection.post do |req|
      req.params['client_id'] = client_id
      req.params['client_secret'] = client_secret
      req.params['grant_type'] = grant_type
      req.params['redirect_uri'] = redirect_uri
      req.params['response_type'] = 'token'
    end
  end

  def query_params
    params[:query]
  end

  def igdb_body_fields
    %w[
      aggregated_rating involved_companies name platforms rating rating_count slug summary url
    ].join(', ')
  end

  def access_token
    @access_token ||= JSON.parse(authenticate_twitch.body)['access_token']
  end

  def client_id
    @client_id ||= 'dxqm0t99gx0v2runs76utaq5jo65i1'
  end

  def client_secret
    @client_secret ||= 'dy0gpjxmcbhjith5uh3805kksvutus'
  end

  def grant_type
    @grant_type ||= 'client_credentials'
  end

  def redirect_uri
    @redirect_uri ||= 'localhost:3000'
  end
end
