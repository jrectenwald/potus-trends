Rails.application.routes.draw do
  resources :tweets
  
  get '/', to: 'home#show'

end
