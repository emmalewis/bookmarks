# Bookmark web app
This is a simple bookmarking app. It uses localstorage to store a list of bookmarks. New bookmarks are checked to be valid urls and to exist (using the fetch API) and bookmarks cannot be duplicated. Saved bookmarks can be edited or removed.

It uses the relevant parts of Bootstraps "Reboot" css.

The JavaScript is composed of the following classes: 
- App (containing the form functionality and validation for adding a new bookmark), 
- List (displaying the bookmarks that appear on the current page, storing and reading the bookmarks data from local storage), 
- Pagination (displaying pagination if there are more than one page worth's of bookmarks)
- Bookmark (containing methods to edit / delete / render / save a bookmark)
as well as a couple of util functions for url validation and querystring parameter reading. In the absence of Google's Closure Library which provides goog.require, I've gone against the Google Styleguide and used ES6 imports to make the source code more readable. 

The JavaScript is minified using [Google's closure compiler](https://developers.google.com/closure/compiler/docs/api-tutorial3) with a compilation level of `ADVANCED`.

## TODO
- Add spinning/progress animation when checking if url exists
- Add search functionality
- When checking if bookmark already exists include variations for protocol / www presence / trailing slashes
- Add description field

## FILES
```
|-- scripts
|  |-- src
|  |  |-- components
|  |  |  |-- app.js
|  |  |  |-- bookmark.js
|  |  |  |-- list.js
|  |  |  |-- pagination.js
|  |  |-- index.js
|  |  |-- utils.js
|  |-- index-min.js
|-- styles
|  |-- index.css
|-- index.html
|-- results.html
```