/**
 * Define Global Variables
 * 
*/
// the first global variable we need to declare is probably a variable stores the sections we are targeting
const targetSections = document.querySelectorAll("section");

// the second global variable we have is another constant to hold our navigation list elemnt (ul)
const myUnorderedList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

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

})

// Add class 'active' to section when near top of viewport
function addActiveClassToSection(){
    let theHightOfWindow = window.innerHeight;
    for(let i = 0; i < targetSections.length; i++){
        let farFromTop = targetSections[i].getBoundingClientRect().top;
        if(farFromTop < theHightOfWindow){
            targetSections[i].classList.add("your-active-class");
            console.log(`${targetSections[i].id} in view`);
        }else{
            targetSections[i].classList.remove("your-active-class");
        }
    }
    // targetSections.forEach(targetSection => {
    //     let farFromTop = targetSection.getBoundingClientRect().top;
    //     if(farFromTop < theHightOfWindow){
    //         targetSection.classList.add("your-active-class");
    //         console.log(`${targetSection.id} in view`);
    //     }else{
    //         targetSection.classList.remove("your-active-class");
    //     }
    // });
}

// Scroll to anchor ID using scrollTO event
const myAnchors = document.querySelectorAll(".navBarItemLink");
myAnchors.forEach(myAnchor => {
    myAnchor.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector(myAnchor.getAttribute('href')).scrollIntoView({behavior: "smooth"});
    });
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
window.addEventListener("scroll", addActiveClassToSection());

