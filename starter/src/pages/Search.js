import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search, update, get, getAll }  from "../BooksAPI";
import BookShelf from "../components/BookShelf";
const Search = () => {

  const [query, setQuery] = useState([]);
  const [ownedBooks, setOwnedBooks] = useState([]);


  useEffect(() => {
    getAll().then((books) => {
      setOwnedBooks(books)
    })
  }, [])


  const fetchBooks = async (e) => {
    const que = e.target.value;
    if(que.length > 0) {
      search(que).then((results) => {
        
        if (results.error !== 'empty query' && que !== "") {
          setQuery(results)
        } else {
          setQuery([])
        }
      })
    }
  }

  const updatedBooks = query.map((query) => {
    ownedBooks.map((book) => {
        if(book.title === query.title) {
          query.shelf = book.shelf;
        } 
      
        return book;
      })

    return query;
  })

  const addToShelf = async (e) => {
    const data = handleUpdate(e);
      
    const book = await getBook(data[1])
    const res = await update(book, data[0])
    
    console.log(data[0])
    console.log(res)
  }

  const handleUpdate = (e) => {
    const shelfName = e.target.value;
    const bookId = e.target.id;

    return [shelfName, bookId];
  }

  const getBook = async (id) => {
    const res = await get(id)
    return res;
  }


  
  return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={fetchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
        { updatedBooks &&
          updatedBooks.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage:
                        `url(${book.imageLinks.smallThumbnail})`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <BookShelf addToShelf={addToShelf} book={book} />
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(",")}</div>
              </div>
            </li>
          ))
        }
        </ol>
      </div>

      </div>
    );
}
 
export default Search;