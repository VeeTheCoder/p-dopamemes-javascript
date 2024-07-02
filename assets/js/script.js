function ctrl($scope) {
		$scope.toptext = '';
		$scope.bottomtext = '';
		$scope.selectedMeme ='Advice Dog';
		$scope.alterMeme = function(){
			console.meme($scope.toptext,$scope.bottomtext,$scope.selectedMeme);		
		}
}


function create() {
	var uri = document.getElementById('myCanvas').toDataURL();
	downloadImage(uri,generateName());
}

function saveToSever() {
	var uri = document.getElementById('myCanvas').toDataURL();
	uploadData(uri);
  setTimeout("location.href = 'create.html';",5000);
}


function generateName() {
	var n = [];
	for(var i =0; i < 10;i++) {
		n.push((Math.floor(Math.random() *16)).toString(16));
	}
	return n.join('');
}

function downloadImage(uri,name) {
	var link = document.createElement('a');
	link.download = name;
	link.href =uri;
	link.click();
}

$(function() {
	var memeListEl = document.getElementById('meme-list');

	for(var meme in console.list) {
		var optionEl = document.createElement('option');
		optionEl.value = optionEl.innerText = meme;
		memeListEl.appendChild(optionEl);
	}
		memeListEl.selectedIndex = 1;
		console.meme('','','Advice Dog');
	
	document.getElementById('createBtn').addEventListener('click',create);
	document.getElementById('memecreatesavebtn').addEventListener('click',saveToSever);

});





function uploadData(uri) {
      var myDataRef = new Firebase('https://flickering-fire-8139.firebaseio.com');
          var idRand = Math.floor(Math.random() * 1e7) + 1;

        
        if (!$("#textarea_album_search").val()) {
          var album = "uncategorized";
          }else {
          var album = $('#textarea_album_search').val();
          }
      
        if (!$("#textarea_comments").val()) {
          var comments = "";
          }else{
           var comments = $('#textarea_comments').val();

          }

 if (!$("input[type='radio'][name='rating']:checked").val()) {
          var rating = 1;
          }else{
          var rating = $("input[type='radio'][name='rating']:checked").val();
          }

           if (!$("#textarea_tags").val()) {
          var tags = "";
         } else{
            tags = $('#textarea_tags').val();
          }
        

          myDataRef.push({ID: idRand, album: album, comments: comments, imageSource: uri, rating: rating, tags: tags, timeStamp: dateStamper()});

}




function dateStamper() {
    var e = new Date;
    var t = e.getDate();
    var n = e.getMonth() + 1;
    var r = e.getFullYear();
    if (t < 10) {
        t = "0" + t
    }
    if (n < 10) {
        n = "0" + n
    }
    e = n + "/" + t + "/" + r;
    var i = new Date;
    var s = i.getHours();
    var o = i.getMinutes();
    if (o < 10) {
        o = "0" + o
    }
    if (s > 11) {
      if(s != 12)
        {
          s=s-12;
        }
        var u = "PM"
    } else {
        var u = "AM"
    }
    var a = e + " @ " + s + ":" + o + " " + u;
    return a
}



