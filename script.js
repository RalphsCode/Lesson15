console.log("JS is running");

// Find the get Giphy button on the page and add an eventListener
const getGiphy = document.getElementById('getGiphy');
getGiphy.addEventListener('click', search);

// Code to initiate a search if Enter is pressed
const entSearch = document.querySelector('#query');
entSearch.addEventListener('keydown', function (event) {
      // Check if the pressed key is Enter
      if (event.key === 'Enter') {
        search();
      }})

// Find the Delete on the page and add an eventListener
const delGiphy = document.getElementById('deleteGiphy');
delGiphy.addEventListener('click', delGiphyImage);

// Find the div to place the gifs
const giphyDiv = document.querySelector('#giphyContent');

// Create an empty array to hold the giphy images
const giphyImageArr = [];


function search(){
  // Function to get the search term, and then initiate getGiphyImage
    const searchFor = document.querySelector('#query');
    const searchTerm = searchFor.value;
    searchFor.value = searchFor.defaultValue;
    searchFor.focus();
    if (searchTerm !== '' && typeof searchTerm === 'string' ){
       getGiphyImage(searchTerm);
    }
    else {
      window.alert('Please reenter your search.');
    }
} // END search()


async function getGiphyImage(searchFor) {
  // Function to get a giphy image from the API server
    try {
          const response = await axios.get('https://api.giphy.com/v1/gifs/search', 
          {params: {api_key: 'rcdMuvZLkb40OZYwjbPJlU0FrJdiq1wp', 
          limit: 10, 
          q: searchFor}});

          // Create an array of the search result gif's
          const searchResults = [];
          for (result of response.data.data){
          searchResults.push(result.images.downsized_medium.url)
          }
          // Generate a random index
          var randomIndex = Math.floor(Math.random() * searchResults.length);
          // Return the random search result gif in the display array
          const newImage =  searchResults[randomIndex];
          // Push the new giphy into the gif arrray
          giphyImageArr.push(newImage);
            }  // END try

    catch (error) {
          console.error(error);
    } finally {
          console.log('getGiphyImage() completed.');
          displayGifs();
    }
  }  // END getGiphyImage()


  function displayGifs() {
    // Display the gif(s) on the webpage
    // Reset the gif div to be blank
    giphyDiv.innerHTML='';

    // Loop through the gif image array and create a new div for each
    for (const gif of giphyImageArr){
      const newItem = document.createElement('div');
      newItem.setAttribute("class", "col-12 col-sm-6 col-md-4 mt-3 border");
      newItem.innerHTML=`<img src="${gif}" width=200px alt="GIPHY">`;
      giphyDiv.append(newItem);
    }
  } // END displayGifs()


  function delGiphyImage(){
    // Function to delete all giphy images on the page
    giphyDiv.innerHTML='';
    giphyImageArr.length = 0;
  }
