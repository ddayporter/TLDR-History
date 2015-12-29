# TLDR-History
WDI - Project 3

This single-page app compiles "TL;DR" (too long; didn't read) summaries of historical events - the funnier the better! Users can view events and their summaries added by others, and add their own. A user can also tweet out their favorite summaries and the tweet will mention the twitter handle of the app creators ("@TLDRhistory").

# Group Members
* Tory Burgett
* Dumitru "Dimitri" Gorgan
* Rachel Porter

## Technologies Used
Express, MongoDB/Mongoose, JavaScript/jQuery/AJAX, Bootstrap

## Approach
We found we had common interests in the show "Drunk History," and decided to try to combine the "history in your own words" concept with microblogging, and created TLDR History.

### User Stories
A user should be able to...
* navigate through all features of the app without any full-page refreshes in order to have a seemless experience
* view a list of historical events and see an image associated with each event
* have the option to create their own, or edit/delete the ones they've created
* select an event and view the TLDR summary or summaries created for it
* create or delete a TLDR for a given event
* use the concept of upvoting to indicate their favorite TLDR and see how popular each TLDR is based on votes from other users
* tweet out their favorite TLDR

## Installation Instructions
```
git clone https://github.com/ddayporter/TLDR-History.git
npm install
node db/seeds.js
```

You'll need to create an ```env.js``` file and then add your Twitter API credentials.

```
// in env.js

// The below information can be found in the application management page of your Twitter app - https://apps.twitter.com/
module.exports = {
  sessionSecret: "candyland",
  twitter: {
    consumerKey: "abc123",
    consumerSecret: "def456",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
}

```
then run ```nodemon``` to test on localhost:3000.

## Future Features
* Upvoting - We were not able to implement upvoting during the project week so that would be a high priority implementation
* User Authentication - We are able to log in using a local strategy or twitter, but don't yet have any restricted functions available only to users - we'd like to reserve create/update/delete functions for logged in users only.

## Unsolved Problems
* Jasmine tests - We used the concept of tests to help drive the early development of the app but didn't actually create any functional tests
* Clicking "cancel" on the "create new event" form creates an issue with duplicative posting later
