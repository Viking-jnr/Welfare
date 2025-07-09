import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage]= useState('');
    const [status, setStatus] = useState(null)

    {/* Handle Log in*/}
    const handleLogin= (e) => {
        e.preventDefault();
        if (email === 'welfare@gmail.com' && password === '1234') {
            setMessage('Login successful!');
            setStatus('Success');
            //Delay navigation for 2 seconds
            setTimeout(()=> {
                navigate("/admin");
            }, 1500)
            
    }   else {
            setMessage('Invalid email or password');
            setStatus('Failed');

    }
    }
   
    return(
        <Box 
         sx={{
                width: '50%',
                maxHeight: '100vh',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingTop: '150px',
                gap:'30px',
            }}
>
           

            <Typography variant="h4"color="blue" fontWeight={'bold'}>Log In</Typography>
            <TextField label="Email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            
            <TextField label="Password" type="password" value={password}  required 
            onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" onClick={handleLogin}
            sx={{textTransform:'none', backgroundColor: 'blue'}}>Log In</Button>

            <Typography color={status == 'Success'? 'blue': 'red'}>{message}</Typography>

        </Box>
    )
}

export default Signin;