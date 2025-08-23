import {useState,useEffect} from "react";
import axios from "axios";

const Test = () =>{
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users")
        .then(response =>{
            console.log("Fetched users:", response);
            setUsers(response.data);
        })
        .catch(error =>{
            console.error("Error fetching users:", error);
        })
    },[])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="list-disc pl-5">
                {users.map(user=>(
                    <li key={user.id}>{user.name}</li>
                ) )}
            </ul>
        </div>
    )
}
export default Test;