class MatchingService
  # Distance threshold constants (in km)
  ORIGIN_MAX_DISTANCE = 3.0
  DEST_MAX_DISTANCE = 5.0

  def initialize(travel_request)
    @request = travel_request
  end

  def find_or_create_group!
    # Try finding an existing forming or confirmed group
    matching_group = RideGroup.where(status: ['forming', 'confirmed'])
                              .where("scheduled_time >= ?", Time.now).find do |group|
      # Check time overlap (simplified)
      # Check spatial distance
      origin_dist = haversine_distance(@request.origin_lat, @request.origin_lng, group.origin_lat, group.origin_lng)
      dest_dist = haversine_distance(@request.dest_lat, @request.dest_lng, group.dest_lat, group.dest_lng)

      origin_dist <= ORIGIN_MAX_DISTANCE && dest_dist <= DEST_MAX_DISTANCE
    end

    if matching_group
      # Join existing group
      RideMember.create!(ride_group: matching_group, travel_request: @request, fare_split: 0)
      @request.update(status: 'grouped')
      
      # Recalculate and Assign
      PricingService.new(matching_group).recalculate_fares!
      VehicleAssignmentService.new(matching_group).call
      return matching_group
    else
      # Create new forming group
      new_group = RideGroup.create!(
        origin_lat: @request.origin_lat,
        origin_lng: @request.origin_lng,
        origin_name: @request.origin_name,
        dest_lat: @request.dest_lat,
        dest_lng: @request.dest_lng,
        dest_name: @request.dest_name,
        pickup_landmark: @request.pickup_landmark,
        scheduled_time: @request.time_window_start,
        status: 'forming'
      )
      RideMember.create!(ride_group: new_group, travel_request: @request, fare_split: 0)
      @request.update(status: 'grouped')
      
      PricingService.new(new_group).recalculate_fares!
      return new_group
    end
  end

  private

  # Haversine distance formula
  def haversine_distance(lat1, lon1, lat2, lon2)
    return 1000 unless lat1 && lon1 && lat2 && lon2

    rad_per_deg = Math::PI / 180
    rm = 6371 # Earth radius in kilometers

    dlat_rad = (lat2 - lat1) * rad_per_deg
    dlon_rad = (lon2 - lon1) * rad_per_deg

    lat1_rad = lat1 * rad_per_deg
    lat2_rad = lat2 * rad_per_deg

    a = Math.sin(dlat_rad / 2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad / 2)**2
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    rm * c # Distance in km
  end
end
