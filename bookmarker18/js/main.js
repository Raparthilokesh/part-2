//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
  //Get form values
   var siteName=document.getElementById('siteName').value;
   var siteUrl=document.getElementById('siteurl').Value;
    
   if(!validation(siteName, siteUrl)){
     return false;
   }

   var bookmark = {
     name: siteName,
     url: siteUrl
   }
   
   /*
   //Local storage Test
   localStorage.setItem('test', 'Hello World');
   console.log(localStorage.getItem('test'));
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));
   */

   //test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null){
     // Init array
     var bookmarks = [];
     // Add to array
     bookmarks.push(bookmark);
     //set to localStorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
     //get bookmarks from Local storage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     // Add bookmark to array
     bookmarks.push(bookmark);
     //Re-set back to localstorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

   //clear form
   document.getElementById('myForm').reset();

  //Re-fetch bookmarks
  fetchBookmarks();

  // prevent form from submitting
  e.preventDefault();
}

//delete bookmark
function fetchBookmarks(url){
//get bookmarks from localstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop throught bookmarks
for(var i =0;i < bookmarks.length;i++){
  if(bookmarks[i].url ==url){
     //Remove from array
     bookmarks.splice(i, 1);
  }
 }
 //Re-set back to localstorage
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

 //Re-fetch bookmarks
 fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
  //get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">visit</a>' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }
}


//validation form
function validation(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('please use a valid URL');
    return false;
  }
  return true;
}