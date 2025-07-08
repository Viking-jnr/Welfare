import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const Users = ()=>{
    const [activeTab, setActiveTab] = useState(0);
    return(
        <Box>
            <Tabs>
                <Tab label="Create User" />
                <Tab label="Edit User" />
            </Tabs>
        </Box>
    )
}

export default Users;