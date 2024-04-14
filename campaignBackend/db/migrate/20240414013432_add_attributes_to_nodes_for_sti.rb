class AddAttributesToNodesForSti < ActiveRecord::Migration[7.0]
  def change
    add_column :nodes, :email_content, :text, if_not_exists: true
    add_column :nodes, :email_subject, :text, if_not_exists: true
    add_column :nodes, :time_interval, :integer, if_not_exists: true
  end
end
