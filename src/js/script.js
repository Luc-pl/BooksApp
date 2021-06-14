{
  'use strict';

  //referencja do szablonu template oraz books-list
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksCover: {
      images: '.books-list .book__image',
    }
  };

  /*const classNames = {
    books: {
      favoriteBook: 'favorite .books-list',
    }
  };*/

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  /*class Bookslist {
    constructor(){
      const thisBooksList = this;

      thisBooksList.renderInBooks();
      thisBooksList.initAction();
    }
    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.booksFiltered = document.querySelector(select.containerOf.filters);
    }
  }*/

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

  const favoriteBooks = [];

  function initActions(){
    
    /*referencję do listy wszystkich elementów .book__image w liście .booksList*/
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');
    /*pętla po każdym elemencie z listy*/
    for (let image of booksImage){
      /*nasłuchiwacz uruchamiający funkcję dbclick i zatrzymujący domyślne zachowanie przeglądarki*/
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        /*dodanie do klikniętego elementu klasy favorite*/
        image.classList.add('favorite');
        /*pobranie z jego data-id identyfikatora - id książki*/
        const idBook = image.getAttribute('data-id');
        /*dodanie identyfikatora do tablicy favoriteBooks*/
        favoriteBooks.push(idBook);
        console.log(idBook);
        //ĆWICZENIE NR 3
        if(!favoriteBooks.constains(idBook)){
          image.classList.add('favorite');
          favoriteBooks.push(idBook);
        } else {
          image.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
        }
      });
    }
  }
  initActions();
  

}