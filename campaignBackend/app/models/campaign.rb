class Campaign < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true, length: { minimum: 10 }
    has_many :nodes, as: :nodeable, dependent: :destroy
    has_many :edges, dependent: :destroy
end
