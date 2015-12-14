class TweetsController < ApplicationController

  def index
    respond_to do |format|
      format.html 
      format.json { render :json => {tweets: Tweet.word_frequency_hash(params[:user_id])} }
    end
  end

end
