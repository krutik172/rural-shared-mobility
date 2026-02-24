class PricingService
  def initialize(ride_group)
    @ride_group = ride_group
  end

  def recalculate_fares!
    total_km = haversine_distance(
      @ride_group.origin_lat, 
      @ride_group.origin_lng, 
      @ride_group.dest_lat, 
      @ride_group.dest_lng
    )

    # Use first PricingRule, fallback to default EV rate
    rule = PricingRule.first || PricingRule.new(base_fee: 10, price_per_km: 4.5)
    
    total_cost = rule.base_fee + (total_km * rule.price_per_km)
    
    members = @ride_group.ride_members.includes(:travel_request)
    total_seats = members.sum { |m| m.travel_request.seats_required }

    if total_seats > 0
      per_seat_cost = (total_cost / total_seats).round(2)
      
      members.each do |member|
        fare = per_seat_cost * member.travel_request.seats_required
        member.update!(fare_split: fare)
      end
    end
  end

  private

  def haversine_distance(lat1, lon1, lat2, lon2)
    return 0.0 unless lat1 && lon1 && lat2 && lon2

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
