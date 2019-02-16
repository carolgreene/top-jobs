class UsersController < ApplicationController
  before_action :require_login, :except => [:new, :create]
  before_action :find_user, :except => [:new, :create]
  

  def new 
    redirect_to user_path(current_user) if logged_in?
    @user = User.new 
    render layout: false
  end 
  
  def create 
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id 
      redirect_to user_path(@user)
    else
      render :new
    end
  end 

  def show     
    if @user != current_user
      flash[:notice] = "You can only see your own page"
      redirect_to jobs_path
    else
      respond_to do |f|
        f.html
        f.json {render json: @user}
      end
    end 
  end

  def edit             
  end

  def update 
    @user.update(user_params)
    flash[:notice] = "User has been successfully updated"
    redirect_to user_path(@user)
  end 


  private

  def find_user 
    @user = User.find_by(id: params[:id])
  end
  

  def user_params 
    params.require(:user).permit(:name, :password, :role)
  end
end
