let header = (() => {
  let header = document.createElement("div");
  ["Home", "Menu", "About"].forEach((tab) => {
    let element = document.createElement("div");
    element.textContent = tab;
    element.addEventListener("click", linkActive)
    element.classList.add("header-link");
    header.appendChild(element);
  })
  header.id = "header"
  let content = document.createElement("div");
  content.id = "content"
  return [header, content]
})();

export{header}