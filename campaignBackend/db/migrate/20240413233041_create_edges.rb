class CreateEdges < ActiveRecord::Migration[7.0]
  def change
    create_table :edges do |t|
      t.references :from_node, polymorphic: true, null: false
      t.references :to_node, polymorphic: true, null: false
      t.string :edge_type, default: "default"

      t.timestamps
    end
  end
end
