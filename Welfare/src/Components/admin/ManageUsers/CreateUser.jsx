import { Add, Delete, LineAxisOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const Users = ()=>{
    {/*Component to create new user*/}
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
    const saveUser = async () => {
        try {
            //Convert profile picture into a downloadable URL to be stored by firebase
            let profilePicUrl = "";
            if (user.ProfilePicture){
                const picRef = ref(storage, `ProfilePictures/${user.fullName}-${Date.now()}`);
                await uploadBytes(picRef, user.ProfilePicture);
                profilePicUrl = await getDownloadURL(picRef)
            }
            //handle dependent profile pic if given
            const updatedDependents = await Promise.all(
                
                dependents.map(async (dep, index) => {
                    let depPicUrl = "";

                    if (dep.profile) {
                    const depRef = ref(storage, `DependentPictures/${user.fullName}-dep${index}-${Date.now()}`);
                    await uploadBytes(depRef, dep.profile);
                    depPicUrl = await getDownloadURL(depRef);
                    }

                    return {
                    ...dep,
                    profile: depPicUrl, // replace File with its URL
                    };
                })
                );
            //Update user data with the downloadable profile pic
            const newUser = {
                ...user,
                ProfilePicture: profilePicUrl,
                newDependent: updatedDependents,
                };

            await addDoc(collection(db, "Users"), newUser);
            alert("User Saved Successfully");
            //clear form
            setUser({fullName: "", IDno: "", PhoneNO: "",Location: "", FieldOfficer: "", ProfilePicture: null, newDependent: []})
            setDependents([{ profile: null, Name: "", relationship: "", DOB: "", ID: "" }]);
        } catch (err){
            console.error("Error Saving User:", err)
        }

    };
    const handleSave = async () => {
       
        const userPayload = {
            fullName: user.fullName,
            PhoneNo: user.PhoneNO,
            location: user.Location,
            fieldOfficer: user.FieldOfficer,
            profilePicURL: user.ProfilePicture,
            newDependent: user.newDependent,
        };

        try {
            await axios.post("http://localhost:4000/users", userPayload);
            alert("User Saved to MySQL!");

        } catch(err) {
            console.error("save Failed:", err);
        }
    };



    return(
        <Box sx={{ p: 4, mx: 'auto',display: 'flex',flexDirection: 'column', gap: 2}}>
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
                    <TextField label="Full Name" fullWidth value={user.fullName} required onChange={e => setUser({...user, fullName: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="National ID Number" fullWidth value={user.IDno} onChange={e => setUser({...user, IDno: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  label="Phone No" fullWidth value={user.PhoneNO} onChange={e => setUser({...user, PhoneNO: e.target.value})} />
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
                    <Avatar key={index}  src={item.profile ? URL.createObjectURL(item.profile): ''} />
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