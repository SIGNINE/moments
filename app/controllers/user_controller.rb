require 'digest/sha1'

class UserController < ApplicationController
  before_filter :not_authenticated, only: [:login]

  def login
    respond_to do |format|
      format.json do
        return unless validate_params [:email, :password]

        user = User.find_by_email params[:email]
        if user == nil
          render json: { status: 400,  error: "User with email: #{params[:email]} does not exit" }, status: 400 
          return
        end

        if password_matches? user.password, params[:password]
          register_session user.id
          render json: { status: 200 }
        else
          render json: { status: 401, error: "Wrong password" }, status: 401
        end

      end
    end
  end

  # register
  def create
    respond_to do |format|
      format.json do
        return unless validate_params [:email, :password]

        if user_exists? params[:email]
          render json: { status: 422, error: "Email: #{params[:email]} already exists"}, status: 422
          return
        end

        user = User.new(email: params[:email], password: params[:password])
        unless user.valid?
          render json: { status: 422, error: user.errors.messages }, status: 422 
          return
        end

        user.password = hashify_password params[:password]

        begin 
          user.save!
          render json: { status: 200 }
        rescue Exception => e
          logger.error "User save failed: #{user}"
          render json: { status: 500, error: "User save failed" }, status: 500
        end

      end
    end
  end

  private

  def user_exists? email
    User.find_by_email(email) != nil
  end

  def hashify_password password
    salt = generate_salt
    hashed = Digest::SHA1.base64digest(password + salt)
    salt + hashed
  end

  def password_matches? user_pass, provided_pass
    salt = user_pass[0..9]
    hashed_pass = Digest::SHA1.base64digest(provided_pass + salt)

    (salt + user_pass) == hashed_pass
  end

  def generate_salt
    random_str 10
  end

  def generate_session
    random_str 10
  end

  def random_str size
    o = [('a'..'z'), ('A'..'Z'), (1..9)].map { |i| i.to_a }.flatten
    o = o.map { o[rand(o.length)] }
    (1..size).map { o[rand(o.length)] }.join
  end

  def find_session id
    $redis.get("user-session-*-#{id}")
  end

  def register_session user_id
    # delete all sessions linked to this user
    $redis.keys("user-session-#{user_id}-*").each { |k| $redis.del(k) }
    
    session_id = generate_session
    key = "user-session-#{user_id}-#{session_id}"
    $redis.set(key, user_id)
    $redis.expire(key, 24*60*60)

    session[:session_id] = session_id
  end

  def not_authenticated
    session_id = session[:session_id]
    return if session_id == nil || session_id == ''

    user_id = find_session session_id
    return if user_id == nil
 
    respond_to do |f|
      f.json { render json: { status: 401, error: "User already logged in" }, status: 404 }
    end
  end

end
