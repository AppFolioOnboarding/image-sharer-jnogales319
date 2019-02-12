Rails.application.routes.draw do
  resources :feedbacks, only: [:new]
  resources :images, only: %i[index show new create destroy]

  namespace :api do
    resource :feedbacks, only: [:create]
  end

  root 'images#index'
end
