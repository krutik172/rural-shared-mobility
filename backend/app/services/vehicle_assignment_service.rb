class VehicleAssignmentService
  MIN_PASSENGERS_FOR_ASSIGNMENT = 3

  def initialize(ride_group)
    @ride_group = ride_group
  end

  def call
    # Only assign if the group is still forming and has reached the capacity threshold
    return unless @ride_group.status == 'forming'
    
    total_seats = @ride_group.ride_members.joins(:travel_request).sum('travel_requests.seats_required')
    if total_seats >= MIN_PASSENGERS_FOR_ASSIGNMENT
      # Change state to confirmed so it stops looking for random joiners (or maybe it can still accept until full)
      @ride_group.update!(status: 'confirmed')
      
      assign_driver_and_vehicle!
    end
  end

  private

  def assign_driver_and_vehicle!
    # In a real app we'd query for available drivers with suitable vehicles nearby.
    # For MVP, we just find any available driver with an EV or CNG.
    
    available_driver = Driver.where(license_status: 'verified').first
    return unless available_driver
    
    vehicle = available_driver.vehicles.first
    return unless vehicle

    @ride_group.update!(
      driver: available_driver,
      vehicle: vehicle,
      status: 'driver_assigned'
    )
  end
end
