class AddForeignKeyConstraints < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :edges, :nodes, column: :from_node_id, on_delete: :cascade
    add_foreign_key :edges, :nodes, column: :to_node_id, on_delete: :cascade
  end
end

