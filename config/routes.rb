Rails.application.routes.draw do
  resources :feedbacks, only: [:new]
  resources :images, only: %i[index show new create destroy]

  root 'images#index'
end
