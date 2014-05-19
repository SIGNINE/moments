class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def validate_params params_list
    missing_params = []
    params_list.each do |p|
      missing_params << p unless params.include?(p) && params[p] != ''
    end

    unless missing_params.empty? 
      render json: { status: 422, error: "Missing params: #{missing_params}" }, status: 422
      false
    else
      true
    end
  end
end
