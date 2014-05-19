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
 
  def user_exists? email
    User.find_by_email(email) != nil
  end
end
