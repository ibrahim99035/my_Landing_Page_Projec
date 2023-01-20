/* Define Global Variables */
// the first global variable we need to declare is probably a variable stores the sections we are targeting
const targetSections = document.querySelectorAll("section");

// the second global variable we have is another constant to hold our navigation list elemnt (ul)
const myUnorderedList = document.getElementById("navbar__list");

// declare go up span to get and store the element
const goUpSpan = document.getElementById("goUp");

/* End of global variables part */

/* Start accessable functions */

/* Function 1: build navigation bar list items
    - it takes each section in the page as a parameter.
    - it builds list item parts: (li tag - anchor tag - inner text - anchor href).
    - then it adds style classes to the anchor element.
    - finally it appends the anchor into the list item and appends the list item into the ul.

*/
function buildItem(targetSection){
    let listtItem = document.createElement("li");

    let itemAnchor = document.createElement("a");
    
    let itemName = targetSection.dataset.nav; //  the name from the section custom attribute
    
    let itemAnchorHref = targetSection.id; // prepare the href by fetching the id
    
    itemAnchor.href = `#${itemAnchorHref}`; // set the href to the anchor
    itemAnchor.innerText = itemName; // set the title in list item link
    
    itemAnchor.classList.add("navBarItemLink"); // class used later to query anchors
    itemAnchor.classList.add("menu__link"); // styles provided from the skeleton

    itemAnchor.setAttribute("id", itemAnchorHref); // set the same id as the section for active state
    
    listtItem.appendChild(itemAnchor); // append anchors to the list item
    
    myUnorderedList.appendChild(listtItem); // append the list item to thelist and the end of round
}

/* Function 2 & Function 3
    - The first function :  adds the active class to the section and also to the related anchor.
    - The second function :  removes the active class from the section and also from the related anchor.
    - Both of them takes a section as a parameter.
*/
// add active class function
function addActiveClass(activeSection, activeAnchor){
    activeSection.classList.add("your-active-class");
    activeAnchor.classList.add("active__link__item");
}

// remove active class function
function removeActiveClass(activeSection, activeAnchor){
    activeSection.classList.remove("your-active-class");
    activeAnchor.classList.remove("active__link__item");
}

/* Function 4: Activate or deactivate sections in the page
    - it takes a section as a parameter.
    - checks if the secion is in the viewport of the screen.
    - apply add or remove active class functions by calling them through a condition.
    - it passes to the functions, the current section as an argument.
*/
function sectionActivator(activeSection){
    // get the property (top) that changes during scrolling
    let activeSecRect = activeSection.getBoundingClientRect().top;
        
    let lowesetView = activeSecRect >= -400; // the lowest valid border that works with me
    let highestView = activeSecRect <= 120; // the highest valid border that works with me
    let checkMatch = lowesetView && highestView; // logical and operator between ranges

    let relatedAnchor = document.getElementById(activeSection.id);

    // Match ranges to chech the viewport of acive section
    checkMatch ? addActiveClass(activeSection, relatedAnchor):removeActiveClass(activeSection, relatedAnchor);
}
/* Function 5: Click on navigation item process
    - it takes the anchor of the item as parameter.
    - it apply an event listener to click.
    - it prevents the deafult action.
    - it scroll smoothly to the section related.
*/
function clickItem(theAnchor){
    theAnchor.addEventListener('click', function(event){
        // prevet the deafult action of anchor tags in order to create custome scroll
        event.preventDefault();
        // scroll to the current href attribute smoothly
        let linkHref = document.querySelector(theAnchor.getAttribute('href'))
        linkHref.scrollIntoView({
            behavior: "smooth"
        });
    });
}

/* Function 6: 
    - Scroll to top 0 smoothly 
*/
function toTopScroll(){
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
}

/* End accssable functiond */

/* Start Main Actions */

/* Action 2: Build the navigation bar 
    - pass each section as an argument to (build item) function
*/
targetSections.forEach(targetSection => {
    buildItem(targetSection);
});


/* Action 3: activate section and its related anchor
    - onscroll event on window object.
    - for each section pass it as an argument to sectionActivator function.
    - the function setting active state to the section on viewport and its related anchor link.
*/
window.onscroll = () => {
    targetSections.forEach(activeSection => {
        sectionActivator(activeSection);
    });
}

/* Action 4: clickable ancors
    - declare a constant to query all anchors with the class navBarItemLink.
    - itrate acroee them and pass each section as an arguemnt to clickItem function to apply the process.
*/
const myAnchors = document.querySelectorAll(".navBarItemLink");
myAnchors.forEach(myAnchor => {
    clickItem(myAnchor);
});

/* Action 5: 
    - add an event listener to goUpSpan global variable to listen to click event.
    - apply the function toTopScroll on the span.
*/
goUpSpan.addEventListener('click', toTopScroll);

/* End Main Actions */