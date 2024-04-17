class EmailNode < Node
    validates :email_content, presence: true
    validates :email_subject, presence: true

    def realize_action(current_time_wait)
        # Enviar mail
        mailer = CampaignMailer.standard_email(self.email_content, self.email_subject, ENV["EMAIL_USER"])
        # mailer.deliver_later
        mailer.deliver_later(wait: current_time_wait.seconds)
        # EmailJob.perform_later(self.email_content, self.email_subject)
    end
end
