{
  'use strict';

  //referencja do szablonu template oraz books-list
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  /* funkcja render*/
  function renderInBooks() {

    /*pętla po każdym elemencie - książce z dataSource.books*/
    for (let book of dataSource.books) {
      /*generate HTML na podstawie szablonu oraz danych o konkretnej książce*/
      const generatedHTML = templates.bookTemplate(book);
      /*generowanie elementu DOM na podstawie kodu HTML*/
      const element = utils.createDOMFromHTML(generatedHTML);
      /*find booksList container i dołącz jako nowe dziecko DOM do listy .books-list*/
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(element);
    }
  }
  renderInBooks();

}