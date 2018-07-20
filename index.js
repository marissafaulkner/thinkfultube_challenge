// api key AIzaSyCtpVsrKn4sQ00ieSwBXEnt0iAa7HEv3-E

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


// part: 'snippet'
// key: (your API key as a string)
// q: (your search term as a string)
//https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&key=AIzaSyCtpVsrKn4sQ00ieSwBXEnt0iAa7HEv3-E

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
    	part: 'snippet',
    	key: 'AIzaSyCtpVsrKn4sQ00ieSwBXEnt0iAa7HEv3-E',
    	q: searchTerm
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
};

function renderResult(result) {
	return `
		<div>
      <video controls
       muted
       src="https://www.youtube.com/watch?v=&html5=True${result.id.videoId}"
       poster="${result.snippet.thumbnails.medium.url}">
     Sorry, your browser doesn't support embedded videos.
     </video>
 

		
		</div>
	`;
}

// <video controls
//        muted
//        src="https://www.youtube.com/watch?v=${result.id.videoId}"
//        poster="${result.snippet.thumbnails.medium.url}">
//     Sorry, your browser doesn't support embedded videos.
//     </video>

// //<a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
      // <img src="${result.snippet.thumbnails.medium.url}">
      // </a>


function displayYoutubeSearchThumbnails(data) {
	console.log(data);

	const results = data.items.map((item) => renderResult(item));

  // const results = []
  // for (let i = 0; i < data.items.length; i++) {
  //   results.push(renderResult(data.items[i]));
  // }


	$('.js-search-results').html(results);
}

function watchSubmit() {

	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
    	const query = queryTarget.val();
		
    	getDataFromApi(query, displayYoutubeSearchThumbnails);

	});
}


$(watchSubmit);



