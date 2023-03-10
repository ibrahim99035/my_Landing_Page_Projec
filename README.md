# Landing Page Project for FWD Schoolarship on Udacity

my name is Ibrahim Mohamed Eita
and this is my first project in FWD scholarship

## Step 1: Dwonload the skelton

From the repository provided to us i had downloaded only the required files

1. index.html
2. css/styles.css
3. js/app.js
4. README.md

## Step 2: Put a suitable plan

We need to link our JavaScript file into our HTML document.
We need to choose a data structure to store target sections.
We need to iterate this sections.
I would place the list items in (header:nav:ul:)
We are trying to add:

1. Navigation bar.
2. active class to the view section.
3. smooth scrolling effect.

## Step 3: Development Phases

### Linking js/app.js file in our index.html Document

```HTML
<script src="js/app.js"></script>
```

### Global Variables

#### Set a global variable to store different sections we are targeting

The variable we are creating should be constant as we will not reassign it lately during the development process.
This varaiable uses the function {querySelectorAll()} from the {document} object, and we are passing (section) elemsnts.

```JavaScript
const targetSections = document.querySelectorAll("section");
```

#### Set a global variable to hold the navigation list

This valiable targets the ul elment in nav elemnt in the header.
It uses {getElemntByID()} function from the {document} object, and takes the id of ul {"navbar__list"}.

```JavaScript
const myUnorderedList = document.getElementById("navbar__list");
```

We would use this variable to append li elemnts that represents all section in our page.

#### Set a constatn for anchors

it would be in the middle of code lines becuse we want to query anchors by class name setted while creating the navbar.

```JavaScript
const myAnchors = document.querySelectorAll(".navBarItemLink");
```

### Build the nav functionality

```JavaScript
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
```

1. To iterate different sections from the global variable (targetSections), we would use the function (forEach) to apply actions.
2. We had declared 4 local variables aims to add list item with anchor elemnt with href = section id.
3. The first variable is a created element (li).
4. The second variable is a created element (a).
5. The third variable is item name that fetches the custom attribute (data-nav) to set text in nav item.
6. The fourth variable is to set href for the anchor by taking the id of the item and adding hash "#" at the begining.
7. Then we setting name for the current item from the variable (itemAnchor).
8. the next 2 lines is adding 2 classes to the current anchor, the first class is ("menu__link") with a provided css attributes from the skelton code, the second class is ("navBarItemLink") in order to query them later.
9. Then we had appended the anchor into the list item.
10. Finally, we had appended the list item into the (ul) from the global variable (myUnorderedList).

> in case of creating text for navigation list litems, it planned to use counter to set dynamic name variable.
>
> ```JavaScript
>let j = 1;
>targetSections.forEach(targetSection => {
>...
>let itemName = `Step ${i}`;
>...
>i++;
>});    
> ```
>
> but i found it would be easire and more clean to fetch text from the attribute (data-nav).

### Smooth scroll to target section

```JavaScript
const myAnchors = document.querySelectorAll(".navBarItemLink");
myAnchors.forEach(myAnchor => {
    myAnchor.addEventListener('click', function(event){
        event.preventDefault();
        let linkHref = document.querySelector(myAnchor.getAttribute('href'))
        linkHref.scrollIntoView({behavior: "smooth"});
    });
});
```

At first declare a global variable to querry all anchors by the class name ("navBarItemLink") we added before to anchors.

Then itrate across them using forEach function.

On each item we had an event listener to listen to click event.

The function prevents the deafult action of anchor.

Then we are querying the href attribute of the current anchor and scroll into it with a smooth behaviour.

The behavior defines the transion animation, and we had choosed it to be smooth.

### Responsive Navigation Bar

I just tried to reduce the padding of the navigation menu to do not cover any content below.

```css
.navbar__menu .menu__link {
    ...
    padding: 0.75em;
    ...
}
```

### Distinguish the section in view port

#### Active Class

The key of this process is a class called "your-active-class" in styles.css file.

```css
section.your-active-class {
    background: rgb(8, 33, 44);
    background: linear-gradient(0deg, rgba(5, 40, 63, 0.705) 0%, rgba(9, 33, 49, 0.308) 100%);
    border-radius: 15px;
    margin: auto;
}
```

The changes i had applied into this class is slightly changing colors, margin auto, and set border radius to 15 pixels.

#### Add and Remove functions

This functions takes the target section as an argument, and add or remove the active class to or from the target section.

```JavaScript
function addActiveClass(activeSection){
    activeSection.classList.add("your-active-class");
}
```

```JavaScript
function removeActiveClass(activeSection){
    activeSection.classList.remove("your-active-class");
}
```

#### Calculating the viwe window

The function Element.getBoundingClientRect( ) provides information about elemnt size and its position relative to the viewport according to MDN web docs, and that is exactly what we need to distinguish our active sections.

Also according to MDN web docs, viewport is a rectangular area you currently viewing on the screen, so we need to specify which section is being viewed on the screen.

The property we need from Element.getBoundingClientRect( ) is top property.

The property (top) changes its values every time the scrolling position changes because their values are relative to the viewport and not absolute.

#### Scroll Event

So the event we are dealing with is scroll event on the window object.

On scroll event, we are applying a function to iterate across sections from the global variable (targetSections) by using (forEach) function and this is done by four steps:

1. assign the value of (top) property from (getBoundingClientRect( )) to a local variable.
2. assign the lowest possible top range as a boolean value; the value that worked with me is -400.
3. assign the highest possible top range as a boolean value; the value that worked with me is 120.
4. the tests on highest and lowest ranges was done by increment of decrement the values to get a satisfying result.
5. apply the condition test to match the highst and the lowest possible (top) ranges by the && logical operator whis is (and).
6. shorhand condition to take actions depending on view state in ranges.

```JavaScript
window.onscroll = () => {
    targetSections.forEach(activeSection => {
        let activeSecRect = activeSection.getBoundingClientRect().top;
        let lowesetView = activeSecRect >= -400;
        let highestView = activeSecRect <= 120;
        let checkMatch = lowesetView && highestView;
        checkMatch ? addActiveClass(activeSection):removeActiveClass(activeSection);
    });
}
```

### Scroll to up action (Additional to design): optional

#### Add span element between main and footer elements

```HTML
<span id="goUp">UP</span>
```

#### Style the span by its id

```css
/*Go Up Span style and show span class*/
#goUp{
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: rgba(8, 47, 129, 0.753);
    color: white;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    padding: 4px;
    transition: all 0.5s ease-in-out;
}
```

#### Declare a global variable as constant to get element

```JavaScript
const goUpSpan = document.getElementById("goUp");
```

#### Click event on the span element

This is so simple, add an event listener to listen to click event and apply function according to this event to scroll to top 0 smoothly.

```JavaScript
goUpSpan.addEventListener('click', function(){
    window.scrollTo({top: 0, behavior: "smooth"});
});
```

## Refactor

- The problems in eslinter all about no declaring the document and window objects.
- I am using ES6 const and let declartion keywords.
- I am using ES6 arrow functions at some parts.
- I don't Know if my code is DRY enoug, but i am trying and i will continue developing it.
- I think my code is structured.
- I use forEach function for iteration.

## Virsion control using git

I had created my own git repository to set a history for my project.
git version 2.39.0.windows.1
To initiate local repository:

```haskell
git init
```

To add chages to the staging area:

```haskell
git add *
```

To commit chages into snapshots:

```haskell
git commit -m "Message"
```

To check stagging area status:

```haskell
git status
```

To check log history:

```haskell
git log
```

## Refrences and thnks

I had learned alot about events, the DOM, JS functions, and other skills in markdown.
During this journey i learned alot from MDN web docs, W3schools, Toturial point, and other articals and youtube videos, and even return to course lessons and parts.

I want to thank Udacity and FWD for allowing my to experience this fun and helpful journey.

## Resubmit the project

> The Requrements that I had met:

```Plaintext
- Project has the structure.

- Styling has been added for active states.

- There are at least 4 sections that have been added to the page.

- Navigation is built dynamically as an unordered list.

- When clicking an item from the navigation menu, the link should scroll to the appropriate section.

- The ReadMe file should have non-default text in it...

- Comments are present and effectively explain longer code procedure when necessary.
```

> I have the following requirements to meet:

```Plaintext
- All features are usable across modern desktop, tablet, and phone browsers.

- It should be clear which section is being viewed while scrolling through the page.

- Code is formatted with consistent, logical, and easy-to-read formatting.
```

### First requirement : All features are usable across modern desktop, tablet, and phone browsers

This requirement related to the responsive design of the navgiation bar, so i made some changes on css file:

- Change `ul` and `li` styles.

```css
.navbar__menu ul {
    margin: 0 0 0 -40px;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    flex-wrap: wrap;
}

.navbar__menu li {
    position: relative;
    display: inline-block;
}
```

- Set media quiries to set different font sizes according to different devices.

```css
/* Media Queries to change nav according to devices */
@media(max-width: 656px){
    li{
        font-size: 15px;
    }
}
@media(max-width: 485px){
    li{
        font-size: 14px;
    }
}
@media(max-width: 420px){
    li{
        font-size: 13px;
    }
}
@media(max-width: 380px){
    li{
        font-size: 11.5px;
    }
}

@media(max-width: 320px){
    li{
        font-size: 10.5px;
    }
}
@media(max-width: 280px){
    li{
        font-size: 8.75px;
    }
}
```

### Second requirement : It should be clear which section is being viewed while scrolling through the page

This task require different procedures:

- set id to different anchors according to each section.

```JavaScript
function buildItem(targetSection){
    ...
    
    let itemAnchorHref = targetSection.id; 
    
    itemAnchor.href = `#${itemAnchorHref}`; 

    ...

    itemAnchor.setAttribute("id", itemAnchorHref); 

    ...
}
```

- create a class in css file to make the active anchor in special style.

```css
.active__link__item{
    background-color: rgba(12, 51, 58, 0.897);
    display: block;
    color: rgb(255, 246, 246) !important;
    text-decoration: none;
    box-shadow: rgb(0, 0, 0);
}
```

- add & remove active class to/from the active anchors through the functions of adding and removing active class to/from viewport section.

```JavaScript
function addActiveClass(activeSection, activeAnchor){
    activeSection.classList.add("your-active-class");
    activeAnchor.classList.add("active__link__item");
}

function removeActiveClass(activeSection, activeAnchor){
    activeSection.classList.remove("your-active-class");
    activeAnchor.classList.remove("active__link__item");
}
```

- get the anchor related to each section, and pass it as an argument to the functions in the condition.

```JavaScript
let relatedAnchor = document.getElementById(activeSection.id);
checkMatch ? addActiveClass(activeSection, relatedAnchor):removeActiveClass(activeSection, relatedAnchor);
```

### Third requirement : Code is formatted with consistent, logical, and easy-to-read formatting

I tried to make the code DRY and in consistent format

- At first, I had changed all constatnt names in `UPPER_CASE` format.
- Then, I had changed all double qoutes `" "` to single qoutes `' '` for strings.
- I am using shortahnd condition.
- I had created main functions accessable across all files.

```JavaScript
function buildItem(targetSection){
    let listtItem = document.createElement('li');

    let itemAnchor = document.createElement('a');

    let itemName = targetSection.dataset.nav;
    
    let itemAnchorHref = targetSection.id;
    
    
    itemAnchor.href = `#${itemAnchorHref}`;
   
    itemAnchor.innerText = itemName;
    
    itemAnchor.classList.add('navBarItemLink');
  
    itemAnchor.classList.add('menu__link');

    let buildRelate = `Relate${itemAnchorHref}`;
    itemAnchor.setAttribute('id', buildRelate);
    
    listtItem.appendChild(itemAnchor);
    
    MY_UNORDERED_LIST.appendChild(listtItem);
}


function addActiveClass(activeSection, relatedAnchor){
    activeSection.classList.add('your-active-class');
    relatedAnchor.classList.add('active__link__item');
}

function removeActiveClass(activeSection, relatedAnchor){
    activeSection.classList.remove('your-active-class');
    relatedAnchor.classList.remove('active__link__item');
}

function sectionActivator(activeSection){
    
    let activeSecRect = activeSection.getBoundingClientRect().top;
    
    let activeId = activeSection.id;
    let relatedAnchorId = `Relate${activeId}`;
    let relatedAnchor = document.getElementById(relatedAnchorId);

    let lowesetView = activeSecRect >= -400;
    
    let highestView = activeSecRect <= 120;
   
    let checkMatch = lowesetView && highestView;

    checkMatch ? addActiveClass(activeSection, relatedAnchor):removeActiveClass(activeSection, relatedAnchor);
}

function clickItem(theAnchor){
    theAnchor.addEventListener('click', function(event){
        event.preventDefault();
        let linkHref = document.querySelector(theAnchor.getAttribute('href'))
        linkHref.scrollIntoView({behavior: 'smooth'});
    });
}

function toTopScroll(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

```
