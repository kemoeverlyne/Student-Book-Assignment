import React from 'react';
import { ListItem, ListItemText, AppBar, Toolbar, Drawer, List, Typography, Button, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';


const Logo = styled('img')({
    marginRight: '10px',
    height: '40px',
});

const StyledButton = styled(Button)(({ }) => ({
    color: '#000000',
    textTransform: 'capitalize',
    fontSize: '1rem',
    '&:hover': {
        color: '#5acccc',
    },
}));

const Background = styled('div')(({ isMobile }: { isMobile: any }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
    backgroundImage: isMobile ? 'url("/ello-mobile.png")' : 'url("/ello-banner.svg")',
    backgroundSize: isMobile ? '100%' : 'cover',
    backgroundPosition: isMobile ? 'top' : 'center bottom 100px',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
}));


const DrawerContainer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        backgroundColor: '#335c6e',
        color: '#ffffff',
        width: '100%',
    },
});

interface NavbarProps {
    handleSearch: (query: string) => void;
    searchResults: any[];
    handleAddBook: (book: any) => void;
    data?: {
        books: any[];
    };
}




const Navbar: React.FC<NavbarProps> = ({ }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <Background isMobile={isMobile} />
            <AppBar
                position="sticky"
                color="default"
                style={{
                    width: '75%',
                    margin: '0 auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    zIndex: 1,
                }}
            >
                <Container>
                    <Toolbar>
                        <Link to="/">
                            <Logo src="/logo.svg" alt="Ello Logo" />
                        </Link>
                        <Typography variant="h6" style={{ flexGrow: 1, color: '#335C6E', textTransform: 'capitalize' }}>
                        </Typography>
                        {isMobile ? (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer}
                            >
                                <MenuIcon style={{ color: '#000000' }} />
                            </IconButton>
                        ) : (
                            <>
                                <Link to="/">
                                    <StyledButton color="inherit">
                                        Books
                                    </StyledButton>
                                </Link>
                                <Link to="/reading-list">
                                    <StyledButton color="inherit">
                                        Reading List
                                    </StyledButton>
                                </Link>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <DrawerContainer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={toggleDrawer}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    <CloseIcon style={{ color: '#ffffff' }} />
                </IconButton>
                <Logo src="/logo.svg" alt="Ello Logo" style={{ marginLeft: '20px' }} />
                <List>
                    <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                        <ListItemText primary="Booklist" />
                    </ListItem>
                    <ListItem button component={Link} to="/reading-list" onClick={toggleDrawer}>
                        <ListItemText primary="Reading List" />
                    </ListItem>
                </List>
            </DrawerContainer>
        </>
    );
};


export default Navbar;
