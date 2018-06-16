import {BOOKMARKS_PER_PAGE} from './app.js';
import {bookmarks} from './list.js';

/**
 * Pagination class handling paging 
 */
export default class Pagination {
    constructor(currentPage) {
      this.container = document.getElementById('pagination');
      this.totalPages = 1;
      this.currentPage = currentPage;
    }
  
    init() {
      this.render();
      document.addEventListener('updatePagination', this.render.bind(this));
    }
  
    createLink(href, text, className) {
      var link = document.createElement('a');
      link.innerText = text;
      link.href = href;
      link.classList.add(...className);
      return link;
    }
  
    createNextLink() {
      return this.currentPage === this.totalPages ?
          this.createLink('', 'Next', ['next', 'disabled']) :
          this.createLink(`?page=${this.currentPage + 1}`, 'Next', ['next']);
    }
  
    createPrevLink() {
      return this.currentPage === 1 ?
          this.createLink('', 'Previous', ['prev', 'disabled']) :
          this.createLink(`?page=${this.currentPage - 1}`, 'Previous', ['prev']);
    }
  
    getTotalPages() {
      this.totalPages = Math.ceil(bookmarks.length / BOOKMARKS_PER_PAGE);
    }
  
    render() {
      if (Math.ceil(bookmarks.length / BOOKMARKS_PER_PAGE) === this.totalPages) {
        return;
      }
      this.getTotalPages();
      var paginationNav = document.createElement('nav');
      if (this.totalPages > 1) {
        paginationNav.appendChild(this.createPrevLink());
        for (var i = 1; i <= this.totalPages; i++) {
          var pageLink = this.createLink(`?page=${i}`, i, this.currentPage === i ? ['page', 'active'] : ['page']);
          paginationNav.appendChild(pageLink);
        }
        paginationNav.appendChild(this.createNextLink());
        if (this.container.firstElementChild) {
          this.container.replaceChild(paginationNav, this.container.firstElementChild);
        } else {
          this.container.appendChild(paginationNav);
        }
      } else {
        this.container.innerHTML = '';
      }
    }
  }