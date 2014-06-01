class CircleController < ApplicationController
  before_filter :authenticate, only: [:index, :create]

  def index
    respond_to do |f|
      f.json do
        @circles = @user.circles.map { |c| { "name"=> c.name, "id"=> c.id } }  
      end
    end
  end

  def create
    respond_to do |f|

      f.json do
        @circle = @user.circles.create(name: params[:name])

        unless @circle.valid?
          render json: { status: 422, error: @circle.errors.messages }, status: 422 
          return
        end

        @circle.save
      end
  end

end
