import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//Styled Components
const Styles = {
    tableCell: {
        padding: '20px'
    }
}

const View = () => {
    const navigate = useNavigate();
    {/*Component to view all users*/}
    const [viewUser, setViewUser] = useState([]);
    useEffect (() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                setViewUser(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();

    }, []);

    //function to delete user
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:4000/users/" + id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', gap: '60px'}}>
            <Typography variant='h3' sx={{color: 'blue'}}>Mjambere Welfare Users</Typography>
             <TableContainer component={Paper}>
            <Table  >
              <TableHead>
                <TableRow>
                  <TableCell style={Styles.tableCell}><strong>Profile</strong></TableCell>
                  <TableCell style={Styles.tableCell}><strong>FullName</strong></TableCell>
                  <TableCell style={Styles.tableCell}><strong>ID Number</strong></TableCell>
                  <TableCell style={Styles.tableCell}><strong>Phone Number</strong></TableCell>
                  <TableCell style={Styles.tableCell}><strong>Location</strong></TableCell>
                  <TableCell style={Styles.tableCell}><strong>Field Officer</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewUser.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell><Avatar src={`http://localhost:4000/${user.profilePic_URL}`} /> </TableCell>
                        <TableCell>{user.FullName}</TableCell>
                        <TableCell>{user.IDNo}</TableCell>
                        <TableCell>{user.PhoneNo}</TableCell>
                        <TableCell>{user.Location}</TableCell>
                        <TableCell>{user.FieldOfficer}</TableCell>
                        <TableCell>
                            <Button variant='contained' onClick={() => navigate(`/admin/user/edit/${user.id}`)}>
                               Edit
                            </Button> 
                        </TableCell>
                        <TableCell>
                            <Button variant='contained' sx={{backgroundColor: 'rgba(248, 32, 32, 1)'}} onClick={() => handleDelete(user.id)}>
                                Delete
                            </Button> 
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant='contained' onClick={() => navigate("/admin/user")}>Add New User</Button>
        </Box>
    )
}

export default View;