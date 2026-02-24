class Api::V1::RideGroupsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def index
    # List active forming/confirmed rides that users might want to join
    ride_groups = RideGroup.where(status: ['forming', 'confirmed'])
                           .where("scheduled_time >= ?", Time.now)
                           .order(scheduled_time: :asc)
    render json: ride_groups, status: :ok
  end

  def show
    ride_group = RideGroup.includes(:travel_requests, :driver, :vehicle).find(params[:id])
    
    # Custom JSON response including nested relations
    render json: ride_group.as_json(
      include: {
        travel_requests: { include: :user },
        driver: { include: :user },
        vehicle: {}
      }
    ), status: :ok
  end

  def join
    # User intent to join an existing RideGroup directly
    ride_group = RideGroup.find(params[:id])
    
    # Simulate creating a matching travel intent directly associated
    travel_request = TravelRequest.new(
      user_id: params[:user_id],
      origin_lat: ride_group.origin_lat,
      origin_lng: ride_group.origin_lng,
      origin_name: ride_group.origin_name,
      dest_lat: ride_group.dest_lat,
      dest_lng: ride_group.dest_lng,
      dest_name: ride_group.dest_name,
      date: ride_group.scheduled_time.to_date,
      time_window_start: ride_group.scheduled_time,
      time_window_end: ride_group.scheduled_time + 1.hour,
      seats_required: params[:seats_required] || 1,
      status: 'grouped'
    )

    if travel_request.save
      RideMember.create!(
        ride_group: ride_group,
        travel_request: travel_request,
        fare_split: 0 # Calculated later
      )

      # Trigger Cost recalculation and auto-assignment checks here
      # VehicleAssignmentService.new(ride_group).call
      # PricingService.new(ride_group).recalculate_fares!

      render json: { message: 'Successfully joined the ride group', ride_group: ride_group }, status: :ok
    else
      render json: { errors: travel_request.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
