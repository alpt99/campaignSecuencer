class EmailNode < Node
    validates :email_content, presence: true
    validates :email_subject, presence: true

    def realize_action
        # Enviar mail
        mailer = CampaignMailer.standard_email
        mailer.deliver_now
    end
end
