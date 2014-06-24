class PhotoController < ApplicationController
  before_filter :authenticate, only: [:index, :create]
 
  def index
    @photos = @user.photos.map { |p| {"id" => p.id, "url" => p.url, "title" => p.title }
  end

  def create
    return unless validate_params [:upload, :title]

    file = params[:upload]

    unless Photo.file_valid? file
      render json: { status: 422, error: "Invalid file" }, status: 422
    end

    @photo = @user.photos.create(title: params[:title])
    @photo.save!
    @photo.upload file

    render json: { status: 200 }
  end

end
