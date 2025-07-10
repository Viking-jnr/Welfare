import { AccountBalance, Close, Dashboard, ExitToApp, ExpandLess, ExpandMore, ManageAccounts, Menu as MenuIcon, Money, People,Person, Report } 
from "@mui/icons-material";
import { AppBar, Avatar, Box, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon,
     ListItemText, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } 
    from "@mui/material"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";




const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    {/*Component to control opening of drawer for mobile*/}
    const [openDrawer, setOpenDrawer] = useState(false);
    {/*Toggle Drawer*/}
    const toggleDrawer= () => {
        setOpenDrawer(!openDrawer);
    }
    {/*To determine the user name*/}
    const [userName, setUserName] = useState("Admin");
    const [userDropDown, setUserDropDown] = useState(false);
    const handleUser = () => {
        setUserDropDown(!userDropDown);
    }
    const [accountDropDown, setAccountDropDown] = useState(false);
    const handleAccount = () => {
        setAccountDropDown(!accountDropDown);
    }
    const [expenseDropDown, setExpenseDropDown] = useState(false);
    const handleExpense = () => {
        setExpenseDropDown(!expenseDropDown);
    }
    const [bookDropDown, setBookDropDown] = useState(false);
    const handleBook =()=> {
        setBookDropDown(!bookDropDown);
    }
    const [currentDate, setCurrentDate] = useState('');
    useEffect(()=> {
        const todaysDate = new Date().toLocaleDateString('en-KE',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        setCurrentDate(todaysDate);
    },[]);

    {/*Profile Dropdown Options*/}
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen =(event)=> {
        setAnchorEl(event.currentTarget);
    };
    const handleClose =()=> {
        setAnchorEl(null);
    };


    {/*Drawer Content*/}
    const DrawerContent = (
        <div>
            
            <List>
                <ListItemButton onClick={() => {navigate('/admin'); toggleDrawer();}} sx={{mt:1}}>
                    <ListItemIcon  >{<Dashboard />} </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                {/*Manage Users*/}
                <ListItemButton onClick={handleUser}  >
                    <ListItemIcon >{<People />} </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                    {userDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Users Dropdown Menu*/}
                <Collapse in={userDropDown} sx={{pl: 5}} timeout={'auto'} unmountOnExit >
                    <List>
                        <ListItemButton onClick={()=> {navigate('/admin/user'); toggleDrawer();}}>
                            <ListItemText primary="Create User" />
                        </ListItemButton>
                        <ListItemButton onClick={()=> {navigate('/admin/edit'); toggleDrawer();}}>
                            <ListItemText primary="Edit User" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Manage Accounts*/}
                <ListItemButton 
                onClick={handleAccount} >
                    <ListItemIcon >{<ManageAccounts />} </ListItemIcon>
                    <ListItemText primary="Manage Accounts" />
                    {accountDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Accounts Drop Down Menu*/}
                <Collapse in={accountDropDown} sx={{pl:5}}>
                    <List>
                        <ListItemButton onClick={()=> {navigate('/admin/create-account'); toggleDrawer();}}>
                            <ListItemText primary="Create Account" />
                        </ListItemButton>
                        <ListItemButton onClick={()=> {navigate('/admin/edit-account'); toggleDrawer();}}>
                            <ListItemText primary="Edit Account" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Manage Expenses*/}
                <ListItemButton onClick={handleExpense}>
                    <ListItemIcon >{<Money />} </ListItemIcon>
                    <ListItemText primary="Manage Expenses" />
                    {expenseDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Expense Drop Down Menu*/}
                <Collapse in={expenseDropDown} sx={{pl:5}} timeout={'auto'}>
                    <List>
                        <ListItemButton onClick={()=> {navigate('/admin/create-expense'); toggleDrawer();}}>
                            <ListItemText primary="Create Expense" />
                        </ListItemButton>
                        <ListItemButton onClick={()=> {navigate('/admin/edit-expense'); toggleDrawer();}}>
                            <ListItemText primary="Edit Expense" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Book of Accounts*/}
                <ListItemButton onClick={handleBook}>
                    <ListItemIcon >{<AccountBalance />} </ListItemIcon>
                    <ListItemText primary="Book of Accounts" />
                    {bookDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Book of Accounts Drop Down*/}
                <Collapse in={bookDropDown} sx={{pl:5}}>
                    <List>
                        <ListItemButton onClick={()=> {navigate('/admin/view-contributions'); toggleDrawer();}}>
                            <ListItemText primary="View Contributions" />
                        </ListItemButton>
                        <ListItemButton onClick={()=> {navigate('/admin/manage-payments'); toggleDrawer();}}>
                            <ListItemText primary="Manage Payments" />
                        </ListItemButton>
                        <ListItemButton onClick={()=> {navigate('/admin/accounts'); toggleDrawer();}}>
                            <ListItemText primary="Accounts" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={()=> {navigate('/admin/reports'); toggleDrawer();}}>
                    <ListItemIcon >{<Report />} </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>
            </List>
        </div>
    )


    return(
        <>
        {/*Menu icon is shown in both mobile and tablet*/}
        {(isMobile || isTablet) && (
            <AppBar position="fixed" sx={{backgroundColor: "white", }}>
            
            <Toolbar  >
                <Box flexGrow={1}>
                    <Typography variant="h5" fontWeight={'bold'} color="black">Welcome</Typography>
                </Box>
                <IconButton edge="end" onClick={toggleDrawer}>
                    {openDrawer ? <Close />: <MenuIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
        )}
        {!isMobile && !isTablet && (
            <AppBar position="fixed" sx={{backgroundColor: 'white'}} >
                <Toolbar sx={{display: 'flex', gap: 40}}>
                    <Typography pl={30} color="black" fontWeight={'bold'}>{currentDate} </Typography>
                    <Typography flex={1} color="black" fontWeight={'bold'}>Welcome {userName} </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <IconButton sx={{backgroundColor: 'rgb(0, 127, 255)', color: 'white'}}
                          onMouseEnter={handleOpen}  >
                            <Person />
                        </IconButton>
                        <Menu anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                              >
                                <MenuItem>Profile</MenuItem>
                                <Divider />
                                <MenuItem onClick={()=> navigate('/')}><ExitToApp /> Log Out</MenuItem>
                        </Menu>
                        
                    </Box>
                </Toolbar>
            </AppBar>
        )}
        
        <Box component={"nav"} display={'flex'} sx={{ minHeight: '100vh'}}>
            <Drawer  variant={(isMobile || isTablet) ? 'temporary': 'permanent'}
                    open= {(isMobile || isTablet) ? openDrawer: true}
                    onClose={toggleDrawer} sx={{zIndex: 1100, '& .MuiDrawer-paper': {
                        backgroundColor: 'white'
                    }}}>
                        
                {DrawerContent}
            </Drawer>
            <Box component={'main'} flexGrow={1} p={(isMobile || isTablet) ? 5: 10} ml={(isMobile || isTablet) ? '5px': '200px'}>
                <Outlet />
            </Box>
        </Box>


        </>
    )
}

export default Header;