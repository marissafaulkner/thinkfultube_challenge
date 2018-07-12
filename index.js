function watchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		console.log('test');

	});
}

$(watchSubmit);