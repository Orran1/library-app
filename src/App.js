import Nav from "./components/Nav";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import { books } from "./data";
import Footer from "./components/Footer";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useEffect, useState } from "react";

function App() {
  // set initial cart value to an empty array
  const [cart, setCart] = useState([]);

  // set initial book quantity to 1
  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  // add or adjust specific book quantity, and update cart state
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  // remove cart item
  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  // calculate total cart items
  // count each element's 'quantity' property and adds the total quantity to the counter
  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  useEffect(() => {
    // console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Go to Books component, and load books array */}
          <Route path="/books" element={<Books books={books} />} />
          {/* Show the selected book inside BookInfo component and change cart quantity */}
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          {/* display book details(image, title, price), show current cart state, with remove item and change quantity in Cart component*/}
          <Route
            path="/cart"
            element={
              <Cart
                books={books}
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
