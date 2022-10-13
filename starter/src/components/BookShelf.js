const BookShelf = ({ addToShelf, book, ownedBooksTitles }) => {
    return (
        <select onChange={addToShelf} defaultValue={book.shelf ? book.shelf : "emptyshelf"} className={`${book.shelf}-class`} id={book.id}>
            <option value="emptyshelf" disabled>
            Move to...  
            </option>
            {ownedBooksTitles && ownedBooksTitles.map((e) => (
                <option>{e}</option>
            ))}
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {book.shelf && <option value="none">None</option>}
      </select>
    );
}
 
export default BookShelf;