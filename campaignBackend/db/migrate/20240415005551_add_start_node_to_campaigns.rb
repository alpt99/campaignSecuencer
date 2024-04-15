class AddStartNodeToCampaigns < ActiveRecord::Migration[7.0]
  def change
    add_reference :campaigns, :starting_node, foreign_key: { to_table: :nodes }
  end
end
