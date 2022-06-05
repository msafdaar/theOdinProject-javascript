let aboutPage = (()=>{
  let heading = document.createElement("h1");
  let image = document.createElement("img");
  let paragraph = document.createElement("p")

  heading.textContent = "About Page"
  image.src = "images/about.jpg";
  paragraph.textContent = "Just some sheep and a human. Thanks for your visit. "
  
  let wikipedia = document.createElement("a")
  wikipedia.target = '_blank';
  wikipedia.textContent = "Credits"
  wikipedia.href ="https://en.wikipedia.org/wiki/Shaun_the_Sheep";
  paragraph.appendChild(wikipedia)
  return [heading,image,paragraph]
})();
export {aboutPage}