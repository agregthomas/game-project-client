# Tic-Tac-RUH-ROH!
### Or How I Learned to Stop Worrying and Love the Bomb
=======================================================

## Technologies Used
* HTML
  - HTML5 DOM traversal/manipulation methods
  - Semantic elements in index.html
* CSS
  - SASS
  - Bootstrap
* JavaScript
  - jQuery Library
  - GA library (getFormFields!)

=======================================================
## Planning
Planning began with a thorough review of the requirements for building this tic-tac-toe responsive webpage from scratch. These requirements were subsequently broken up into high-level categories with mid-level sub-categories:
* **Project Organization**
  * File/Directory structure
  * Languages to be used
* **Page Design**
  * [User Stories](./user-stories.md)
  * [Wireframes](./wireframes.jpg)
* **Authenatiction**
  * Sign-Up
  * Sign-In
  * Change Password
  * Conditional visibility for signed-in users vs. signed-out users
* **Game Logic**
  * Create a New Game
  * Resolve a Game on win, draw, or starting a new game while in progress
  * Retrieve last played game that was not finished
  * User Feedback handling (e.g. alerts from both valid and invalid moves)
* **Stylizing**
  - UX-minded design (e.g. convenient placement of buttons)
  - Creation of Game Board

Whiteboarding the pseudo-code above resulted in more concrete instantiations of JS objects and their attendant HTML elements.

From there, building the modules followed a linear progression based on the categories above. The project began with four simple files:
* **index.html** = page source
* **app.js** = all event listeners for authentication AND game logic
* **config.js** = path to the dev and production URLs
* **store.js** = storage for temporary variables used in front-end calculations

Two directories were created: one for authentication modules and the other for game modules. Each of the directories had the following modules:
* **api.js** = calls made to the API (e.g. GET, PATCH, DELETE)
* **events.js** = event handlers
* **ui.js** = page manipulation and front-end calculations (e.g. writing to the store variable)

Last but not least, several style sheet files were created. Most of which have not been fully integrated!

### The twist!
As mentioned in the description, this is not your ordinary game of tic-tac-toe! Should the player so choose, a randomizer can be added to the game turning one of the 9 input cells into a bomb. Clicking this cell results in the unfortunate soul's instantaneous loss!

=======================================================
## Remaining Items
### Bugs
* Handling for clicking cells and bomb button when not logged in

### Stretch Goals
* Implement multiplayer functionality
* Style the page
* Add modal messaging on game resolution
* More styling on the page
* Localization (at least to Spanish!)
* Implement a computer player
