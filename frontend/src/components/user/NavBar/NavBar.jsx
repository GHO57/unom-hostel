import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutuser } from '../../../features/user/userThunks';

const Navbar = () => {
    const [state, setState] = React.useState({
        left: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState((prevState) => ({ ...prevState, left: !prevState.left }));
    };

    const handleLogout = () => {
        dispatch(logoutuser());
        navigate('/'); 
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/"> 
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/about"> 
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={"About"} />
                    </ListItemButton>
                </ListItem>
                
                {isAuthenticated && (
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/account"> 
                            <ListItemIcon>
                                <PermContactCalendarIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Account"} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    {!isAuthenticated ? (
                        <ListItemButton component={Link} to="/login">
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItemButton>
                    ) : (
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    )}
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className='Navbar'>
            <MenuIcon
                onClick={toggleDrawer(true)} 
                style={{ cursor: 'pointer' }} 
            />
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
};

export default Navbar;
