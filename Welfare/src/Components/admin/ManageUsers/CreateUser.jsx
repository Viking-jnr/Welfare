import { Add, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Users = ()=>{
    //Component to create new user
    const [user, setUser] = useState({
        fullName: "",
        IDno: "",
        PhoneNO: "",
        Location: "",
        FieldOfficer: "",
        ProfilePicture: null,
        newDependent: []
    });
    //A dictionary of locations with assigned field officers
    const locations = {
        Westlands: 'Officer A',
        Embakasi: 'Officer B',
        Dagoretti: 'Officer C',
        Langata: 'Officer D',
        Kiambu: 'Officer E'
    }
    const handleProfilePic =(e) => {
        const file = e.target.files[0];
        if (file){
        setUser(prev => ({...prev, ProfilePicture: file}))
        }
    }
    {/*Component to add dependents if any*/}
    const [dependents, setDependents] = useState([
        {profile: null, Name: '', relationship: '', DOB: '',ID: ''},
    ]);
    const handleDependentChange = (index, field, value) => {
        const dep = [...dependents];
        dep[index][field] = value;
        setDependents(dep);
    };
    const addDependents = () => {
        const lastDep = dependents[dependents.length-1];
        if (lastDep.Name && lastDep.relationship){
            setUser(prev =>({
                ...prev, newDependent: [...prev.newDependent, lastDep],
            }));
             
        }
        setDependents([...dependents, {Name: '', relationship: '', DOB: '',ID: ''}]);
       
    };
    const deleteDependent = (index) => {
        const filtered = dependents.filter((_, i)=> i !== index);
        setDependents(filtered);
    }
    const handleProfile = (index, file) => {
        const updated = [...dependents];
        updated[index].profile = file;
        setDependents(updated);
    };
    {/*Function to save user*/}
    
    const handleSave = async (e) => {
        e.preventDefault()
       
        const formData = new FormData();
        formData.append('fullName', user.fullName);
        formData.append('IDNo', user.IDno);
        formData.append('PhoneNo', user.PhoneNO);
        formData.append('location', user.Location);
        formData.append('fieldOfficer', user.FieldOfficer);
        { user.ProfilePicture && formData.append('profile', user.ProfilePicture);}
        formData.append('dependents', JSON.stringify(user.newDependent));

        try {
            await axios.post("https://welfare-th1o.onrender.com/users", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("User Saved Successfully");
            setUser({
                fullName: "",
                IDno: "",
                PhoneNO: "",
                Location: "",
                FieldOfficer: "",
                ProfilePicture: null,
                newDependent: []
            });

        } catch(err) {
            console.error("save Failed:", err);
        }
    };



    return(
        <Box sx={{ p: 4, mx: 'auto',display: 'flex',flexDirection: 'column', gap: 2, width: '100%'}}>
            <Typography variant="h5" gutterBottom>Create New User</Typography>
            <Stack  direction={'row'} gap={2}>
                <Avatar  src={user.ProfilePicture ? URL.createObjectURL(user.ProfilePicture): ''} />
                <Button variant="contained" component='label' >
                    Upload Profile Picture
                   <input type="file" hidden onChange={handleProfilePic} />
                </Button>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Full Name" fullWidth value={user.fullName} required onChange={e => setUser(prev => ({...prev, fullName: e.target.value}))} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="National ID Number" fullWidth value={user.IDno}  onChange={e => setUser(prev => ({...prev, IDno: e.target.value}))} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Phone No" fullWidth value={user.PhoneNO} onChange={e => setUser(prev => ({...prev, PhoneNO: e.target.value})) }/>
                </Grid>
                <Grid item xs={12}>
                    <Select displayEmpty  label="Location"  value={user.Location} onChange={e => {
                        const selectedLocation = e.target.value;
                        setUser(prev => ({...prev, Location: selectedLocation, FieldOfficer: locations[selectedLocation] || "" }))
                    }} >
                        <MenuItem value=''>Location</MenuItem>
                        {Object.keys(locations).map(loc => (
                            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Assigned Field Officer" fullWidth InputProps={{readOnly: true}} value={user.FieldOfficer} onChange={e => setUser({...user, FieldOfficer: e.target.value})} />
                </Grid>
                
            </Grid>
            <Divider sx={{my: 5}} />
            {/*User Dependents*/}
            <Typography variant="h5" gutterBottom>Dependents</Typography>
            {dependents.map((item, index)=>(
                <Box key={index} sx={{display: 'flex', gap: 2}}>
                    <Avatar src={item.profile ? URL.createObjectURL(item.profile): ''} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Name" fullWidth value={item.Name} onChange={(e)=> handleDependentChange(index, 'Name', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Relationship" fullWidth value={item.relationship} onChange={(e)=> handleDependentChange(index, 'relationship', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Date of Birth" sx={{width: '170px'}} value={item.DOB} onChange={(e)=> handleDependentChange(index, 'DOB', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="National ID (if applicable)" sx={{width: '170px'}} fullWidth value={item.ID} onChange={(e)=> handleDependentChange(index, 'ID', e.target.value)} />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" component='label' >
                            Add Profile Picture
                        <input type="file" hidden onChange={(e)=> {
                            const file = e.target.files[0];
                            if (file) {
                                handleProfile(index, file);
                            }
                        }} />
                        </Button>
                        </Grid>
                        <Grid item>
                            <IconButton color="error" onClick={() => deleteDependent(index)}>
                                <Delete  /> 
                        </IconButton>
                        </Grid>
                        
                    </Grid>
                </Box>
            ))}
            <Button startIcon={<Add />} onClick={addDependents}>Add Dependent</Button>
            <Divider sx={{my: 5}} />
            <Button variant="contained" onClick={handleSave}>Save User</Button>
        </Box>
    )
}

export default Users;