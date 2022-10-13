import PropTypes from "prop-types";

const WantToRead = ({ isLoading, books, addToShelf }) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
                  {
                    !isLoading ? 
                    <ol className="books-grid">
                    {
                      books.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 188,
                                backgroundImage:
                                  `url(${book.imageLinks.smallThumbnail})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select onChange={addToShelf} defaultValue={book.shelf} id={book.id}>
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(",")}</div>
                        </div>
                      </li>                        
                      ))
                    }
                  </ol> : <h1>Loading...</h1>
                  }

                </div>
        </div>        
    );
}

WantToRead.propTypes = {
  books: PropTypes.array.isRequired,
  addToShelf: PropTypes.func.isRequired,
};
export default WantToRead;