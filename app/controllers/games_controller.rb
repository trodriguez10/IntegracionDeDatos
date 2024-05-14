class GamesController < ApplicationController
  def index; end

  def show
    response = Recopilator.call(name: game_params[:name])

    if response.success?
      render json: response.game.parse_game, status: 200
    else
      render json: { error: response.error }, status: 404
    end
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end
end
