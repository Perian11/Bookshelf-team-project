import { APIService } from './API-service';
import { highlightCategory } from './book-categories';

const api = new APIService();

const bookGallery = document.querySelector('.books-gallery');

async function getBestSellers() {
  const response = await api.fetchBestSellersBooks();
  const bestSellers = await response.data;
  return bestSellers;
}

function createBookCategoryMarkup(category) {
  return `
  
    <li class="book-category-item">
      <p class="book-category">${category.list_name}</p>
      <ul class="top-books bestsel-books js-list-rendering">
        ${category.books
          .map(book => {
            return `
              <li class="book-card flex-element" id=${book._id}>
              <div class="book-thumb">
                <img class="book-cover" src="${book.book_image}" alt="${book.title}" loading="lazy" />
                <div class="quick-view">
                <p class="quick-view-text">QUICK VIEW</p>
                </div>
                </div>
                <h2 class="book-name">${book.title}</h2>
                <h3 class="book-author">${book.author}</h3>
              </li>
            `;
          })
          .join('')}
      </ul>
      <button class="book-card-btn" type="button" data-category="${category.list_name}">see more</button>
    </li>
  `;
}

export default async function renderCategories() {
  let bookCategories = '<ul class="top-books rendering-gap js-list-rendering">';
  const topBooks = await getBestSellers();
  for (let category of topBooks) {
    bookCategories += createBookCategoryMarkup(category);
  }
  bookCategories += '</ul>';
  bookGallery.innerHTML = `<h1 class="collection-title">Best Sellers <span>Books</span></h1>`;
  const bookCollection = document.createElement("div");
  bookCollection.className = "books-collection";
  bookCollection.innerHTML = bookCategories;
  bookCollection.addEventListener('click', onSeeMoreBtnClick);

  bookGallery.appendChild(bookCollection);
}



if (bookGallery) {
  renderCategories();
}

async function onSeeMoreBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const target = e.target;
  if (target.matches('button[data-category]')) {
    const category = target.dataset.category;

    const titleCollection = bookGallery.querySelector('.collection-title')
    titleCollection.innerHTML = `${removeLastWord(category)} <span>${LastWord(category)}</span>`;

    highlightCategory(category);
    await createBooksOnSeeMoreBtn(category);
  }
}

function removeLastWord(category) {
  let words = category.split(' ');
  words.pop();
  let result = words.join(' ');
  return result;
}

function LastWord(category) {
    var words = category.trim().split(" "); //Splitting sentence into words
    return words[words.length - 1]; //Returning the last word
}
  
async function createBooksOnSeeMoreBtn(category) {
  const res = await api.fetchBooksByCategory(category);
  const books = await res.data;
  function collectionMarkup() {
    return `
    <ul class="top-books rendering-gap js-list-rendering">
    ${books
      .map(({ title, book_image, author, _id }) => {
        return `
        <li class="book-card" id=${_id}>
        <div class="book-thumb">
         <img class="book-cover" src="${book_image}" alt="${title}" loading="lazy">
         <div class="quick-view">
          <p class="quick-view-text">QUICK VIEW</p>
         </div>
        </div>
      <h2 class="book-name">${title}</h2>
      <h3 class="book-author">${author}</h3>
  </li>
  `;
      })
      .join('')}
    </ul>`;
  }
  const bookCollection = bookGallery.querySelector(".books-collection");
  bookCollection.innerHTML = collectionMarkup();
}


// ========================//
// On All Categories Click //
// ========================//


//             if (text.length > limit) {
//               cuttedText += '...';
//             }



