class Edge < ApplicationRecord
  belongs_to :from_node, polymorphic: true
  belongs_to :to_node, polymorphic: true


  validates :edge_type, presence: true
end
