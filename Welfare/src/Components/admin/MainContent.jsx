import { Handshake } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Paper, Typography } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Main= () => {
    {/*Reusable function for Cards*/}
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
        {month: 'Jan',income: 12000},
        {month: 'Feb',income: 15700},
        {month: 'Mar',income: 10000},
        {month: 'Apr',income: 20000},
        {month: 'May',income: 32000},
        {month: 'June',income: 27200},
        {month: 'July',income: 13000},
        {month: 'Aug',income: 9345},
        {month: 'Sep',income: 28192},
        {month: 'Oct',income: 13485},
        {month: 'Nov',income: 23890},
        {month: 'Dec',income: 45324},
    ];
     {/*Monthly income Chart*/}
    const IncomeData = () => (
        <ResponsiveContainer  width={'100%'} height={300} >
            <LineChart data={incomeData} margin={{ top: 30, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray={'3 3'} />
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={'income'} stroke="#1E90FF" strokeWidth={2} 
                    animationDuration={5000} animationBegin={500} />
            </LineChart>
        </ResponsiveContainer>
        );
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex'}}>
                <Cards title={"Total Contributors"} subtitles={"Yearly"} icon={<Handshake />} />
                <Cards title={'Total Monthly Contributions'} />
                <Cards title={'Daily Contributions'} />
                <Cards title={'Total Members'} />
            </Box>
            <Box sx={{display: 'flex'}}>
                <Paper sx={{height: 300, width: '100%'}}>
                    <IncomeData />
                </Paper>
                <Cards title={'Pending Contributions'} />
            </Box>
            <Box sx={{display:'flex'}}>
                <Cards title={'Total Expenses'} subtitles={'Monthly'}/>
                <Cards title={'Total Balance'} subtitles={'From Contributions'}/>
            </Box>

        </Box>
    )
}

export default Main;