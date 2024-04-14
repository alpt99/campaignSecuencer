Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get "/campaigns", to: "campaigns#index"
  # get "/campaigns/:id", to: "campaigns#show"
  resources :campaigns
end
