const bars = document.querySelector(".bars")
const menu_bar = document.querySelector(".navbar-menu .menu-bar")
const demoButton = document.querySelector(".demo")
const gitButton = document.querySelector(".github")
const nameSection = document.querySelector("#name")
const imgs = document.querySelectorAll(".meImg")
const messageArray = ["Eric Atwood"];
let instanceOne = null;
let bubblerInterval;
let bubblerIntervalTwo;
let changeCheck = true;
let changeCheckTwo = true;
let firstRun = true;
let firstRunTwo = true;
let textPosition = 0;
let typewriterTimeout;
const speed = 175;

const bubbler = new IntersectionObserver((entries) => {
    entries.forEach(entry =>{
        if(instanceOne == null){
            instanceOne = entry.target;
        }
        if(entry.isIntersecting){
            if(instanceOne == entry.target){
                remake(entry.target, changeCheck, firstRun);
                firstRun = false;
            }
            else{
                remake(entry.target, changeCheckTwo, firstRunTwo);
                firstRunTwo = false;
            }
            
            
        }
        else{
            if(instanceOne == entry.target){
                if(changeCheck){
                    clearInterval(bubblerInterval)
                    bubblerInterval = null;
                }
            }
            else{
                if(changeCheckTwo){
                    clearInterval(bubblerIntervalTwo)
                    bubblerIntervalTwo = null;
                }
            }
            

        }
    })
}, 
{});

const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
        typewriter();
    } else {
        clearTimeout(typewriterTimeout)
        nameSection.innerHTML = "";
        textPosition = 0;
    }
},
{
    threshold: 0.5
})

bars.addEventListener("click",()=>{
    menu_bar.classList.toggle("show")
})

demoButton.addEventListener("click",()=>{
    window.open('https://github.com/ericatwood03/mobile-unity-endless-runner/releases/download/v0.1.1/StarProtection_Android_v0.1.1.apk','_blank')
})

gitButton.addEventListener("click",()=>{
    window.open('https://github.com/ericatwood03/mobile-unity-endless-runner','_blank')
})

function remake(img, changeVar, firstVar){
    if(changeVar){
        if(instanceOne == img){
            clearInterval(bubblerInterval)
            bubblerInterval  = null;
        }
        else{
            clearInterval(bubblerIntervalTwo)
            bubblerIntervalTwo  = null;
        }
        if(firstVar)
            img.classList.toggle("change");
        if(instanceOne == img){
            bubblerInterval = setInterval(() => {
                changeVar = true;
                img.classList.toggle("change");
                changeVar = false;
            }
            , 5000);
        }
        else {
            bubblerIntervalTwo = setInterval(() => {
                changeVar = true;
                img.classList.toggle("change");
                changeVar = false;
            }
            , 5000);
        }
    }
}

function typewriter() {
    document.querySelector("#name").
    innerHTML = messageArray[0].substring(0, textPosition) + "<span>\u007C</span>";

    if(textPosition++ != messageArray[0].length)
        typewriterTimeout = setTimeout(typewriter, speed);
    
}

observer.observe(nameSection);
imgs.forEach(img => bubbler.observe(img));
