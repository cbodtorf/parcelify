Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  mount ShopifyApp::Engine, at: '/'

  post 'callback/:id', to: 'callback#search'

  resources :rates

  get 'retry', to: 'home#retry'

  root to: 'home#index'
end
