/* Define Global Variables */
// the first global variable we need to declare is probably a variable stores the sections we are targeting
const TARGET_SECTIONS = document.querySelectorAll('section');

// the second global variable we have is another constant to hold our navigation list elemnt (ul)
const MY_UNORDERED_LIST = document.getElementById('navbar__list');

// declare go up span to get and store the element
const GO_UP_SPAN = document.getElementById('goUp');

// Navigation Bar
const MY_NAV = document.getElementById('navbar__list');

/* End of global variables part */

/* Start accessable functions */

/* Function 1: build navigation bar list items
    - it takes each section in the page as a parameter.
    - it builds list item parts: (li tag - anchor tag - inner text - anchor href).
    - then it adds style classes to the anchor element.
    - finally it appends the anchor into the list item and appends the list item into the ul.

*/
function buildItem(targetSection){
    let listtItem = document.createElement('li');

    let itemAnchor = document.createElement('a');

    //  the name from the section custom attribute
    let itemName = targetSection.dataset.nav;
    
    // prepare the href by fetching the id
    let itemAnchorHref = targetSection.id;
    
    // set the href to the anchor
    itemAnchor.href = `#${itemAnchorHref}`;
    // set the title in list item link
    itemAnchor.innerText = itemName;
    
    // class used later to query anchors
    itemAnchor.classList.add('navBarItemLink');
    // styles provided from the skeleton
    itemAnchor.classList.add('menu__link');

    // set the same id as the section for active state
    listtItem.classList.add(itemAnchorHref);
    
    // append anchors to the list item
    listtItem.appendChild(itemAnchor);
    
    // append the list item to thelist and the end of round
    MY_UNORDERED_LIST.appendChild(listtItem);
}

/* Function 2 & Function 3
    - The first function :  adds the active class to the section and also to the related anchor.
    - The second function :  removes the active class from the section and also from the related anchor.
    - Both of them takes a section as a parameter.
*/
// add active class function
function addActiveClass(activeSection){
    activeSection.classList.add('your-active-class');
}

// remove active class function
function removeActiveClass(activeSection){
    activeSection.classList.remove('your-active-class');
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
    
    // the lowest valid border that works with me
    let lowesetView = activeSecRect >= -400;
    // the highest valid border that works with me
    let highestView = activeSecRect <= 120;
    // logical and operator between ranges
    let checkMatch = lowesetView && highestView;
    let relatedItem = document.getElementsByClassName(activeSection.id);
    // Match ranges to chech the viewport of acive section
    checkMatch ? addActiveClass(activeSection):removeActiveClass(activeSection);
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
        let linkHref = document.querySelector(theAnchor.getAttribute('href'));
        linkHref.scrollIntoView({behavior: 'smooth'});
    });
}

/* Function 6: 
    - Scroll to top 0 smoothly 
*/
function toTopScroll(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* End accssable functiond */

/* Start Main Actions */

/* Action 2: Build the navigation bar 
    - pass each section as an argument to (build item) function
*/
TARGET_SECTIONS.forEach(targetSection => {
    buildItem(targetSection);
});

/* Action 3: activate section and its related anchor
    - onscroll event on window object.
    - for each section pass it as an argument to sectionActivator function.
    - the function setting active state to the section on viewport and its related anchor link.
*/
window.onscroll = () => {
    TARGET_SECTIONS.forEach(activeSection => {
        sectionActivator(activeSection);
    });
}

/* Action 4: clickable ancors
    - declare a constant to query all anchors with the class navBarItemLink.
    - itrate acroee them and pass each section as an arguemnt to clickItem function to apply the process.
*/
let myAnchors= document.querySelectorAll('.navBarItemLink');
myAnchors.forEach(myAnchor => {
    clickItem(myAnchor);
});

/* Action 5: 
    - add an event listener to goUpSpan global variable to listen to click event.
    - apply the function toTopScroll on the span.
*/
GO_UP_SPAN.addEventListener('click', toTopScroll);

/* End Main Actions */