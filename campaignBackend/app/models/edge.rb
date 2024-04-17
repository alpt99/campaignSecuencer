class Edge < ApplicationRecord
  belongs_to :from_node, foreign_key: :from_node_id, class_name: 'Node', dependent: :destroy
  belongs_to :to_node, foreign_key: :to_node_id, class_name: 'Node', dependent: :destroy
  belongs_to :campaign

end
