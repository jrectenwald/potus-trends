class Tweet < ActiveRecord::Base


  def self.word_frequency_hash
    all_words = Tweet.where(user_id: 25073877).pluck(:text).join(" ").split(" ").map {|word| word.gsub!(/\W/, "")}.select! { |x| !x.nil? }
    words_over_three_letters = all_words.select {|w| w.length > 3}
    word_frequency_hash = Hash[words_over_three_letters.uniq.map { |num| [num, words_over_three_letters.count(num)] }]
    word_frequency_hash.each_with_object([]) do |(word, frequency), word_frequency_array|
      word_frequency_array.push({word: word, frequency: frequency}) if frequency > 25 unless word == "http"
    end.drop(1).sort! { |a,b| a[:frequency] <=> b[:frequency] }
  end

end

# most_freq = nums.sort_by { |num| num_hash[num] }.last