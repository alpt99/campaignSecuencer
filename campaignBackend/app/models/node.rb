class Node < ApplicationRecord
  belongs_to :nodeable, polymorphic: true

  validates :description, presence: true
end
