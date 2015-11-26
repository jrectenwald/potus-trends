# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Tweet.destroy_all

require 'twitter'


  def collect_with_max_id(collection=[], max_id=nil, &block)
    response = yield(max_id)
    collection += response
    response.empty? ? collection.flatten : collect_with_max_id(collection, response.last.id - 1, &block)
  end

  def client.get_all_tweets(user)
    collect_with_max_id do |max_id|
      options = {count: 200, include_rts: true}
      options[:max_id] = max_id unless max_id.nil?
      user_timeline(user, options)
    end
  end

  tweets = client.get_all_tweets("realDonaldTrump")
  tweets.each do |tweet|
    Tweet.create(tweet_id: tweet.id, user_id: tweet.user.id, retweet_count: tweet.retweet_count, favorite_count: tweet.favorite_count, text: tweet.text, created_at: tweet.created_at.to_time)
  end