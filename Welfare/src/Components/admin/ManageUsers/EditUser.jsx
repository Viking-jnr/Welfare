import { Add, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Edit = ()=>{
    const navigate= useNavigate();
    const location= useLocation();
    const userID = location.pathname.split('/')[4];
    //Component to create new user
    const [user, setUser] = useState({
        fullName: '',
        IDno: '',
        PhoneNo: '',
        Location: '',
        FieldOfficer: '',
        ProfilePicture: null,
        newDependent: []
    });
    const [dependents, setDependents] = useState([]);

    //To get user info
    useEffect(() => {
        axios.get(`https://welfare-th1o.onrender.com/users/${userID}`)
        .then(res => {
            const raw = res.data;
            setUser({
                fullName: raw.FullName,
                IDno: raw.IDNo,
                PhoneNo: raw.PhoneNo,
                Location: raw.Location,
                FieldOfficer: raw.FieldOfficer,
                ProfilePicture: raw.profilePic_URL || null,
                newDependent: raw.dependents || []
            });
        })
        .catch(err => {
            console.error("Error fetching user:", err);
        });

        //To get dependents data
        axios.get(`https://welfare-th1o.onrender.com/users/${userID}/dependents`)
        .then(res => setDependents(res.data));

    }, [userID])
    //A dictionary of locations with assigned field officers
    const locations = {
        Westlands: 'Officer A',
        Embakasi: 'Officer B',
        Dagoretti: 'Officer C',
        Langata: 'Officer D',
        Kiambu: 'Officer E'
    }
    const [preview, setPreview] = useState(null);
    const handleProfilePic =(e) => {
        const file = e.target.files[0];
        if (file){
        setUser(prev => ({...prev, ProfilePicture: file}));
        setPreview(URL.createObjectURL(file));
        }
    }
    {/*Component to add dependents if any*/}
    
    const handleDependentChange = (index, field, value) => {
        const dep = [...dependents];
        dep[index][field] = value;
        setDependents(dep);
    };
    const addDependents = () => {
        const lastDep = dependents[dependents.length-1];
        if (lastDep?.Name && lastDep?.relationship){
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
        formData.append('PhoneNo', user.PhoneNo);
        formData.append('location', user.Location);
        formData.append('fieldOfficer', user.FieldOfficer);
        { user.ProfilePicture && formData.append('profile', user.ProfilePicture);}
        console.log("Dependents:", user.newDependent)
        formData.append('dependents', JSON.stringify(user.newDependent));

        try {
            await axios.put("https://welfare-th1o.onrender.com/users/"+ userID, formData, {
                headers: {
                    'Content-Type': 'multipart.form-data'
                }
            });
            alert("Changes Saved Successfully");
            setUser({
                fullName: "",
                IDno: "",
                PhoneNO: "",
                Location: "",
                FieldOfficer: "",
                ProfilePicture: null,
                newDependent: []
            });
            navigate("/admin/view")

        } catch(err) {
            console.error("save Failed:", err);
        }
    };
    
    



    return(
        <Box sx={{ p: 4, mx: 'auto',display: 'flex',flexDirection: 'column', gap: 2}}>
            <Typography variant="h5" gutterBottom>Edit {user?.fullName} </Typography>
            <Stack  direction={'row'} gap={2}>
                <Avatar  src={ preview || (user?.ProfilePicture ?? null) } />
                <Button variant="contained" component='label' >
                    Upload Profile Picture
                   <input type="file" hidden onChange={handleProfilePic} />
                </Button>
            </Stack>
            <Grid container spacing={2}>
                <Grid item >
                    <TextField  fullWidth value={user?.fullName}  required onChange={e => setUser(prev => ({...prev, fullName: e.target.value}))} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  fullWidth value={user?.IDno}  onChange={e => setUser(prev => ({...prev, IDno: e.target.value}))} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  fullWidth value={user?.PhoneNo} onChange={e => setUser(prev => ({...prev, PhoneNO: e.target.value})) }/>
                </Grid>
                <Grid item xs={12}>
                    <Select displayEmpty  label="Location"  value={user?.Location ?? ''} onChange={e => {
                        const selectedLocation = e.target.value;
                        setUser(prev => ({...prev, Location: selectedLocation, FieldOfficer: locations[selectedLocation] || "" }))
                    }} >
                        
                        {Object.keys(locations).map(loc => (
                            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField  fullWidth InputProps={{readOnly: true}} value={user?.FieldOfficer} onChange={e => setUser({...user, FieldOfficer: e.target.value})} />
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
            <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </Box>
    )
}

export default Edit;