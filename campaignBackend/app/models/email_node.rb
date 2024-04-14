class EmailNode < Node
    validates :email_content, presence: true
    validates :email_subject, presence: true
end
