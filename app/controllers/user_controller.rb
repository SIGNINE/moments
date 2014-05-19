require 'digest/sha1'

class UserController < ApplicationController

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

  def generate_salt
    o = [('a'..'z'), ('A'..'Z'), (1..9)].map { |i| i.to_a }.flatten
    o = o.map { o[rand(o.length)] }
    (0..9).map { o[rand(o.length)] }.join
  end
end
