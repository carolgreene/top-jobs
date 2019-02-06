Rails.application.routes.draw do

  root 'static_pages#home'
  resources :users

  resources :jobs do 
    resources :job_applications, only: [:index, :show, :new, :create, :edit, :update]
  end

  resources :job_applications

  get '/most_recent_applications' => 'job_applications#most_recent_applications'

  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  

  

  get '/auth/facebook/callback' => 'sessions#create'
  
  get 'auth/failure' => redirect('/')

  get '/signout' => 'sessions#destroy'

  get 'jobs/:id/next', to: 'jobs#next'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
