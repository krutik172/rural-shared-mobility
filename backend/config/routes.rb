Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/login', to: 'auth#login'

      resources :travel_requests, only: [:index, :create]

      resources :ride_groups, only: [:index, :show] do
        member do
          post :join
        end
      end

      namespace :admin do
        resources :ride_groups, only: [:index]
      end
    end
  end
end
