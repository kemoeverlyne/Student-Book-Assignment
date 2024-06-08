import React, { useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia, Modal, IconButton, Button, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Book {
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
}

const ReadingList: React.FC<{ books: Book[], removeBook: (title: string) => void }> = ({ books, removeBook }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleRemoveBook = (title: string) => {
        removeBook(title);
        setSnackbarOpen(true);
    };

    return (
        <div style={{ padding: '20px', marginTop: '210px' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: '#335c6e' }}>Reading List</Typography>
            <Grid container spacing={2}>
                {books.map((book, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{ cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleBookClick(book)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={book.coverPhotoURL}
                                alt={book.title}
                            />
                            <CardContent>
                                <Typography variant="h6" style={{ marginBottom: '8px' }}>{book.title}</Typography>
                                <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: '8px' }}>
                                    by {book.author}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: '8px' }}>
                                    Level: {book.readingLevel}
                                </Typography>
                                <Button variant="contained" onClick={(e) => { e.stopPropagation(); handleRemoveBook(book.title) }} style={{ backgroundColor: '#5ACCCC', color: '#fff' }}>Remove</Button>
                                <Button variant="outlined" onClick={(e) => { e.stopPropagation(); setSelectedBook(book); }} style={{ marginLeft: '8px', borderBlockColor: '#335C6E', color: '#335C6E' }}>More Details</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={!!selectedBook}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: '8px', textAlign: 'center' }}>
                    <IconButton aria-label="close" onClick={handleCloseModal} sx={{ position: 'absolute', right: 5, top: 5 }}>
                        <CloseIcon />
                    </IconButton>
                    <img src={selectedBook?.coverPhotoURL} alt={selectedBook?.title} style={{ width: '200px', borderRadius: '8px', marginBottom: '16px' }} />
                    <Typography id="modal-modal-title" variant="h6" component="h2">{selectedBook?.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">by {selectedBook?.author}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">Level: {selectedBook?.readingLevel}</Typography>
                    <Button variant="contained" onClick={() => { handleRemoveBook(selectedBook?.title || ''); handleCloseModal(); }} style={{ marginTop: '16px', backgroundColor: '#335c6e', color: '#fff' }}>Remove</Button>
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Book removed from reading list"
            />
        </div>
    );
};

export default ReadingList;
