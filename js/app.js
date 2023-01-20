/* Define Global Variables */
// the first global variable we need to declare is probably a variable stores the sections we are targeting
const targetSections = document.querySelectorAll("section");

// the second global variable we have is another constant to hold our navigation list elemnt (ul)
const myUnorderedList = document.getElementById("navbar__list");

// declare go up span to get and store the element
const goUpSpan = document.getElementById("goUp");
/* End of global variables part */

/* Start Buliding navigation bar items */
// build the nav list items according to the number of sections in the page
targetSections.forEach(targetSection => {
    let listtItem = document.createElement("li");

    let itemAnchor = document.createElement("a");
    
    let itemName = targetSection.dataset.nav; //  the name from the section custom attribute
    
    let itemAnchorHref = targetSection.id; // prepare the href by fetching the id
    
    itemAnchor.href = `#${itemAnchorHref}`; // set the href to the anchor
    itemAnchor.innerText = itemName; // set the title in list item link
    
    itemAnchor.classList.add("navBarItemLink"); // class used later to query anchors
    itemAnchor.classList.add("menu__link"); // styles provided from the skeleton
    
    listtItem.appendChild(itemAnchor); // append anchors to the list item
    
    myUnorderedList.appendChild(listtItem); // append the list item to thelist and the end of round
});
/* End Buliding navigation bar items */

/* Start Distinguish active section functionality*/
// add active class function
function addActiveClass(activeSection){
    activeSection.classList.add("your-active-class");
}

// remove active class function
function removeActiveClass(activeSection){
    activeSection.classList.remove("your-active-class");
}

// Scroll event on the window object
window.onscroll = () => {
    //iterate all sections to check if each section in in the view during scrolling or not
    targetSections.forEach(activeSection => {
        // get the property (top) that changes during scrolling
        let activeSecRect = activeSection.getBoundingClientRect().top;
        
        let lowesetView = activeSecRect >= -400; // the lowest valid border that works with me
        let highestView = activeSecRect <= 120; // the highest valid border that works with me
        let checkMatch = lowesetView && highestView; // logical and operator between ranges
        // Match ranges to chech the viewport of acive section
        checkMatch ? addActiveClass(activeSection):removeActiveClass(activeSection);
    });
}
/* End Distinguish active section functionality*/

/* Start scroll to sections smoothly functionality */
// a global variable depends on buliding nav bar anchors
const myAnchors = document.querySelectorAll(".navBarItemLink");

// iterate anchors to add click event listener 
myAnchors.forEach(myAnchor => {
    myAnchor.addEventListener('click', function(event){
        // prevet the deafult action of anchor tags in order to create custome scroll
        event.preventDefault();
        // scroll to the current href attribute smoothly
        let linkHref = document.querySelector(myAnchor.getAttribute('href'))
        linkHref.scrollIntoView({
            behavior: "smooth"
        });
    });
});
/* End scroll to sections smoothly functionality */

/* Optional feature */
/* Start scroll to top smoothly functionality */
// Add click event on go up span to go up smoothly
goUpSpan.addEventListener('click', function(){
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
});
/* End scroll to top smoothly functionality */