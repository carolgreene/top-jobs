class SessionsController < ApplicationController
  def new
    redirect_to user_path(current_user) if logged_in?
    render layout: false
  end

  def create 
    if auth_hash = request.env['omniauth.auth']
      @user = User.find_or_create_by_omniauth(auth_hash)
      session[:user_id] = @user.id
      redirect_to user_path(@user) 
    else
      
      @user = User.find_by(name: params[:user][:name])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id 
        redirect_to user_path(@user)
      else 
        flash.now[:notice] = "User name or password do not match our records."
        render :new 
      end     
    end
  end  

  def destroy 
    session.delete :user_id 
    redirect_to root_path, alert: "Successfully logged out"
  end
  
end
