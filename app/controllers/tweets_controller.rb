class TweetsController < ApplicationController

  def index
    respond_to do |format|
      format.html 
      format.json { render :json => {tweet_frequency: Tweet.word_frequency_hash(params[:user_id])} }
    end
  end

end
