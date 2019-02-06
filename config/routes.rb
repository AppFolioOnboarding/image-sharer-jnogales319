Rails.application.routes.draw do
  resources :welcome, only: [:index]
  root 'welcome#index'
end
