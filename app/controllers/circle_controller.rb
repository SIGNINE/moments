class CircleController < ApplicationController
  before_filter :authenticate, only: [:index, :create, :add_user]

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

  def add_user
    respond_to do |f|
      f.json do
        return unless validate_params [:id, :user_id]

        @circle = Circle.find params[:id]
        if @circle == nil
          render json: { status: 422, error: "Circle with id #{params[:id]} does not exit" }, status: 422 
          return
        end

        @new_member = User.find params[:user_id]
        if @new_member == nil
          render json: { status: 422, error: "User with id #{params[:user_id]} does not exit" }, status: 422 
          return
        end

        unless @circle.users.include? @user
          render json: { status: 401, error: "User does not have permission" }, status: 401
          return
        end

        if @circle.users.include? @new_member
          render json: { status: 422, error: "User with id #{params[@new_member.id]} is already member of circle" }, status: 401
          return
        end

        @circle.users << @new_member
        render json: { status: 200 }
      end
    end
  end

end
