class Campaign < ApplicationRecord
    belongs_to :starting_node, class_name: "Node", optional: true
    validates :title, presence: true
    validates :description, presence: true, length: { minimum: 5 }
    has_many :nodes, dependent: :destroy
    has_many :edges, dependent: :destroy

    accepts_nested_attributes_for :nodes
    accepts_nested_attributes_for :edges
end
