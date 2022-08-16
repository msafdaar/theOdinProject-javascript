document.querySelector("#searchButton").addEventListener("click", searchGiphy)

function searchGiphy(){
searchText = document.querySelector("#searchText").value;
fetchGifs(searchText)
.then((images)=>{loadGifs(images)})
}

function fetchGifs(text){
  return fetch(`https://api.giphy.com/v1/gifs/search?api_key=DPJfXtLGWNu65ehqeeqQxYJvk1fc9W5N&q=${text}&limit=10`, {mode: 'cors'})
  .then((response)=> response.json())
  .then((response) => response.data)
}

function loadGifs(images){
  let container = document.querySelector("#imagesContainer")
  container.innerHTML = ""
  images.forEach(gif => {
    let url = gif.images.fixed_width.url;
    let img = document.createElement("img");
    img.src = url;
    container.appendChild(img);
  });
}

