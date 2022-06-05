import { homePage } from "./homePage"
import { menuPage } from "./menuPage"
import { aboutPage } from "./aboutPage"

let basicHtml = (() => {
    let header = document.createElement("div");
    ["Home", "Menu", "About"].forEach((tab) => {
        let element = document.createElement("div");
        element.textContent = tab;
        element.addEventListener("click", activateLink)
        element.classList.add("header-link");
        header.appendChild(element);
    })
    header.id = "header";
    let content = document.createElement("div");
    content.id = "content";
    return [header, content]
})();

function activateLink(event) {
    let name = event.target.textContent;
    document.querySelectorAll(".header-link")
        .forEach((element) => {
            if (element.textContent == name) {
                element.classList.add("onDisplay")
            } else {
                element.classList.remove("onDisplay")
            }
        })
    switch (name) {
        case "Home":
            displayData(homePage, "#content");
            break;
        case "Menu":
            displayData(menuPage, "#content");
            break;
        case "About":
            displayData(aboutPage, "#content");
            break;
    }
}

function displayData(arrayOfNodes, containerSelector) {
    let container = document.querySelector(containerSelector);
    container.innerHTML = "";
    arrayOfNodes.forEach(element => {
        container.appendChild(element)
    });
};

function openResturant(){
displayData(basicHtml, "body");
displayData(homePage, "#content");
document.querySelector(".header-link").classList.add("onDisplay");


}
export{openResturant}