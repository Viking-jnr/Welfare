import { __unsafe_useEmotionCache } from "@emotion/react";
import { Add, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Users = ()=>{
    {/*Component to create new user*/}
    const [user, setUser] = useState({
        fullName: "",
        IDno: "",
        PhoneNO: "",
        Location: "",
        FieldOfficer: "",
        ProfilePicture: null
    });
    const handleProfilePic =(e) => {
        const file = e.target.files[0];
        setUser({...user, ProfilePicture: file})
    }
    {/*Component to add dependents if any*/}
    const [dependents, setDependents] = useState([
        {profile: null,Name: '', relationship: '', DOB: '',ID: ''},
    ]);
    const handleDependentChange = (index, field, value) => {
        const dep = [...dependents];
        dep[index][field] = value;
        setDependents(dep);
    };
    const addDependents = () => {
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



    return(
        <Box sx={{ p: 4, mx: 'auto',display: 'flex',flexDirection: 'column', gap: 2}}>
            <Typography variant="h5" gutterBottom>Create New User</Typography>
            <Stack  direction={'row'} gap={2}>
                <Avatar  src={user.ProfilePicture ? URL.createObjectURL(user.ProfilePicture): ''} />
                <Button variant="outlined" component='label' >
                    Upload Profile Picture
                   <input type="file" hidden onChange={handleProfilePic} />
                </Button>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Full Name" fullWidth value={user.fullName} required onChange={e => setUser({...user, fullName: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="National ID Number" fullWidth value={user.IDno} onChange={e => setUser({...user, IDno: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Phone No" fullWidth value={user.PhoneNO} onChange={e => setUser({...user, PhoneNO: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Location" fullWidth value={user.Location} onChange={e => setUser({...user, Location: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Assigned Field Officer" fullWidth value={user.FieldOfficer} onChange={e => setUser({...user, FieldOfficer: e.target.value})} />
                </Grid>
                
            </Grid>
            <Divider sx={{my: 5}} />
            <Typography variant="h5" gutterBottom>Dependents</Typography>
            {dependents.map((item, index)=>(
                <Box key={index} sx={{display: 'flex', gap: 2}}>
                    <Avatar key={index}  src={item.profile ? URL.createObjectURL(item.profile): ''} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Name" fullwidth value={item.Name} onChange={(e)=> handleDependentChange(index, 'Name', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Relationship" fullwidth value={item.relationship} onChange={(e)=> handleDependentChange(index, 'relationship', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Date of Birth" sx={{width: '170px'}} value={item.DOB} onChange={(e)=> handleDependentChange(index, 'DOB', e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="National ID (if applicable)" sx={{width: '170px'}} fullwidth value={item.ID} onChange={(e)=> handleDependentChange(index, 'ID', e.target.value)} />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" component='label' >
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
        </Box>
    )
}

export default Users;