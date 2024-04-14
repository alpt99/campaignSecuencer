class CreateEdges < ActiveRecord::Migration[7.0]
  def change
    create_table :edges do |t|
      t.references :from_node, null: false
      t.references :to_node, null: false
      t.references :campaign, null: false

      t.timestamps
    end
  end
end
