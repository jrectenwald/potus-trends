class Tweet < ActiveRecord::Base
end

# a = Tweet.pluck(:text).join(" ").split(" ").sort
# num_hash = Hash[nums.uniq.map { |num| [num, nums.count(num)] }]
# most_freq = nums.sort_by { |num| num_hash[num] }.last