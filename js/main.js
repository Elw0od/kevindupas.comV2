// Toogle

var navToggle = document.getElementById('nav-toggle');
var navItems = document.getElementById('nav-items');

navToggle.addEventListener('click', function(){
  
  navItems.classList.toggle('mobile-nav-hidden');

});

// Burger

$('.burger').on('click', function() {
  $(this).toggleClass('clicked');
});

// Insta Feed

// Detect if <template> is supported
function supportsTemplate() {
	return 'content' in document.createElement('template');
}

var instagramURL = 'https://api.instagram.com/v1/users/' + user + '/media/recent?access_token=' + accessToken;
console.log(instagramURL);

var getJSONP = function (source, callback) {
	var reference = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = source + (source.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;
	script.async = true;

	reference.parentNode.insertBefore(script, reference);

	script.onload = function () {
		this.remove();
	};
};
var getInstagramMedia = function (data) {
	var media = data.data;
	var fragment = document.createDocumentFragment();
	
	for (var a = 0, al = media.length; a < al; a++) {
		if (supportsTemplate()) {
			var mediaClone = document.querySelector('#instagram-' + media[a].type).content.cloneNode(true);
			mediaClone.querySelector('a').href = media[a].link;
			if (media[a].caption !== null && media[a].caption.text !== null) {
				mediaClone.querySelector('a').title = media[a].caption.text;
			}
			mediaClone.querySelector('.image img').src = media[a].images.low_resolution.url;
			if (media[a].caption !== null && media[a].caption.text !== null) {
				mediaClone.querySelector('.image img').alt = media[a].caption.text;
			}
			mediaClone.querySelector('.user img').src = media[a].user.profile_picture;
			
			fragment.appendChild(mediaClone);
		} else {
			var mediaElement = document.createElement('div');
			mediaElement.className = 'media ' + media[a].type;

			var linkElement = document.createElement('a');
			linkElement.href = media[a].link;
			linkElement.target = '_blank';
			if (media[a].caption !== null && media[a].caption.text !== null) {
				linkElement.title = media[a].caption.text;
			}
			mediaElement.appendChild(linkElement);

			var imageElement = document.createElement('img');
			imageElement.src = media[a].images.low_resolution.url;
			if (media[a].caption !== null && media[a].caption.text !== null) {
				imageElement.alt = media[a].caption.text;
			}
			linkElement.appendChild(imageElement);

			var userElement = document.createElement('div');
			userElement.className = 'user';
			mediaElement.appendChild(userElement);

			var userImageElement = document.createElement('img');
			userImageElement.src = media[a].user.profile_picture;
			userElement.appendChild(userImageElement);
			
			fragment.appendChild(mediaElement);
		}
	}
	
	document.getElementById('instagram-media').appendChild(fragment);

	if (data.pagination.next_url !== undefined) {
		instagramURL = data.pagination.next_url;
	} else {
		document.querySelector('.load-more').parentNode.removeChild(document.querySelector('.load-more'));
	}

};

getJSONP(instagramURL, 'getInstagramMedia');


