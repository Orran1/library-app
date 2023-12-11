import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/ui/Rating";
import Price from "../components/ui/Price";
import Book from "../components/ui/Book";

const BookInfo = ({ books, addToCart, cart }) => {
  const { id } = useParams();
  // search the book in books array that matches the url id
  const book = books.find((book) => +book.id === +id);

  // add selected book to the cart array when 'add to cart' button is clicked
  function addBookToCart(book) {
    addToCart(book);
  }

  // search book id that matches the id in cart array
  function bookExistsOnCart() {
    return cart.find((book) => book.id === +id);
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti reiciendis blanditiis sequi? Qui, facere error ea
                    praesentium, voluptates dolore ipsam natus molestiae nulla
                    obcaecati libero quas, recusandae incidunt corporis officia!
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti reiciendis blanditiis sequi? Qui, facere error ea
                    praesentium, voluptates dolore ipsam natus molestiae nulla
                    obcaecati libero quas, recusandae incidunt corporis officia!
                  </p>
                </div>
                {/* show checkout if book exists in cart, otherwise show add to cart */}
                {bookExistsOnCart() ? (
                  <Link to="/cart" className="book__link">
                    <button className="btn">Checkout</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addBookToCart(book)}>
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            <div className="books">
              {/* show 4 books with rating of 4 or higher */}
              {books
                .filter((book) => book.rating > 4 && +book.id !== +id)
                .slice(0, 4)
                .map((book) => (
                  <Book book={book} key={book.id} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;
