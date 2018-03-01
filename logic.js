//-----------------declare global vars and arrays-------------------------------
var natureTopics = ["ocean", "trees", "flowers", "animals", "river"];

//-------------------------------functions--------------------------------------
function renderButtons() {
	$(".buttonsDiv").empty();
	for (var i = 0; i < natureTopics.length; i++) {
		var topicButton = $("<button>");
		topicButton.addClass("natureButton btn btn-light rounded-0");
		topicButton.attr("data-name", natureTopics[i]);
		topicButton.text(natureTopics[i]);
		$(".buttonsDiv").append(topicButton);
	}
}

function displayGifs() {
	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	    topic + "&api_key=HUBNlYPScDqL37O09RDFFIjt7VYlz4Th&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>")
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("gif");

            gifDiv.append(p);
            gifDiv.append(gifImage);
            $(".displayGifsHere").prepend(gifDiv);
            }
        });   
    }

function startAndStop() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }


//------------------------------call functions---------------------------------
renderButtons();
  $(document).on("click", ".natureButton", displayGifs);
  $(document).on("click", ".gif", startAndStop);

