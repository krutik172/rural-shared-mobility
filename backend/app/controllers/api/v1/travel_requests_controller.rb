class Api::V1::TravelRequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  
  # For prototyping, we accept user_id in params instead of real auth headers
  
  def index
    # Find active requests that the user can join
    # Real logic would use PostGIS or geo bounds. 
    # Mock logic: returns pending travel requests
    
    requests = TravelRequest.where(status: 'pending')
                            .where("travel_date >= ?", Date.today)
                            .order(created_at: :desc)
                            
    render json: requests, status: :ok
  end

  def create
    request = TravelRequest.new(request_params)
    request.status = 'pending'
    
    if request.save
      render json: request, status: :created
    else
      render json: { errors: request.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def request_params
    params.require(:travel_request).permit(
      :user_id, :origin_lat, :origin_lng, :dest_lat, :dest_lng, 
      :travel_date, :time_window_start, :time_window_end, 
      :seats_required, :max_budget
    )
  end
end
