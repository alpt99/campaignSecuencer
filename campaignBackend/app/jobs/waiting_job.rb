class WaitingJob < ApplicationJob
  queue_as :default

  def perform(wait_time)
    puts "Waiting for #{wait_time} seconds"
    sleep wait_time
    # sleep 30
  end
end