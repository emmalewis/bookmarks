import Bookmark from './bookmark.js';
import {BOOKMARKS_PER_PAGE} from './app.js';

/**
 * Variable containing list of bookmarks, stored in localstorage
 */
export var bookmarks = [];

/**
 * List class managing a paginated list of bookmarks storing and retrieving 
 * bookmarks data from localstorage
 */
export default class List {
    constructor(currentPage) {
      this.currentPage = currentPage;
      this.results = document.getElementById('results');
      this.event = new Event('updatePagination');
    }
  
    init() {
      this.getBookmarks();
      // If user enters random high page number in url then redirect to page 1
      if ((this.currentPage - 1) * BOOKMARKS_PER_PAGE > bookmarks.length) {
        window.location = 'index.html';
      }
      this.displayBookmarks();
    }
  
    displayBookmarks() {
      if (bookmarks.length > 0) {
        var container = document.createElement('div');
        var heading = document.createElement('h2');
        heading.innerText = `Stored bookmarks (${bookmarks.length})`;
        var list = document.createElement('ul');
        list.classList.add('list');
        for (var i = (this.currentPage - 1) * BOOKMARKS_PER_PAGE; i < this.currentPage * BOOKMARKS_PER_PAGE && i < bookmarks.length; i++) {
          var bookmark = new Bookmark(bookmarks[i], this.removeBookmark.bind(this), this);
          list.appendChild(bookmark.getMarkup());
          bookmark.addEventHandlers();
        }
        container.appendChild(heading);
        container.appendChild(list);
        this.results.replaceChild(container, this.results.firstElementChild);
      } else {
        this.results.innerHTML = '<p>No results to display</p>';
      }
    }
  
    getBookmarks() {
      var bookmarksData = window.localStorage.getItem('bookmarks');
      bookmarks = bookmarksData ? JSON.parse(bookmarksData) : [];
    }
  
    removeBookmark(bookmark) {
      bookmarks.splice(bookmarks.indexOf(bookmark), 1);
      this.saveBookmarks();
      // If the deleted item is the last on a page then redirect to previous page
      if ((this.currentPage - 1) * BOOKMARKS_PER_PAGE === bookmarks.length) {
        window.location = `index.html?page=${this.currentPage - 1}`;
      }
      this.displayBookmarks();
      document.dispatchEvent(this.event);
    }
  
    saveBookmark(bookmark) {
      bookmarks.push(bookmark);
      this.saveBookmarks();
    };
    
    saveBookmarks() {
      window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };
  
    updateBookmark(oldBookmark, newBookmark) {
      bookmarks[bookmarks.indexOf(oldBookmark)] = newBookmark;
      this.saveBookmarks();
      this.displayBookmarks();
    }
  }