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
      <h3><a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">${result.snippet.title}</a></h3>
      <a target="_blank" href="https://www.youtube.com/channel/${result.snippet.channelId}"><p>${result.snippet.channelTitle}</p></a>
      <a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.description}">
      </a>
		</div>
	`;
}



function displayYoutubeSearchThumbnails(data) {
	console.log(data);

	const results = data.items.map((item) => renderResult(item));

	$('.js-search-results').html(results);
  
}



//Render the total amout of search results to the page
//how to call it correctly

function renderTextResultAmount(data) {

  console.log(data.pageInfo.totalResults)

  $('.js-text-results').html(
    `<div>
      <p>There are about ${data.pageInfo.totalResults} results.</p>
    </div>`);

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


