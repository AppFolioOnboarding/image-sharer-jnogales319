Rails.application.routes.draw do
  resources :images, only: %i[index show new create destroy]

  root 'images#index'
end
