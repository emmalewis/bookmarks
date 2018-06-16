import List, {bookmarks} from './list.js';
import Pagination from './pagination.js';
import {validateUrl, getQueryVariable} from '../utils.js';

/**
 * Number of bookmarks per page
 * @const
 */
export var BOOKMARKS_PER_PAGE = 20;

/**
 * App class managing app flow and handling new bookmark form entry
 */
export class App {
    constructor() {
      this.form = document.getElementById('form');
      this.input = this.form ? this.form.querySelectorAll('input')[0] : null;
      this.error = this.form ? this.form.querySelectorAll('.error')[0] : null;
      this.list = null;
      // Get current page from querystring parameter
      this.currentPage = parseInt(getQueryVariable('page'), 10) || 1;
    }
  
    init() {
      if (this.form) {
        this.list = new List(this.currentPage);
        this.list.init();
        var pagination = new Pagination(this.currentPage);
        pagination.init();
        this.form.addEventListener('submit', this.addNewBookmark.bind(this));
      } else {
        var bookmark = decodeURIComponent(getQueryVariable('bookmark'));
        var link = document.getElementById('bookmark');
        link.innerText = bookmark;
        link.href = bookmark;
      }
    }
    
    addNewBookmark(e) {
      e.preventDefault();
      var bookmark = this.input.value;
      this.error.innerText = '';
      this.input.classList.remove('input-error');
      if (validateUrl(bookmark)) {
        if (bookmarks.indexOf(bookmark) < 0) {
          fetch(bookmark, {mode: 'no-cors'})
            .then((response) => {
              this.list.saveBookmark(bookmark);
              this.form.removeEventListener('submit', this.addNewBookmark);
              this.form.submit();
            })
            .catch(() => {
              this.error.innerText = 'Please check URL exists';
              this.input.classList.add('input-error');
            });
        } else {
          this.error.innerText = 'You have already saved this link!';
          this.input.classList.add('input-error');
        }
      } else {
        this.error.innerText = 'Please enter a valid url';
        this.input.classList.add('input-error');
      }
    }
  };