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

  const classNames = {
    books: {
      favoriteBook: 'favorite',
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

  const favoriteBooks = [];
  console.log(favoriteBooks);

  function initActions(){
    /*referencję do listy wszystkich elementów .book__image w liście .booksList*/
    const booksImage = document.querySelectorAll(select.booksCover.images);
    console.log(booksImage);
    /*pętla po każdym elemencie z listy*/
    for (let image of booksImage){
      /*nasłuchiwacz uruchamiający funkcję dbclick i zatrzymujący domyślne zachowanie przeglądarki*/
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        /*dodanie do klikniętego elementu klasy favorite*/
        image.classList.add(classNames.books.favoriteBook);
        /*pobranie z jego data-id identyfikatora - id książki*/
        const idBook = image.getAttribute('data-id');
        /*dodanie identyfikatora do tablicy favoriteBooks*/
        favoriteBooks.push(idBook);
      });
    }
  }
  initActions();
}