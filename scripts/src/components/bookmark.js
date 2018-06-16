import {bookmarks} from './list.js';
import {validateUrl} from '../utils.js';

/**
 * Bookmark class handling rendering, editing, deleting of bookmarks
 */
export default class Bookmark {
    constructor(url, removeFromList, list) {
      this.url = url;
      this.removeFromList = removeFromList;
      this.list = list;
      this.itemTemplateHtml = document.getElementById("template-list-item").innerHTML;
      this.editTemplateHtml = document.getElementById("template-list-item-edit").innerHTML;
      this.listItem = null;
    }
  
    addEventHandlers() {
      this.listItem.addEventListener('click', this.handleButtonClick.bind(this));
    }
  
    delete() {
      this.removeFromList(this.url);
      this.destroy();
    }
  
    destroy() {
      this.listItem.removeEventListener('click', this.handleButtonClick);
    }
  
    edit() {
      this.listItem.innerHTML = this.editTemplateHtml.replace(/{{bookmark}}/g, this.url);
    }
  
    getMarkup() {
      this.listItem = document.createElement('li');
      this.listItem.classList.add('list-item');
      this.listItem.innerHTML = this.itemTemplateHtml.replace(/{{bookmark}}/g, this.url);
      return this.listItem;
    }
  
    handleButtonClick(e) {
      if (e.target.dataset.action === 'edit') {
        this.edit();
      } else if (e.target.dataset.action === 'delete') {
        this.delete();
      } else if (e.target.dataset.action === 'save') {
        this.save(e);
      }
    }
  
    renderMarkup() {
      this.listItem.innerHTML = this.itemTemplateHtml.replace(/{{bookmark}}/g, this.url);
    }
  
    save(e) {
      e.preventDefault();
      var error = this.listItem.querySelectorAll('.error')[0];
      var input = this.listItem.querySelectorAll('.input')[0];
      error.innerText = '';
      input.classList.remove('input-error');
      var bookmark = input.value;
      if (this.url === bookmark) {
        this.renderMarkup();
      } else if (validateUrl(bookmark)) {
        if (bookmarks.indexOf(bookmark) < 0) {
          fetch(bookmark, {mode: 'no-cors'})
            .then((response) => {
              this.list.updateBookmark(this.url, bookmark);
              this.url = bookmark;
            })
            .catch(() => {
              error.innerText = 'Please check URL exists';
              input.classList.add('input-error');
            });
        } else {
          error.innerText = 'You have already saved this link!';
          input.classList.add('input-error');
        }
      } else {
        error.innerText = 'Please enter a valid url';
        input.classList.add('input-error');
      }
    }
  }