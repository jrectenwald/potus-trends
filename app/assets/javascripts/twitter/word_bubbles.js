$(document).ready(function(){

  // $.ajax({
  //       url: '/tweets',
  //       method: "GET",
  //       dataType: "JSON"
  //   }).success(function(common_words_tweeted, textStatus, xhr) {
  //       buildBubbleGraph(common_words_tweeted.tweets);
  //   }).error(function(){
  //   });

  function buildBubbleGraph(common_words_tweeted){
    $("svg").remove();
    var diameter = 1200;
    var xTranslate = null;
    var yTranslate = null;
    var theta = 17.5 * Math.PI;
    var maxFrequency = common_words_tweeted[common_words_tweeted.length - 1].frequency;

    var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

    var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble-graph");

    var node = svg.selectAll(".node")
        .data(common_words_tweeted)                   //this will probably be edited to only include the word, not the magnitude
        .enter().append("g")
        .attr("class", "bubble")
        .attr("transform", function(d) { 
            thetaOffset = 3 * Math.PI * (d.frequency / maxFrequency );
            if(thetaOffset > Math.PI / 8) {
                theta += Math.PI / 8;
            } else {
                theta += thetaOffset;
            }
            xTranslate = diameter / 2 + Math.exp(0.086 * theta) * Math.cos(theta);
            yTranslate = diameter / 2 + Math.exp(0.086 * theta) * Math.sin(theta);
            return "translate(" + xTranslate + "," + yTranslate + ")"; 
        });

    // node.append("title")
    //     .text(function(d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.frequency / 4; })
        .style("fill", "SteelBlue");

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.word; });
  };

  $("#candidate_id").on("change", function() {
    $.ajax({
            url: "/tweets",
            type: "GET",
            dataType: "json",
            data: { user_id: $("#candidate_id").val() }, // This goes to Controller in params hash, i.e. params[:file_name]
            complete: function() {},
            success: function(data, textStatus, xhr) {
                    buildBubbleGraph(data.tweets)
            },
            error: function() {
                debugger
            }
    });
  });
})