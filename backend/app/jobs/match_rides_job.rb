class MatchRidesJob < ApplicationJob
  queue_as :default

  def perform
    # Find all pending travel intents
    pending_requests = TravelRequest.where(status: 'pending').order(created_at: :asc)

    # Process each one using the new MatchingService
    pending_requests.each do |request|
      begin
        matching_service = MatchingService.new(request)
        matching_service.find_or_create_group!
        Rails.logger.info "Successfully matched or formed group for TravelRequest #{request.id}"
      rescue => e
        Rails.logger.error "Failed to match TravelRequest #{request.id}: #{e.message}"
      end
    end
  end
end
