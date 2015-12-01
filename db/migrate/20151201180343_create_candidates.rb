class CreateCandidates < ActiveRecord::Migration
  def change
    create_table :candidates do |t|
      t.string :name
      t.integer :user_id, :limit => 20
    end
  end
end
