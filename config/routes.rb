Rails.application.routes.draw do
  
  get '/', to: 'home#show'

  get '/tweets', to: 'tweets#index'

  # get '/tweets/word_frequency_table', to: 'tweets#word_frequency_table'

  get '/candidates', to: 'candidates#index'

  get '/tweets_over_time', to: 'candidates#tweets_over_time'

end
