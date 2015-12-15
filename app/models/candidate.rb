class Candidate < ActiveRecord::Base
  has_many :tweets, :primary_key => 'user_id', :foreign_key => 'user_id'

  def tweets_over_time
    tweets_by_date_created = self.tweets.pluck(:created_at).map {|date_time| date_time.to_date }.reverse
    tweet_frequency_hash = tweets_by_date_created.each_with_object({}) do |date, hash|
      hash[date] ? hash[date] += 1 : hash[date] = 1
    end
    d3_friendly_array = tweet_frequency_hash.each_with_object([]) do |(date, frequency), array|
      array.push([date, frequency])
    end
  end

end
