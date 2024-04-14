class CreateNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :nodes do |t|
      t.string :type
      t.text :description
      t.references :campaign, null: false

      t.timestamps
    end
  end
end
