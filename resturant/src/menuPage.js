let menuPage = (()=>{
  let heading = document.createElement("h1");
  let image = document.createElement("img");
  let paragraph = document.createElement("p")

  heading.textContent = "The Menu"
  image.src = "images/menu.jpg";
  paragraph.textContent = "Cakes, Donuts and more Cakes"

  return [heading,image,paragraph]
})();

export {menuPage}