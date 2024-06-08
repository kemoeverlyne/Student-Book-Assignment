import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';

interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}

const App: React.FC = () => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addBook = (book: Book) => {
    if (!readingList.some(b => b.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };

  const removeBook = (title: string) => {
    setReadingList(readingList.filter(book => book.title !== title));
  };

  return (
    <>
      <Navbar handleSearch={function (): void {
        throw new Error('Function not implemented.');
      }} searchResults={[]} handleAddBook={function (): void {
        throw new Error('Function not implemented.');
      }} />
      <Typography variant="h4" gutterBottom>
      </Typography>
      <Routes>
        <Route path="/" element={<BookSearch addBook={addBook} />} />
        <Route path="/reading-list" element={<ReadingList books={readingList} removeBook={removeBook} />} />
      </Routes>
    </>
  );
};

export default App;
