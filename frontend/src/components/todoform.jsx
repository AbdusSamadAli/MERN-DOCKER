import { useState } from "react";
import axios from "axios";
const EmployeeForm = ({addEmployee}) =>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({type: "", message: ""});

  const handleSubmit = (e) =>{
    e.preventDefault();
    const employee = {name,email,role};
    axios.post("http://localhost:8000/api/employees", employee)
    .then((res)=>{
      console.log(res.data);
      addEmployee(res.data);
      setName("");
      setEmail("");
      setRole("");
      setAlert({type:"success",message:"Employee added successfully"});
    })
    .catch((err)=>{
      console.error("error",err);
      setAlert({type:"error",message:"Error adding employee"});
    });

  };
  return (
    <form onSubmit={handleSubmit} className="employee-form">
      {alert.message && (
        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"} p-2 rounded mb-2`}>
          {alert.message}
        </div>
      )}
      <div>
        <label>Name:</label> 
        <input type="text" value={name} onChange={e => setName(e.target.value)} required  className="border p-2 rounded ml-3"/>
      </div>
      <div>
        <label>Email:</label> 
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border p-2 rounded mt-2 ml-3"  />
      </div>
      <div>
        <label>Role:</label> 
        <input type="text" value={role} onChange={e => setRole(e.target.value)} required className="border p-2 rounded mt-2 ml-3" />
      </div>
      <button type="submit" className=" hover:transform cursor-pointer bg-amber-400 rounded-2xl mt-4">Add Employee</button>
    </form>
  );
}
export default EmployeeForm;
