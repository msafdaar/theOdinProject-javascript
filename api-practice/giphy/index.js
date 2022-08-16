document.querySelector("#searchButton").addEventListener("click", searchGiphy)

function searchGiphy(){
searchText = document.querySelector("#searchText").value;
console.log(searchText)
}

function fetchGifs(text){
  return fetch(`https://api.giphy.com/v1/gifs/search?api_key=DPJfXtLGWNu65ehqeeqQxYJvk1fc9W5N&q=${text}&limit=10`, {mode: 'cors'})
  .then((response)=> response.json())
  .then((response) => response.data)
}

let a = fetchGifs()
a.then((response)=> console.log(response))