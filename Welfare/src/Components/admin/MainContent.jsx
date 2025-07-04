import { AccountBalance, CalendarMonth, Handshake, Money, Pending, People, TrendingDown, TrendingUp, Wallet } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Main= () => {
    const theme= useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.down('md'));

    {/*Animating the width of the lineChart*/}
    const [chartWidth, setChartWidth] = useState('0%');
    useEffect(()=> {
        const steps = ['10%', '20%', '40%', '50%', '60%', '70%', '80%', '100%'];
        steps.forEach((w, index) => {
            setTimeout(() => {
                setChartWidth(w);
            }, (index + 1) * 500); // increases delay as index increases
        });
    }, []);

    {/*Reusable function for Cards*/}
    const Cards= ({icon, title, subtitles, width,data, changeType, change, children}) => {
        {/* Display Change Icon in only the cards that show change*/}
        var changeIcon;
        if (changeType=== 'increase'){
            changeIcon = <TrendingUp />;
        } else if (changeType === 'decrease'){
            changeIcon = <TrendingDown />;
        }else {
            changeIcon = <Box />;
        }
        return(
        <Card 
        sx={{width: {width}, backgroundColor: 'rgb(10, 57, 104)', margin: '50px', borderRadius: 5,
        '&:hover': {transform: "translateY(-10px)", boxShadow: "32px", transition: '0.3s ease-in-out'}, boxShadow: '10px'}}>
            <CardContent>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{display: 'flex', flex: '1'}}>
                            {icon &&  <Avatar >{icon} </Avatar>}
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography>{changeIcon}</Typography>
                            <Typography sx={{color: changeType==='increase'? 'white':'red' }}>{change}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="h6" color="white" fontWeight={"bold"}>{title} </Typography>
                    {data && <Typography variant="h3">{data} </Typography>}
                    {subtitles && <Typography variant="body3" color="rgb(0, 127, 255)">{subtitles} </Typography>}
                    {children}
                </Box>
            </CardContent>
        </Card>
        )
    }

     {/*Total monthly income sample data*/}
    const incomeData =[
        {month: 'Jan',income: 127000},
        {month: 'Feb',income: 105700},
        {month: 'Mar',income: 131000},
        {month: 'Apr',income: 201000},
        {month: 'May',income: 352000},
        {month: 'June',income: 207200},
        {month: 'July',income: 137000},
        {month: 'Aug',income: 92345},
        {month: 'Sep',income: 108192},
        {month: 'Oct',income: 83485},
        {month: 'Nov',income: 323890},
        {month: 'Dec',income: 105324},
    ];
     {/*Monthly income Chart*/}
    const IncomeData = () => (
        <ResponsiveContainer  width={'100%'} height={300} >
            <LineChart data={incomeData} margin={{ top: 30, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray={'3 3'} />
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={'income'} stroke="green" strokeWidth={2} 
                    animationDuration={5000} animationBegin={500}  />
            </LineChart>
        </ResponsiveContainer>
        );

        {/*Pending Data for Pending Contributions*/}
        const pendingData = [
            {name: "Emily Bosobori", amount: 12000},
            {name: "John Baraka", amount: 5200},
            {name: "Festus Ouma", amount: 2000},
            {name: "Catherine Mutheu", amount: 8300},
        ]
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: isMobile ? 'column':'row', gap: '5px'}}>
                <Box sx={{display: 'flex', gap: 1, width:isMobile ? '100%': '50%' }}>
                    <Cards title={"Total Contributors"} subtitles={"Yearly"} icon={<Handshake />} width={'50%'} data={"50,000+"}
                           changeType={"increase"} change={"1.2%"} />
                    <Cards title={'Total Monthly Contributions'} icon={<CalendarMonth />} width={'50%'} data={"100K+"} 
                        subtitles={"Monthly"}  changeType={"decrease"} change={"0.8%"}/>
                </Box>
                <Box sx={{display: 'flex', gap: 1, width:isMobile ? '100%': '50%'}}>
                    <Cards title={'Daily Contributions'} icon={<Wallet />} width={'50%'} data={"30K+"} subtitles={'Daily'}  />
                    <Cards title={'Total Members'} icon={<People />} width={'50%'} data={'3,456'} />
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: isMobile ? 'column':'row'}}>
                <Paper sx={{height: 400, width: chartWidth,p: 3 , backgroundColor: 'rgb(0, 127, 255)', borderRadius: '10px'}}>
                    <Typography>Total Monthly Contributions</Typography>
                    <IncomeData />
                </Paper>
                <Cards title={'Pending Contributions'} icon={<Pending />} width={isMobile? '80%': '30%'}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Amount (Ksh) </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {pendingData.map((row, index)=>(
                                <TableRow key={index} >
                                    <TableCell sx={{color: 'red'}} >{row.name} </TableCell>
                                    <TableCell sx={{color: 'red'}}>{row.amount.toLocaleString('en-KE', {
                                        style: 'currency',
                                        currency: 'KES'
                                    })} </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Cards>
            </Box>
            <Box sx={{display:'flex'}}>
                <Cards title={'Total Expenses'} subtitles={'Monthly'} icon={<Money />} />
                <Cards title={'Total Balance'} subtitles={'From Contributions'} icon={<AccountBalance />}/>
            </Box>

        </Box>
    )
}

export default Main;