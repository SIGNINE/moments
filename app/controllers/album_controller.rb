class AlbumController < ApplicationController
  before_filter :authenticate, only: [:index, :create]

  def index
    @albums = @user.albums.map { |a| { "title" => a.title, "id" => a.id } }

    respond_to do |f|
      f.json 
    end
  end

  def create
    respond_to do |f|
      f.json do
        @album = @user.albums.create(title: params[:title])
        unless @album.valid?
          render json: { status: 422, error: @album.errors.messages }, status: 422 
          return
        end

        @album.save
      end
    end
  end

end
