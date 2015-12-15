$(document).ready( function() {
  $("#frequency-table-button").on("click", function() {

    $.ajax({
            url: "/tweets",
            type: "GET",
            dataType: "json",
            data: { user_id: $('#candidate_id.word-choice').val() }, // This goes to Controller in params hash, i.e. params[:file_name]
            complete: function() {},
            success: function(data, textStatus, xhr) {
                buildTweetFrequencyTable(data.tweet_frequency.reverse()) 
            },
            error: function() {
            }
    });
  });
});





function buildTweetFrequencyTable(tweets) {
  $("table").remove();
  $("svg").remove();
  var tweet_data = tweets;

  var table = d3.select('body').append('table');
  table.attr('class', 'word-frequency-table')

  var columns = [
    { head: 'Word', cl: 'word', html: ƒ('word') },
    { head: 'Frequency', cl: 'frequency', html: ƒ('frequency') }
    ];
    

    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', ƒ('cl'))
        .text(ƒ('head'));
    
    table.append('tbody')
        .selectAll('tr')
        .data(tweet_data).enter()
        .append('tr')
        .attr('class', 'matchup_row')
        .selectAll('td')
        .data(function(row, i) {
            return columns.map(function(c) {
                // compute cell values for this specific row
                var cell = {};
                d3.keys(c).forEach(function(k) {
                    cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                });
                return cell;
            });
        }).enter()
        .append('td')
        .html(ƒ('html'))
        .attr('class', ƒ('cl'));
        $(".at_bat_id").hide();
}
