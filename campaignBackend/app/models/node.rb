class Node < ApplicationRecord
  belongs_to :nodeable, polymorphic: true

  validates :content, presence: true
end
