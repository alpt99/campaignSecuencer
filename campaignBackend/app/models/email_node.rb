class EmailNode < Node
    validates :email_content, presence: true
    validates :email_subject, presence: true

    def realize_action
        # Enviar mail
        mailer = CampaignMailer.standard_email(self.email_content, self.email_subject)
        mailer.deliver_now
    end
end
