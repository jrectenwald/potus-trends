class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.integer :tweet_id, :limit => 20
      t.integer :user_id
      t.integer :retweet_count
      t.integer :favorite_count
      t.string :text
      t.datetime :created_at
    end
  end
end


# created_at      2015-06-28 12:36:08 +0000
# "id"=>615136600574423041, 
# "text"=>"\"@rtoneff25: @realDonaldTrump just kicked ass on Fox News. Guy is a winner\"  Thank you!", 
#  "user"=>{"id"=>25073877, "name"=>"Donald J. Trump", "screen_name"=>"realDonaldTrump", 
#  "retweet_count"=>75, 
# "favorite_count"=>257, 