import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://d1krvzwx5oquy1.cloudfront.net/books.json');
        setBooks(response.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(prevSelectedBook => prevSelectedBook === book ? null : book);
  };

  return (
    <div className="bg-gradient-to-b from-purple-400 to-blue-500 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Book Explorer</h1>
        <input
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500 shadow-sm mb-4"
          type="text"
          placeholder="Search for books..."
          autoFocus={true}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.filter(book =>
            book.volumeInfo.authors.toString().toLowerCase().includes(query.toLowerCase()) ||
            (book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && book.volumeInfo.categories[0].toString().toLowerCase().includes(query.toLowerCase()))
          ).map(book => (
            <div key={book.id} className="bg-white rounded-md p-4 cursor-pointer" onClick={() => handleBookClick(book)}>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="h-48 w-auto mb-2"
              />
              <h3 className="text-xl font-semibold text-gray-800">{book.volumeInfo.title}</h3>
              <p className="text-base text-gray-600">{book.volumeInfo?.subtitle}</p>
              <p className="text-base text-gray-700">by {book.volumeInfo.authors.join(', ')}</p>
              {selectedBook && selectedBook.id === book.id && (
                <div className="mt-4">
                  <p className="text-base text-gray-700 mb-2">{book.volumeInfo.description}</p>
                  <div>
                    <a
                      href={book.saleInfo?.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                    >
                      Buy
                    </a>
                  </div>
                  <div>
                    <label>Published By:</label>
                    <h4 className="text-base font-semibold text-gray-700">{book.volumeInfo.publisher}</h4>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


