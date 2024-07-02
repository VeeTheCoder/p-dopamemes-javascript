var albums = [];
var tags = [];

 $(function() {
	$( "#albumSearch" ).autocomplete({
		source: albums,
		appendTo: "#albumSearchAutoComplete",
		messages: {
			noResults: '',
			results: function() {}
		}
	});
});

 $(function() {
	$( "#tagSearch" ).autocomplete({
		source: tags,
		appendTo: "#tagSearchAutoComplete",
		messages: {
			noResults: '',
			results: function() {}
		}
	});
});

function displayPopup(imageID) {
	document.getElementById("image_pop").style.display="block";
	db.on('child_added', function(snapshot) {
		var child = snapshot.val();
		if (child.ID == imageID)
		{
			var imageSource = child.imageSource;
			var timeStamp = child.timeStamp;
			var rating = child.rating;
			var comments = child.comments;
			var tags = child.tags;
			var toAppend =
				'<a href="' + imageSource + '"><img class="meme" id="popimg" alt="" src="' + imageSource + '"></a>' +
				'<p id="popup_date">' + timeStamp + '</p>' +
				'<section class="rating_block">' +
				'<h2 class="header_popup">Rating:</h2>' +
				'<form>' +
				'<fieldset class="rating">';

			if (rating == 5)
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" checked/><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title=""></label>';
			}
			else if (rating == 4)
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" checked/><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title=""></label>';
			}
			else if (rating == 3)
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" checked/><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title=""></label>';
			}
			else if (rating == 2)
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" checked/><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title=""></label>';
			}
			else if (rating == 1)
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" checked/><label for="star1" title=""></label>';
			}
			else
			{
				toAppend = toAppend +
					'<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title=""></label>' +
					'<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title=""></label>' +
					'<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title=""></label>' +
					'<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title=""></label>' +
					'<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title=""></label>';
			}

			toAppend = toAppend +
			'</fieldset>' +
			'</form>' +
			'</section>' +
			'<br>' +
			'<h2 class="header_popup"><span id="span_comments">Comments:</span></h2>';

			if (comments)
			{
				 toAppend = toAppend +
				 '<textarea id = "popupComments" name="comments" class="popup_textarea" value="">'+ comments +'</textarea>';
			}
			else
			{
				toAppend = toAppend +
				'<textarea id = "popupComments" name="comments" class="popup_textarea" placeholder="Enter a comment..."></textarea>';
			}

			toAppend = toAppend +
			'<h2 class="header_popup"><span id="span_tags">Tags:</span></h2>';

			if (tags)
			{
				toAppend = toAppend +
				'<textarea id = "popupTags" name="tags" class="popup_textarea">'+ tags +'</textarea>';
			}
			else
			{
				toAppend = toAppend +
				'<textarea id = "popupTags" name="tags" class="popup_textarea" placeholder="Enter tags, delimited by spaces..."></textarea>';
			}

			toAppend = toAppend +
			'<button id="saveedits" onclick="savePopup(' + imageID + ')" >Save</button>';
		}
		$('#appendPopup').html(toAppend);
	});
}

function closePopup() {
	document.getElementById("image_pop").style.display="none";
}

function savePopup(imageID) {

	db.on('child_added', function(snapshot) {
		var child = snapshot.val();
		if (child.ID == imageID)
		{
			var rating = document.querySelector('input[name="rating"]:checked').value;
			var comments = $('#popupComments').val();
			var tags = $('#popupTags').val();

			var childRef = db.child(snapshot.name());

			childRef.update({
				"rating": rating,
				"comments": comments,
				"tags": tags
			});
		}

	});

	document.getElementById("image_pop").style.display="none";
}

function getSearchParam(param) {

	var params = window.location.search.substring(1);

	var paramPair = params.split("=");

	if (paramPair[0] == param)
	{
		return paramPair[1];
	}
}

//displaying images in gallery
$(function() {db.on('child_added', function(snapshot) {
	var image = snapshot.val();
	if (image.ID)
	{
		//can add optional filtering options here
		var albumFilter = getSearchParam("AlbumFilter");
		var tagFilter = getSearchParam("TagsFilter");
		var ratingFilter = getSearchParam("RatingFilter");

		if (albumFilter)
		{
			if (image.album == albumFilter)
			{
				var newA1;
				var newA2;
				var newA3 = image.album;

				db.on('child_added', function(snapshot2) {
					var albumImage = snapshot2.val();

					if (snapshot2.name() == "SearchHistory")
					{
						newA1 = albumImage.Albums.a2;
						newA2 = albumImage.Albums.a3;
					}
				});


				var albumSearchHistory = db.child("SearchHistory/Albums");

				if ( (newA3 != newA2) && (newA3 != newA1) )
				{
					albumSearchHistory.update({
						"a1": newA1,
						"a2": newA2,
						"a3": newA3
					});
				}

				var toAppend = '<button class="showpopup" onclick="displayPopup(' + image.ID + ')"><img id="first_meme" class="meme" alt="" src="' + image.imageSource + '"/><img class="imgoverlay" alt="" src="../assets/images/library/pencil.png"/></button>';
				$('#galleryLocation').append(toAppend);
			}
		}
		else if (tagFilter)
		{
			var tagString = image.tags;
			var tagArray = tagString.split(" ");
			tagArray.forEach(function(entry) {
				if (entry == tagFilter)
				{
					var newT1;
					var newT2;
					var newT3 = entry;

					db.on('child_added', function(snapshot2) {
						var tagImage = snapshot2.val();

						if (snapshot2.name() == "SearchHistory")
						{
							newT1 = tagImage.Tags.t2;
							newT2 = tagImage.Tags.t3;
						}
					});


					var tagSearchHistory = db.child("SearchHistory/Tags");

					if ( (newT3 != newT2) && (newT3 != newT1) )
					{
						tagSearchHistory.update({
							"t1": newT1,
							"t2": newT2,
							"t3": newT3
						});
					}

					var toAppend = '<button class="showpopup" onclick="displayPopup(' + image.ID + ')"><img id="first_meme" class="meme" alt="" src="' + image.imageSource + '"/><img class="imgoverlay" alt="" src="../assets/images/library/pencil.png"/></button>';
					$('#galleryLocation').append(toAppend);
				}
			});
		}
		else if (ratingFilter)
		{
			var rating = image.rating;
			if (rating >= ratingFilter)
			{
				var toAppend = '<button class="showpopup" onclick="displayPopup(' + image.ID + ')"><img id="first_meme" class="meme" alt="" src="' + image.imageSource + '"/><img class="imgoverlay" alt="" src="../assets/images/library/pencil.png"/></button>';
				$('#galleryLocation').append(toAppend);
			}
		}
		else
		{
			var toAppend = '<button class="showpopup" onclick="displayPopup(' + image.ID + ')"><img id="first_meme" class="meme" alt="" src="' + image.imageSource + '"/><img class="imgoverlay" alt="" src="../assets/images/library/pencil.png"/></button>';
			$('#galleryLocation').append(toAppend);
		}
	}
});
});

//tentative way to populate autocomplete lists
$(function () {db.on('child_added', function(snapshot) {
	var child = snapshot.val();
	if (child.album)
	{
		if ($.inArray(child.album, albums) == -1)
		{
			albums.push(child.album);
		}
	}
	if (child.tags)
	{
		var tagString = child.tags;
		var tagArray = tagString.split(" ");
		tagArray.forEach(function(entry) {
			if ($.inArray(entry, tags) == -1)
			{
				tags.push(entry);
			}
		});
	}

	if (snapshot.name() == "SearchHistory")
	{
		var album1 = child.Albums.a1;
		var album2 = child.Albums.a2;
		var album3 = child.Albums.a3;
		var recentAlbumList = '<ul class="albumList">' +
		'<li class="albumList_li"><a  class="albumList_a" href="?AlbumFilter=' + album1 + '">' + album1 + '</a></li>' +
		'<li class="albumList_li"><a  class="albumList_a" href="?AlbumFilter=' + album2 + '">' + album2 + '</a></li>' +
		'<li class="albumList_li"><a  class="albumList_a" href="?AlbumFilter=' + album3 + '">' + album3 + '</a></li>' +
		'</ul>';
		$('#recentAlbumsHeader').append(recentAlbumList);

		var tag1 = child.Tags.t1;
		var tag2 = child.Tags.t2;
		var tag3 = child.Tags.t3;
		var recentTagList = '<ul class="tagList">' +
		'<li class="tagList_li"><a  class="tagList_a" href="?TagsFilter=' + tag1 + '">' + tag1 + '</a></li>' +
		'<li class="tagList_li"><a  class="tagList_a" href="?TagsFilter=' + tag2 + '">' + tag2 + '</a></li>' +
		'<li class="tagList_li"><a  class="tagList_a" href="?TagsFilter=' + tag3 + '">' + tag3 + '</a></li>' +
		'</ul>';
		$('#recentTagsHeader').append(recentTagList);
	}
	});
});

$(function() {
	$( ".starLabel" ).click(function(e) {
		window.location="/dopamemes/library/library.html?RatingFilter=" + $(this).val();
	});
});
