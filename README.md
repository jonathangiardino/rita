# Rita

‘Rita is a single page application to help you find a Pizza around you, wherever you are in the world.
‘Rita stands for Margherita (Classic Tomato and Cheese in English), the most popular and original Pizza ever known.
It works really easily, you just need to click on the Pizza Locator button and the website will prompt you to activate location services to locate your current position.          
Once that is done, ‘Rita will Locate all the Pizza reseller around you using Google Places API and the game is on!
Stop mouth-watering thinking of Pizza, use ‘Rita to find the closest Pizza and treat yourself.

# Demo

A live demo can be found [here](https://jonathangiardino.github.io/rita/).


![alt text](https://github.com/jonathangiardino/rita/blob/master/assets/img/DemoRita.gif "Demo")

# UX

The UX strategy here can be summarised in one world, “simple”.
As a user I am looking for a place which serves Pizza or sells take-away Pizza, I would like something easy to use and fast to find a place where I can eat, and have the chance to connect on their website to see opening times, and phone number in case I want to book a table.
The idea is that the scope is minimal, click on the button, locate your position, show Pizza places around you wherever you are or in a different location.
The site is very likely to be used mostly on mobile devices. Therefore having a mobile responsive and easy to use version is very important.

These were the wireframes I created while designing:

_Desktop_
[Link](https://www.figma.com/proto/DTWfXGfx2BnbLnLtnwYZwHUA/Rita?node-id=6%3A39&viewport=313%2C421%2C0.19534499943256378&scaling=min-zoom)


_Mobile_
[Link](https://www.figma.com/proto/DTWfXGfx2BnbLnLtnwYZwHUA/Rita?node-id=10%3A80&viewport=-486%2C378%2C0.7793922424316406&scaling=min-zoom)


The final version has changed from the wireframe in terms of style, for instance when I designed the website I thought of using a map as background but then I realised then having a Pizza would have made more sense and it is actually better looking and modern.


# Features
It was important to make UX easy and pleasant, hence the features should help to do so.


__Existing Features__

1. _Button LOCATE ME_ - allows users click and get their location; User will be prompted to allow location service otherwise the system will return the message “Geolocation not possible”.
Button LOCATE ME - Additionally the button brings you to the Map Section Below automatically scrolling to it when clicking.

2. _Button WHAT IS ‘RITA_ - The button brings you directly to the Botton of the page where you can find the section “HOW IT WORKS”, and understand how the service works.
3. _MAP_ - The map is loaded from Google Maps API and has Naples as initial location due to the popularity of Pizza there, being the capital of preparation and tradition.

Pizza Place Panel - It is a side panel on Desktop and bottom Panel on Mobile, that opens when clicking on the marker of a Pizza place on the map to show info, rating and website.
4. _Button HIDE/SHOW_ - The button allows the user to hide the panel to have a better focus on the map if desired.

5. _Button SOCIALS_ - ‘Rita is not a real company hence I implemented these social buttons that bring the users to the related social networks (Facebook, Instagram, Pinterest) and are linked to all the posts using the hashtag #Pizza.

__Features in progress__

* Search Box - looking for Pizza Places in other locations


# Technologies Used

_HTML5 & CSS3_

* I have used HTML and CSS to build the graphic interface and decided to work exclusively with CSS Flexbox and Grid instead of using Frameworks like Bootstrap.
To do so I have used as reference [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

_Javascript_

* I have used JS to Implement  the Google Maps API and to make the website dynamic (Buttons and Toggles)

_Google Maps Javascript API & Google Maps Places API_

* [Link](https://developers.google.com/maps/documentation/javascript/tutorial)
I have used the Libraries of Google Maps above to integrate a map and all the businesses for the scope of the project.

# Testing

Site has been tested and everything is in place to do what is supposed to, please read below for more details about the process.

1. __What is 'Rita Button__
- Click on What is 'Rita to go on the How it works section
- Verify page scrolls to the related section smoothly.

2. __Locate Me button__
- Click on the button "Locate Me".
- A prompt form the browser will appear.
- Click "Block" on the page prompt that asks you to show your location and verify that the message " The Geolocation service failed, reload the page and click Ok" is shown.
- Reload the page and click "Ok" on the page prompt and verify that: a) The page scrolls to the map and b) that your location is found.
- Check that markers for pizza restaurants are shown


3. __Click on a marker__
- Verify that the info window is shown with the Name and Rating of the restaurant.
- Verify that Info window disappear after 3 seconds.
- Verify that side bar with results show on the right (Desktop and Tablet) and below the map (on Mobile devices).


4. __Results side bar__
- Verify that when a marker is clicked side bar opens.
- Verify that the side bar shows place's name, rating, address and website link.
- Click on the website link and verify it opens another tab


5. __Hide and show button__
- Click on the button and verify that the side bar show and hide at every click


6. __Social network buttons__
- Click on each social button and verify that opens in another tab.

The site has been tested an all the browsers and responds very well on all of them. Moreover the implementation and usage of CSS FlexBox helped to make the website 100% responsive to any device , scaling to any size smoothly.


__During the production the followings bugs have been encountered and solved:__


* __NATIVE SIDEBAR FROM GOOGLE__  the native sidebar from Google Maps, to show the results when clicking on the info window was working well on desktop, however when scaling to tablet and mobile it was not reducing its size and accordingly was covering the map not giving the option to users to check the map. _Solution_: I have created a column outside the map which would be shown only when user clicks on the marker, and having created the columns for results with SS Flexbox i was able to add the property wrap which helped to overcome the issue and scale perfectly on different devices

* __LINKS IN THE SIDEBAR__  after the first tests the links were not opening in a new tab, the “a” elements were not create din the HTML hence I had to figure out how to overcome this as the UX would be very negative if any restaurant’s site clicked would lead you to another site. _Solution_:  I created a variable called target and assigned the value of “websiteLink.setAttribute('target', ‘_blank’);”_ This resolved the issue.

* __MAP SIZE ON MOBILE__ when switching to mobile, the map was taking the whole space/screen hence every time the user would click on a marker the results would not be visible. _Solution_: I created a Media query that would resize the map to the 60% of its height in order to show the results at every click, and created a button to hide the results if now desired.

Code was validated on https://validator.w3.org/  and https://jigsaw.w3.org/css-validator/


# Deployment

This site is hosted using [GitHub pages](https://pages.github.com/), deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch.

The process to deploy on GitHub page is the following:
* From https://github.com/jonathangiardino/rita , the master branch.
* Make sure the source is the master branch and publish.
* GitHub will generate the URL which is always available in the settings of the Repository

To run locally, you can clone this repository directly into your editor by pasting git clone https://github.com/jonathangiardino/rita.git into your terminal. To do so, type git remote rm origin into the terminal.

# Credits

**Content**
* All the content was written by myself

**Media**
* The background picture was obtained from StaticFlickr [here](https://live.staticflickr.com/2116/1856608392_c680ddb408_b.jpg)

* The Logo Icon was obtained from [Freepik](https://www.freepik.com) and [Flaticon](https://www.flaticon.com)

* All the media regarding the restaurants are taken directly from _Google Maps API_

**Acknowledgements**

* I got inspiration for the animation of the heart heading from [here](https://cssanimation.rocks/animating-hero-header/)

* The scroll function for Safari and Edge was obtained form [here](https://embed.plnkr.co/plunk/29jeYo)


* The Nearby Place App was inspired by this tutorial from 
[Google Code Labs Developers](https://codelabs.developers.google.com/codelabs/google-maps-nearby-search-js/index.html?index=..%2F..io2019#3)
And its relative [repository](https://github.com/googlecodelabs/google-maps-nearby-search-js/blob/master/step4/index.html#L213)
