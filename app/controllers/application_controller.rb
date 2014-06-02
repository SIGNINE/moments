class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session


  protected
  def not_authenticated
    session_id = params[:session_id]
    return if session_id == nil || session_id == ''

    user_id = find_session session_id
    return if user_id == nil
 
    respond_to do |f|
      f.json { render json: { status: 401, error: "User already logged in" }, status: 401 }
    end
  end

  def authenticate
    session_id = params[:session_id] 

    if session_id == nil || session_id == ''
      respond_to do |f|
        f.json { render json: { status: 401, error: "Session id missing" }, status: 401 }
      end
      return
    end

    user_id = find_session session_id
    if user_id == nil
      respond_to do |f|
        f.json { render json: { status: 401, error: "Session id missing" }, status: 401 }
      end
      return
    end

    @user = User.find user_id
  end

  def find_session id
    key = $redis.keys("user-session-*-#{id}").first
    $redis.get(key)
  end

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
