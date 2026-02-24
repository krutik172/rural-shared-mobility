class Api::V1::Admin::RideGroupsController < ApplicationController
  def index
    # Simple list of all ride groups for the admin dashboard
    ride_groups = RideGroup.order(created_at: :desc)
    render json: ride_groups, status: :ok
  end
end
