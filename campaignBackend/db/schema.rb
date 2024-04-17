# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_04_17_063609) do
  create_table "campaigns", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "starting_node_id"
    t.index ["starting_node_id"], name: "index_campaigns_on_starting_node_id"
  end

  create_table "edges", force: :cascade do |t|
    t.integer "from_node_id", null: false
    t.integer "to_node_id", null: false
    t.integer "campaign_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_edges_on_campaign_id"
    t.index ["from_node_id"], name: "index_edges_on_from_node_id"
    t.index ["to_node_id"], name: "index_edges_on_to_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.string "type"
    t.text "description"
    t.integer "campaign_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "email_content"
    t.text "email_subject"
    t.integer "time_interval"
    t.index ["campaign_id"], name: "index_nodes_on_campaign_id"
  end

  add_foreign_key "campaigns", "nodes", column: "starting_node_id"
  add_foreign_key "edges", "nodes", column: "from_node_id", on_delete: :cascade
  add_foreign_key "edges", "nodes", column: "to_node_id", on_delete: :cascade
end
