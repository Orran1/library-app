import React from "react";
import Book from "./ui/Book";
import { books } from "../data";

const Features = () => {
  return (
    <section id="features">
      <div className="row">
        <h2 className="section__title">
          Featured <span className="purple">Books</span>
        </h2>
        <div className="books">
          {/* display four 5-star rated books */}
          {books
            .filter((book) => book.rating === 5 )
            .sort(() => Math.random() - 0.5) // Shuffle the array randomly
            .slice(0, 4)
            .map((book) => (
              <Book book={book} key={book.id}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
