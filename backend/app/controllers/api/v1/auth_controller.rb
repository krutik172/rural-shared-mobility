class Api::V1::AuthController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def login
    phone = params[:phone]
    
    if phone.present?
      user = User.find_or_create_by(phone: phone) do |u|
        u.name = params[:name] || "User_#{phone.last(4)}"
        u.is_verified = true
      end
      
      # Mocking JWT or Session token for now since it's a prototype
      render json: { 
        message: 'Login successful', 
        user: { id: user.id, phone: user.phone, name: user.name, role: user.role },
        token: "mock_token_#{user.id}" 
      }, status: :ok
    else
      render json: { error: 'Phone number is required' }, status: :unprocessable_entity
    end
  end
end
