let galleryImages = document.querySelectorAll(".gallery a");
let popUp = document.querySelector(".popup");
let bigImage = document.querySelector(".popup .inner img");
let closeIcon = document.querySelector(".close");
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let clickBtn = document.querySelector("#click");
let gallery = document.querySelector(".gallery");
let input = document.querySelector('input');
let h1 = document.querySelector("h1");
let galleryInputs = document.querySelector('.gallery-inputs');

window.addEventListener("keydown",(e)=>{
    if (e.keyCode == "39") {
        let showSlide = document.querySelector(".showSlide");
        nextElemSib(showSlide);
        clearInterval(displaySlider);
    }
    if (e.keyCode == "37") {
        let showSlide = document.querySelector(".showSlide");
        prevElemSib(showSlide);
        clearInterval(displaySlider);
    }
})

// IMG UPLAODING
let uploadFile = document.querySelector("form i");

uploadFile.addEventListener("click", function () {
  this.nextElementSibling.click();
});

uploadFile.nextElementSibling.addEventListener("change",(e)=>{
    const {files}  = e.target;

    for (const file of files) {
        const fileReader = new FileReader();
        fileReader.onloadend = function (e){
            const {result} = e.target;
            
            const img = document.createElement("img");
            img.classList.add("small");
            img.setAttribute("src",result);
            img.style.width = "300px";
            img.style.height ="207px";
            img.style.objectFit ="cover"
            document.querySelector(".gallery a").appendChild(img);
          
        }
        fileReader.readAsDataURL(file);
    }
})

function clickForEnter(){
        gallery.style.display = "flex";
        input.style.display = "none";
        clickBtn.style.display = "none";
        h1.innerText = "WELCOME" + "  " + input.value ;
        h1.style.visibility = "visible";
        h1.style.transform = "scale(1.5)";
        h1.style.textTransform = "uppercase"
        galleryInputs.style.display= "flex"
}

input.addEventListener('keyup',(e)=>{
    if (e.code === "Enter") {
        e.preventDefault();
        clickForEnter();
    }
});

clickBtn.addEventListener("click",clickForEnter);

// This section for slide
galleryImages.forEach((image) => {
    image.addEventListener("click", (e) => {
        e.preventDefault();
        openImage();
        changeImage(image);
        image.classList.add("showSlide");
        setInterval(displaySlider,4000);
    })
})

// open big image function and use parent div
function openImage() {
    popUp.style.display = "flex";
}

function changeImage(item) {
    let imgSrc = item.getAttribute("href");
    bigImage.setAttribute("src", imgSrc);
}


// Close event inn opened PopUp
popUp.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
        popUp.style.display = "none";
    };
});

closeIcon.addEventListener("click", (e) => {
    if (e.target.classList.contains("far")) {
        popUp.style.display = "none";
        clearInterval(displaySlider);
    }
    
})

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        popUp.style.display = "none";
    }
})

// Buttons click events
//For Interval
let interval;
prev.addEventListener("click", () => {
    let showSlide = document.querySelector(".showSlide");
    prevElemSib(showSlide);
    clearInterval(displaySlider);
})

next.addEventListener("click", (e) => {
    let showSlide = document.querySelector(".showSlide");
    nextElemSib(showSlide);
    clearInterval(displaySlider);
});


function nextElemSib(item) {
    let showSlide = document.querySelector(".showSlide");
       if (item.nextElementSibling !== null) {
           item.nextElementSibling.classList.add("showSlide");
           changeImage(item.nextElementSibling);
       } else {
           item.parentElement.children[0].classList.add("showSlide");
           changeImage(item.parentElement.children[0]);
       }
    item.classList.remove("showSlide");
    
};

function prevElemSib(item) {
    let showSlide = document.querySelector(".showSlide");
        let length = item.parentElement.children.length;

        if (item.previousElementSibling !== null) {
            item.previousElementSibling.classList.add("showSlide");
            changeImage(item.previousElementSibling);
        } else {
            item.parentElement.children[length - 1].classList.add("showSlide");
            changeImage(item.parentElement.children[length - 1]);
        }
    item.classList.remove("showSlide");
    
};

// Interval Sliding

// function displaySlider(){
//     if(true){
//         setInterval(nextElemSib,4000);
//     }
// }
// displaySlider();

function displaySlider(){
    let showSlide = document.querySelector(".showSlide");
    nextElemSib(showSlide);
}