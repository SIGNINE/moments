class PhotoController < ApplicationController
  before_filter :authenticate, only: [:index, :create]

  def create
    @photo = @user.photos.create(photos_param)

    if @photo.save
      render json: { status: 200 }
    else 
      render json: { status: 500 }
    end
  end

  private

  def photos_param
    params.permit(:pic, :title)
  end
end
