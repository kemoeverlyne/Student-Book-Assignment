import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, Button, Container, InputAdornment, Snackbar, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { graphqlClient } from '../graphql/client';
import { BOOKS_QUERY } from '../graphql/queries';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

interface Book {
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
}

const StyledListItem = styled(ListItem)({
    padding: '8px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const TextContainer = styled('div')({
    flex: '1',
    marginLeft: '16px',
    fontFamily: 'Mulish, sans-serif',
});

const Author = styled('div')({
    color: '#888',
});

const StyledButton = styled(Button)({
    marginLeft: '16px',
    backgroundColor: '#5acccc', 
    color: 'white', 
    '&:hover': {
        backgroundColor: '#355c6e', 
        color: 'white',
    },
});

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '50px',
        '& fieldset': {
            borderColor: '#fabd33',
        },
        '&:hover fieldset': {
            borderColor: '#fabd33',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fabd33',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#fabd33',
        fontFamily: 'Mulish, sans-serif', 
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 14px',
    },
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
});

const CenteredContainer = styled(Container)(({ isMobile }: { isMobile: boolean }) => {
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm')); 
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
        marginTop: isMobile ? theme.spacing(5) : (isSmallDevice ? '120px' : '200px'),
    };
});

const BookSearch: React.FC<{ addBook: (book: Book) => void }> = ({ addBook }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [addedBook, setAddedBook] = useState<string | null>(null); 
    const [readingList, setReadingList] = useState<string[]>([]); 

    useEffect(() => {
        const fetchBooks = async () => {
            const { books } = await graphqlClient.request<{ books: Book[] }>(BOOKS_QUERY);
            setBooks(books);
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddBook = (book: Book) => {
        addBook(book);
        setNotificationOpen(true);
        setAddedBook(book.title); 
        setReadingList(prevList => [...prevList, book.title]); 
    };

    const handleCloseNotification = () => {
        setNotificationOpen(false);
    };

    return (
        <div>
            <CenteredContainer isMobile={false}>
                <CustomTextField
                    variant="outlined"
                    fullWidth
                    placeholder='enter book title.....'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon style={{ color: '#fabd33' }} />
                            </InputAdornment>
                        ),
                    }}
                    style={{ maxWidth: '600px' }}
                />
            </CenteredContainer>
            {searchTerm && (
                <List style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxHeight: '300px', overflowY: 'auto' }}>
                    {filteredBooks.map((book, index) => (
                        <StyledListItem key={index}>
                            <Card style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        src={book.coverPhotoURL}
                                        alt={book.title}
                                        style={{ width: '64px', height: '64px', borderRadius: '8px', marginRight: '16px' }}
                                    />
                                    <TextContainer>
                                        {book.title}
                                        <Author>{book.author}</Author>
                                    </TextContainer>
                                    {addedBook === book.title || readingList.includes(book.title) ? (
                                        <CheckCircleIcon sx={{ color: '#4caf50' }} /> 
                                    ) : (
                                        <StyledButton variant="contained" onClick={() => handleAddBook(book)}>
                                            Add
                                        </StyledButton>
                                    )}
                                </CardContent>
                            </Card>
                        </StyledListItem>
                    ))}
                </List>
            )}

            <Snackbar
                open={notificationOpen}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                message={`"${addedBook}" added to your reading list`}
                sx={{ backgroundColor: '#fffff', color: '#4caf50' }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                action={
                    <React.Fragment>
                        <CheckCircleIcon sx={{ color: '#4caf50', marginRight: '8px' }} />
                        <Button color="inherit" size="small" onClick={handleCloseNotification}>
                            Dismiss
                        </Button>
                    </React.Fragment>
                }
            />

        </div>
    );
};

export default BookSearch;
