class Campaign < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true, length: { minimum: 10 }
    has_many :nodes, dependent: :destroy
    has_many :edges, dependent: :destroy

    accepts_nested_attributes_for :nodes
    accepts_nested_attributes_for :edges
end
