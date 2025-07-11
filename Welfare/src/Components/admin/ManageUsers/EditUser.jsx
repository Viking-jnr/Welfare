

const Edit = ()=>{
  
    return(
      <div style={{display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
          <h1>Edit Users</h1>
          <div >
            <table cellSpacing={30} border={1} style={{width: '100%'}}>
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
     
      </div>
    )
}

export default Edit;