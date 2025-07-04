import { AccountBalance, Close, Dashboard, ExpandLess, ExpandMore, ManageAccounts, Menu, Money, Payment, People,Person, Report } from "@mui/icons-material";
import { AppBar, Avatar, Box, Card, CardContent, Collapse, Drawer, IconButton, List, ListItemButton, 
    ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } 
    from "@mui/material"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";



//Styled components
const styles = 
       { headerTabs: {
            '&:hover': {
                backgroundColor: "#1E90FF",
                transition: '0.8s ease-in-out',
            }
        },
    }



const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    {/*Component to control opening of drawer for mobile*/}
    const [openDrawer, setOpenDrawer] = useState(false);
    {/*Toggle Drawer*/}
    const toggleDrawer= () => {
        setOpenDrawer(!openDrawer);
    }
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


    {/*Drawer Content*/}
    const DrawerContent = (
        <div>
            
            <List>
                <ListItemButton onClick={() => navigate('/admin')}>
                    <ListItemIcon>{<Dashboard />} </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                {/*Manage Users*/}
                <ListItemButton onClick={handleUser}  >
                    <ListItemIcon>{<People />} </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                    {userDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Users Dropdown Menu*/}
                <Collapse in={userDropDown} sx={{pl: 5}} timeout={'auto'} unmountOnExit >
                    <List>
                        <ListItemButton>
                            <ListItemText primary="Create User" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Edit User" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Manage Accounts*/}
                <ListItemButton 
                onClick={handleAccount} >
                    <ListItemIcon>{<ManageAccounts />} </ListItemIcon>
                    <ListItemText primary="Manage Accounts" />
                    {accountDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Accounts Drop Down Menu*/}
                <Collapse in={accountDropDown} sx={{pl:5}}>
                    <List>
                        <ListItemButton>
                            <ListItemText primary="Create Account" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Edit Account" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Manage Expenses*/}
                <ListItemButton onClick={handleExpense}>
                    <ListItemIcon>{<Money />} </ListItemIcon>
                    <ListItemText primary="Manage Expenses" />
                    {expenseDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Manage Expense Drop Down Menu*/}
                <Collapse in={expenseDropDown} sx={{pl:5}}>
                    <List>
                        <ListItemButton>
                            <ListItemText primary="Create Expense" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Edit Expense" />
                        </ListItemButton>
                    </List>
                </Collapse>
                {/*Book of Accounts*/}
                <ListItemButton onClick={handleBook}>
                    <ListItemIcon>{<AccountBalance />} </ListItemIcon>
                    <ListItemText primary="Book of Accounts" />
                    {bookDropDown ? <ExpandLess />: <ExpandMore />}
                </ListItemButton>
                {/*Book of Accounts Drop Down*/}
                <Collapse in={bookDropDown} sx={{pl:5}}>
                    <List>
                        <ListItemButton>
                            <ListItemText primary="View Contributions" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Manage Payments" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Accounts" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton>
                    <ListItemIcon>{<Report />} </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>
            </List>
        </div>
    )


    return(
        <>
        {isMobile && (
            <AppBar position="fixed" sx={{backgroundColor: "#4169E1", }}>
            
            <Toolbar >
                <Box flexGrow={1}>
                    <Typography variant="h5" fontWeight={'bold'}>Welcome</Typography>
                </Box>
                <IconButton edge="end" onClick={toggleDrawer}>
                    {openDrawer ? <Close />: <Menu />}
                </IconButton>
            </Toolbar>
        </AppBar>
        )}
        {!isMobile && (
            <AppBar position="fixed" sx={{backgroundColor: 'blue'}} >
                <Toolbar sx={{display: 'flex', gap: 40}}>
                    <Typography pl={30} color="white">{currentDate} </Typography>
                    <Typography>Welcome Admin</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Person /> 
                        <Typography>Profile</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        )}
        
        <Box component={"nav"} display={'flex'}>
            <Drawer  variant={isMobile ? 'temporary': 'permanent'}
                    open= {isMobile ? openDrawer: true}
                    onClose={toggleDrawer} sx={{zIndex: 1100}}>
                        {DrawerContent}
            </Drawer>
            <Box component={'main'} flexGrow={1} p={isMobile ? 5:10} ml={isMobile ? '10px': '200px'}>
                <Outlet />
            </Box>
        </Box>


        </>
    )
}

export default Header;