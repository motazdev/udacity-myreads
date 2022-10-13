import CurrentlyReading from "../components/CurrentlyReading";
import WantToRead from "../components/WantToRead";
import Read from "../components/Read";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { update, get, getAll }  from "../BooksAPI";
const Home = () => {

    const [currReading, setCurrReading] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [read, setRead] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
      getComponentBooks()
    },[])

    const getComponentBooks = () => {
      getAll().then((res) => {
        const currReadingBooks = res.filter((book) => book.shelf === "currentlyReading" )
        const wantToReadBooks = res.filter((book) => book.shelf === "wantToRead" )
        const readBooks = res.filter((book) => book.shelf === "read" )
        setCurrReading(currReadingBooks)
        setWantToRead(wantToReadBooks)
        setRead(readBooks)
        setIsLoading(false)
      })
    }

    

    const addToShelf = async (e) => {
        const data = handleUpdate(e);
        console.log(data[1])
    
        const book = await getBook(data[1])
        console.log(data[0])

        if(data[0] === "wantToRead") {
            await update(book, data[0])
            getComponentBooks()

        } else if(data[0] === "currentlyReading") {
            await update(book, data[0])
            getComponentBooks()

        } else if(data[0] === "read") {
            await update(book, data[0])
            getComponentBooks()
        } else {
            console.log("none bro")
        }

      }
    
      const handleUpdate = (e) => {
        const shelfName = e.target.value;
        const bookId = e.target.id;
    
        return [shelfName, bookId];
      }
    
      const getBook = (id) => {
        const res = get(id)
        return res;
      }

    return (
        <div className="home">
                <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <CurrentlyReading addToShelf={addToShelf} isLoading={isLoading} books={currReading} />
                
                    <WantToRead addToShelf={addToShelf} isLoading={isLoading} books={wantToRead} />

                    <Read addToShelf={addToShelf} isLoading={isLoading} books={read} />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
                </div>
        </div>        
    );
}
 
export default Home;