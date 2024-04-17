class Node < ApplicationRecord
  belongs_to :campaign
  has_one :starting_node, class_name: "Campaign", foreign_key: "starting_node_id"
  has_many :from_edges, foreign_key: :from_node_id, class_name: "Edge", dependent: :destroy
  has_many :to_edges, foreign_key: :to_node_id, class_name: "Edge", dependent: :destroy

  validates :description, presence: true
end
