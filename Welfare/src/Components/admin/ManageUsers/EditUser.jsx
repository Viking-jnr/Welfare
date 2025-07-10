import { collection, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

const Edit = ()=>{
    const [users, setUsers] = useState([]);

   useEffect(() => {
        const fetchUsers = async () => {
        try {
            const usersRef = collection(db, "Users");
            const snapshot = await getDoc(usersRef);
            const fetchedUsers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
            setUsers(fetchedUsers);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
        };

        fetchUsers();
    }, []);
    return(
        <div>
      <h1>Edit Users</h1>
      {users.map(user => (
        <div key={user.IDno}>
          <p><strong>{user.fullName}</strong> ({user.IDno})</p>
          <p>Field Officer: {user.FieldOfficer}</p>
          <img src={user.ProfilePicture} alt={`${user.fullName}'s profile`} width={50} />
        </div>
      ))}
    </div>
    )
}

export default Edit;