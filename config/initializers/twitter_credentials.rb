require 'twitter'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "rOixy3om9dDYTWI89nBUaB3W8"
  config.consumer_secret     = "Oxf8a2dqLXLCRgBQyELpco0UVQ59JtRlzROKfKvgMMAPvphA1J"
  config.access_token        = "4149585613-UO2btXlvVkDSLQtwukpVaDta7YhFe47iyaOt8ld"
  config.access_token_secret = "LQi0WH9BFgpIDeX8OSjLxfNkmwGNE0jIEiXlk9zjKxRRr"
end

# client.user('@realDonaldTrump')