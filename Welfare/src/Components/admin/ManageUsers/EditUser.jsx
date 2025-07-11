import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";



  //sample user data
  const users = [
  {
    id: 1,
    name: 'Victor',
    idNo: '12993940',
    Phone: '078282838',
    location: 'Embakasi',
    fieldOfficer: 'Officer 1',
    dependents: [{Name: "John", relationship: "Brother", DOB: "12-09-2003", ID: "17272839" }],
  },
  {
    id: 1,
    name: 'Victor',
    idNo: '12993940',
    Phone: '078282838',
    location: 'Embakasi',
    fieldOfficer: 'Officer 1',
    dependents: [{Name: "John", relationship: "Brother", DOB: "12-09-2003", ID: "17272839" }],
  },
  {
    id: 1,
    name: 'Victor',
    idNo: '12993940',
    Phone: '078282838',
    location: 'Embakasi',
    fieldOfficer: 'Officer 1',
    dependents: [{Name: "John", relationship: "Brother", DOB: "12-09-2003", ID: "17272839" }],
  },
  {
    id: 1,
    name: 'Victor',
    idNo: '12993940',
    Phone: '078282838',
    location: 'Embakasi',
    fieldOfficer: 'Officer 1',
    dependents: [{Name: "John", relationship: "Brother", DOB: "12-09-2003", ID: "17272839" }],
  },
  {
    id: 1,
    name: 'Victor',
    idNo: '12993940',
    Phone: '078282838',
    location: 'Embakasi',
    fieldOfficer: 'Officer 1',
    dependents: [{Name: "John", relationship: "Brother", DOB: "12-09-2003", ID: "17272839" }],
  },
];

const Edit = ()=>{
  const [showDep, setShowDep] = useState(null);
  const handleDep = (user)=> {
    setShowDep((prev) => (prev === user ? null: user));
  }
  
    return(
      <>
          <h1>Edit Users</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>FullName</strong></TableCell>
                  <TableCell><strong>ID Number</strong></TableCell>
                  <TableCell><strong>Phone Number</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Field Officer</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <table cellSpacing={30} cellPadding={10} border={1} style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
              <tr style={{gap: '30px', color: "blue"}}>
                <th>FullName</th>
                <th>Id Number</th>
                <th>PhoneNumber</th>
                <th>Location</th>
                <th>Field Officer</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Victor Mutua</td>
                  <td>27178383</td>
                  <td>0786756453</td>
                  <td>Westlands</td>
                  <td>Officer 1</td>
                </tr>
                <tr>
                  <td>Samuel Njoroge</td>
                  <td>56536565</td>
                  <td>0789767542</td>
                  <td>Embakasi</td>
                  <td>Officer 2</td>
                </tr>
                <tr>
                  <td>Ben Mwangi</td>
                  <td>34547565</td>
                  <td>0767879809</td>
                  <td>Dagoretti</td>
                  <td>Officer 3</td>
                </tr>
                <tr>
                  <td>Ryan Moha</td>
                  <td>65547568</td>
                  <td>0743536475</td>
                  <td>Langata</td>
                  <td>Officer 4</td>
                </tr>
              </tbody>
            </table>
          </div>
     
      </>
    )
}

export default Edit;
