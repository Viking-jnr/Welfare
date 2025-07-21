import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, Collapse, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//Styled Components
const Styles = {
    tableCell: {
        padding: '20px'
    }
}

const View = () => {
    const navigate = useNavigate();
    // to extend a user who has dependents
    const[extendUser, setExtendUser] = useState(null);
    const handleExtend = (userID) => {
        setExtendUser(prev => (prev === userID ? null : userID));
    }
    {/*Component to view all users*/}
    const [viewUser, setViewUser] = useState([]);
    useEffect (() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://welfare-th1o.onrender.com/users');
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
            await axios.delete("https://welfare-th1o.onrender.com/users/" + id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', gap: '60px'}}>
            <Typography variant='h3' sx={{color: 'blue'}}>Mjambere Welfare Users</Typography>
             <TableContainer component={Paper} >
            <Table size='small'  >
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
                    <React.Fragment key={user.id}>
                    <TableRow >
                        <TableCell><Avatar src={user.profilePic_URL} /> </TableCell>
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
                        <TableCell>
                            {user.newDependent && user.newDependent.length >0 && (
                                <Button variant='contained' onClick={() => handleExtend(user.id)}>
                                    {extendUser === user.id ? "Hide Dependents" : "View Dependents"}
                                </Button> 
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={7}>
                            <Collapse in={extendUser === user.id} timeout={'auto'} unmountOnExit>
                            <Table size= 'small'>
                                <TableHead>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Relationship</strong></TableCell>
                                    <TableCell><strong>Date of Birth</strong></TableCell>
                                    <TableCell><strong>National ID</strong></TableCell>
                                </TableHead>
                            </Table>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant='contained' onClick={() => navigate("/admin/user")}>Add New User</Button>
        </Box>
    )
}

export default View;