class EmailJob < ApplicationJob
    queue_as :default
  
    def perform(email_content, email_subject)
        # puts "Waiting for #{wait_time} seconds"
        # mailer = CampaignMailer.standard_email(email_content, email_subject)
        # mailer.deliver_later
    end
  end