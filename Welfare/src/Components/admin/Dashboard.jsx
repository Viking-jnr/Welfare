import { AccountBalance, Close, Dashboard, ManageAccounts, Menu, Money, Payment, People, Report } from "@mui/icons-material";
import { AppBar, Avatar, Box, Card, CardContent, Drawer, IconButton, List, ListItemButton, 
    ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } 
    from "@mui/material"
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart } from "recharts";



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


    {/*Drawer Content*/}
    const DrawerContent = (
        <div>
            
            <List>
                <ListItemButton onClick={() => navigate('/admin')}>
                    <ListItemIcon>{<Dashboard />} </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton >
                    <ListItemIcon>{<People />} </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>{<ManageAccounts />} </ListItemIcon>
                    <ListItemText primary="Manage Accounts" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>{<Money />} </ListItemIcon>
                    <ListItemText primary="Manage Expenses" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>{<AccountBalance />} </ListItemIcon>
                    <ListItemText primary="Book of Accounts" />
                </ListItemButton>
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
            <AppBar position="fixed" >
                <Toolbar></Toolbar>
            </AppBar>
        )}
        
        <Box component={"nav"} display={'flex'}>
            <Drawer  variant={isMobile ? 'temporary': 'permanent'}
                    open= {isMobile ? openDrawer: true}
                    onClose={toggleDrawer} sx={{zIndex: 1200}}>
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