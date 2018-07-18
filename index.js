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
			<img src="${result.snippet.thumbnails.high.url}">
		</div>
	`;
}

function displayYoutubeSearchThumbnails(data) {
	console.log(data);

	const results = data.items.map((item, index) => renderResult(item));

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



