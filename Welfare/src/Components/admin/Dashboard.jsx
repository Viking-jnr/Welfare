import { AccountBalance, Dashboard, ManageAccounts, Menu, Money, Payment, People, Report } from "@mui/icons-material";
import { AppBar, Avatar, Box, Card, CardContent, Drawer, IconButton, List, ListItemButton, 
    ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } 
    from "@mui/material"
import { useState } from "react";
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    {/*Component to control opening of drawer for mobile*/}
    const [openDrawer, setOpenDrawer] = useState(false);
    {/*Toggle Drawer*/}
    const toggleDrawer= () => {
        setOpenDrawer(!openDrawer);
    }

    const Cards= ({icon, title, subtitles}) => {
        return(
        <Card 
        sx={{width: "20%", backgroundColor: "white", margin: '50px',
        '&:hover': {transform: "translateY(-10px)", boxShadow: "32px", transition: '0.3s ease-in-out'}}}>
            <CardContent>
                <Box>
                    <Avatar>{icon} </Avatar>
                    <Typography variant="h5" color="#1E90FF" fontWeight={"bold"}>{title} </Typography>
                    <Typography variant="body3">{subtitles} </Typography>
                </Box>
            </CardContent>
        </Card>
        )
    }

    {/*Total monthly income sample data*/}
    const incomeData =[
        {month: 'Jan',income: '12000'},
        {month: 'Feb',income: '15700'},
        {month: 'Mar',income: '10000'},
        {month: 'Apr',income: '20000'},
        {month: 'May',income: '32000'},
        {month: 'June',income: '27200'},
        {month: 'July',income: '13000'},
        {month: 'Aug',income: '9345'},
        {month: 'Sep',income: '28192'},
        {month: 'Oct',income: '13485'},
        {month: 'Nov',income: '23890'},
        {month: 'Dec',income: '45324'},
    ];
    {/*Monthly income Chart*/}
    const IncomeData = () => (
        <ResponsiveContainer  width={'100%'} height={300}>
            <BarChart data={incomeData} margin={{top: 20, left: 30, right: 10}}>
                
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={"income"} fill="#1E90FF" />
            </BarChart>
        </ResponsiveContainer>
    )
    {/*Total contributors sample data*/}
    const contributorData = [
        {month: 'Jan',contributors: '1543'},
        {month: 'Feb',contributors: '767'},
        {month: 'Mar',contributors: '894'},
        {month: 'Apr',contributors: '665'},
        {month: 'May',contributors: '570'},
        {month: 'June',contributors: '430'},
        {month: 'July',contributors: '1203'},
        {month: 'Aug',contributors: '934'},
        {month: 'Sep',contributors: '1082'},
        {month: 'Oct',contributors: '839'},
        {month: 'Nov',contributors: '234'},
        {month: 'Dec',contributors: '498'},
    ]
    {/*Total Contributors line chart*/}
    const Contributors = () => (
        <ResponsiveContainer width={'100%'} height={300}>
            <LineChart data={contributorData} >
            <CartesianGrid strokeDasharray={'3 3'} />
            <XAxis dataKey={"month"} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={'contributors'} stroke="#1E90FF" strokeWidth={2} 
            animationDuration={5000} animationBegin={500}/>
            </LineChart>
        </ResponsiveContainer>
    )

    {/*Drawer Content*/}
    const DrawerContent = (
        <div>
            
            <List>
                <ListItemButton>
                    <ListItemIcon>{<Dashboard />} </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton>
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
                <IconButton edge="end" onClick={toggleDrawer}>
                    <Menu />
                </IconButton>
            </Toolbar>
        </AppBar>
        )}
        
        <Box component={"nav"}>
            <Drawer variant={isMobile ? 'temporary': 'permanent'}
                    open= {isMobile ? openDrawer: true}
                    onClose={toggleDrawer}>
                        {DrawerContent}
                    </Drawer>
        </Box>


        </>
    )
}

export default Header;