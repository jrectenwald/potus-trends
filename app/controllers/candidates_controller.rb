class CandidatesController < ApplicationController

  def index
  end

  def tweets_over_time
    candidate = Candidate.find_by(user_id: params[:user_id])
    render :json => {tweets_over_time: candidate.tweets_over_time}
  end

end
