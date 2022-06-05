let homePage = (()=>{
  let heading = document.createElement("h1");
  let image = document.createElement("img");
  let paragraph = document.createElement("p")

  heading.textContent = "Shaun The Sheep Resturant"
  image.src = "images/home.jpg";
  paragraph.textContent = "Check the Menu and see what's cooking."

  return [heading,image,paragraph]
})();
export {homePage}