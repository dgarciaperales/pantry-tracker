import React, {useState} from 'react';
import { IconButton, Tooltip, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu, Home, Save, AccountCircle, Search} from '@mui/icons-material';

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <nav className='bg-gray-800 p-4 fixed top-0 left-0 w-full z-50'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className = "md:hidden">
                    <IconButton color = "inherit" onClick={handleDrawerToggle}>
                        <Menu/>
                    </IconButton>
                </div>
            

                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                    <List>
                        <ListItem button onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary = "Home" />
                        </ListItem>
                        <ListItem button onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary = "Pantry" />
                        </ListItem>
                        <ListItem button onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary = "Sign In" />
                        </ListItem>
                    </List>
                </Drawer>

                <div className='flex space-x-4'>
                    <IconButton color = "inherit" className="hidden md:flex">
                        <Home fontSize = "large"/>
                    </IconButton>

                    <IconButton color = "inherit" className="hidden md:flex">
                        <Search fontSize = "large"/>
                    </IconButton>

                    <IconButton color = "inherit" className="hidden md:flex">
                        <Save fontSize = "large"/>
                    </IconButton>

                    <Tooltip title ="Sign In">
                        <IconButton color = "inherit" className="hidden md:flex">
                            <AccountCircle fontSize = "large"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </nav>
    );
};
export default NavBar;
