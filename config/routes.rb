Rails.application.routes.draw do
  resources :images, only: %i[show new create]
  resources :welcome, only: [:index]

  root 'welcome#index'
end
