//search for all elements with slider class, initialize them
let sliders = document.querySelectorAll(".slider");
sliders.forEach((slider,index)=>initializeSlider(slider, index))

//auto change slide
setInterval(()=>{
    sliders.forEach((slider,index)=>{nextSlide(index)})}
    ,4000)

//add shortcut divs to change between slides
function initializeSlider(slider, sliderIndex){
    slider.dataset.index = sliderIndex; //save index of slider in data attr
    let slides = slider.querySelectorAll(".slide").length; //count slides in this slider

    let shortcuts = slider.querySelector(".shortcuts");//add shorcuts in shortcuts container
    for(let i = 0; i<slides; i++){
        let shortcut = document.createElement("div");
        shortcut.classList.add("slideShortcut");
        shortcut.dataset.sliderIndex = sliderIndex;
        shortcut.dataset.slideIndex = i;
        shortcut.onclick = (event)=>{
            let slider = event.target.dataset.sliderIndex;
            let targetSlide = event.target.dataset.slideIndex;
            showSlide(slider,targetSlide);
        }
        shortcuts.appendChild(shortcut);
    }
    //add eventhandlers to buttons
    let buttons = slider.querySelectorAll(".slideButton")
    buttons[0].dataset.sliderIndex = sliderIndex;
    buttons[0].onclick = (event)=>{prevSlide(event.target.dataset.sliderIndex)}
    buttons[1].dataset.sliderIndex = sliderIndex;
    buttons[1].onclick = (event)=>{nextSlide(event.target.dataset.sliderIndex)}

    //display first slide in current slider
    showSlide(sliderIndex, 0);
}                       

function nextSlide(slider){
    let activeSlide = sliders[slider].dataset.activeSlide;
    activeSlide = activeSlide*1
    let totalSlides = sliders[slider].querySelectorAll(".slide").length
    let targetSlide;
    if(activeSlide+1==totalSlides){
        targetSlide = 0
    } else{
        targetSlide = activeSlide+1
    }
    showSlide(slider,targetSlide)
}

function prevSlide(slider){
    let activeSlide = sliders[slider].dataset.activeSlide;
    activeSlide = activeSlide*1
    let totalSlides = sliders[slider].querySelectorAll(".slide").length
    let targetSlide;
    if(activeSlide==0){
        targetSlide = totalSlides-1
    } else{
        targetSlide = activeSlide-1
    }
    showSlide(slider,targetSlide)
}

function showSlide(slider, targetSlide){
    slider = sliders[slider]; //slider in sliders array
    slider.dataset.activeSlide = targetSlide;
    //remove active class from all slides, add it on target slide
    let slides = slider.querySelectorAll(".slide");
    slides.forEach(slide => {
        slide.classList.remove("active")
    });
    slides[targetSlide].classList.add("active");

    //remove active class from all shortcuts, add it on target shortcut
    let shortucts = slider.querySelectorAll(".slideShortcut");
    shortucts.forEach(slideShortcut => {
        slideShortcut.classList.remove("active")
    });
    shortucts[targetSlide].classList.add("active");

}
