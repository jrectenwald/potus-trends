class Tweet < ActiveRecord::Base
  belongs_to :candidate

  def self.word_frequency_hash(user_id)
    all_words = Tweet.where(user_id: user_id).pluck(:text).join(" ").split(" ").map {|word| word.gsub!(/\W/, "")}.select! { |x| !x.nil? }
    words_over_three_letters = all_words.select {|w| w.length > 3}
    word_frequency_hash = Hash[words_over_three_letters.uniq.map { |num| [num, words_over_three_letters.count(num)] }]
    word_frequency_hash.each_with_object([]) do |(word, frequency), word_frequency_array|
      word_frequency_array.push({word: word, frequency: frequency}) if frequency >= 25 unless word == "http" || word == "https" || word == "httptcoIoUFgTUc30"
    end.drop(1).sort! { |a,b| a[:frequency] <=> b[:frequency] }
  end

end