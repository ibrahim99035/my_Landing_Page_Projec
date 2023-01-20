/**
 * Define Global Variables
 * 
*/
// the first global variable we need to declare is probably a variable stores the sections we are targeting
const targetSections = document.querySelectorAll("section");

// the second global variable we have is another constant to hold our navigation list elemnt (ul)
const myUnorderedList = document.getElementById("navbar__list");

// declare go up span
const goUpSpan = document.getElementById("goUp");

// Helper functions

// build the nav
targetSections.forEach(targetSection => {
    let listtItem = document.createElement("li");
    let itemAnchor = document.createElement("a");
    let itemName = targetSection.dataset.nav;
    let itemAnchorHref = targetSection.id;
    itemAnchor.href = `#${itemAnchorHref}`;
    itemAnchor.innerText = itemName;
    itemAnchor.classList.add("navBarItemLink");
    itemAnchor.classList.add("menu__link");
    listtItem.appendChild(itemAnchor);
    myUnorderedList.appendChild(listtItem);

});

// Add class 'active' to section when near top of viewport
// add active class
function addActiveClass(activeSection){
    activeSection.classList.add("your-active-class");
}

// remove active class
function removeActiveClass(activeSection){
    activeSection.classList.remove("your-active-class");
}
window.onscroll = function(){
    targetSections.forEach(activeSection => {
        let activeSecRect = activeSection.getBoundingClientRect().top;
        let lowesetView = activeSecRect >= -400;
        let highestView = activeSecRect <= 120;
        if(lowesetView && highestView){
            addActiveClass(activeSection);
        }else{
            removeActiveClass(activeSection);
        }
    });
}

// Scroll to anchor ID using scrollTO event
const myAnchors = document.querySelectorAll(".navBarItemLink");
myAnchors.forEach(myAnchor => {
    myAnchor.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector(myAnchor.getAttribute('href')).scrollIntoView({behavior: "smooth"});
    });
});

// Add click event on go up span to go up smoothly
goUpSpan.addEventListener('click', function(){
    window.scrollTo({top: 0, behavior: "smooth"});
});