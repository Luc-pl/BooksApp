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

  const classNames = {
    books: {
      favoriteBook: 'favorite',
      rating: 'book__rating__fill',
      filters: '.filters',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor(){

      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.renderInBooks();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.bookTemplate = document.querySelector(select.templateOf.bookTemplate);
      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.booksImage = thisBooksList.booksContainer.querySelectorAll('.book__image');
      thisBooksList.filtr = document.querySelector('.filters');
      thisBooksList.form = document.querySelector(classNames.books.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }
    
    renderInBooks() {
      const thisBooksList = this;

      /*pętla po każdym elemencie - książce z dataSource.books*/
      for (let book of thisBooksList.data) {
        /*generate HTML na podstawie szablonu oraz danych o konkretnej książce*/
        //dodatkowo ĆWICZENIE NR 6 - RATING
        const ratingBgc = thisBooksList.determineRattingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate ({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });
        /*generowanie elementu DOM na podstawie kodu HTML*/
        const element = utils.createDOMFromHTML(generatedHTML);
        /*find booksList container i dołącz jako nowe dziecko DOM do listy .books-list*/
        const booksListContainer = document.querySelector(select.containerOf.booksList);
        booksListContainer.appendChild(element);
      }
    }

    //ĆWICZENIE 2
    /*const favoriteBooks = [];
    const filters = [];
    const filtr = document.querySelector('.filters');*/

    initActions() {
      const thisBooksList = this;

      /*pętla po każdym elemencie z listy*/
      for (let image of thisBooksList.booksImage){
        /*nasłuchiwacz uruchamiający funkcję dbclick i zatrzymujący domyślne zachowanie przeglądarki*/
        image.addEventListener('dblclick', function (event){
          event.preventDefault();
          const image = event.target.offsetParent; //ĆWICZENIE NR 4
          const idBook = image.getAttribute('data-id');
          //ĆWICZENIE 3 
          if(!thisBooksList.favoriteBooks.includes(idBook)){
            image.classList.add(classNames.books.favoriteBook);
            thisBooksList.favoriteBooks.push(idBook);
          } else {
            image.classList.remove(classNames.books.favoriteBook);
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(idBook), 1);
          }
                  
          /*
          if(!image.classList.contains(classNames.books.favoriteBook)){
            //dodanie do klikniętego elementu klasy favorite
            image.classList.add(classNames.books.favoriteBook);
            //pobranie z jego data-id identyfikatora - id książki
            //dodanie identyfikatora do tablicy favoriteBooks
            favoriteBooks.push(idBook);
            console.log(idBook);
          } else {
            favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
            image.classList.remove(classNames.books.favoriteBook);          
          }
          */
        });
      }
      //ĆWICZENIE NR 5

      //5.1.
      thisBooksList.form.addEventListener('change', function(event){
        event.preventDefault();
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'  && event.target.name==='filter') {
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
            console.log('warunek 1', thisBooksList.filters);
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(event.target.value));
            console.log('warunek 2', thisBooksList.filters);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    //5.2.
    filterBooks() {
      const thisBooksList = this;

      for (let book of this.data) {
        let shouldBeHidden = false;
        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.add('hidden');
        } else {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    }
    
    
    //ĆWICZENIE NR 6
    determineRattingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }

  }

  const app = new BooksList;
  app; 
}