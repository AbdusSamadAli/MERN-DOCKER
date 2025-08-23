import EmployeeForm from "./components/todoform";
import EmployeeList from "./components/TodoList";
import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [employees, setEmployees] = useState([]);
  const addEmployee = (employee) =>{
    setEmployees([...employees, employee]);
  }
  const deleteEmployee = (id) =>{
    axios.delete(`http://localhost:8000/api/employees/${id}`)
    .then(() =>{
      setEmployees(employees.filter(employee => employee.id !== id));
    })
    .catch((err)=>{
      console.error("Error deleting employee", err);
    });
  }
  const fetchEmployees = () =>{
    axios.get("http://localhost:8000/api/employees")
    .then((res)=>{
      setEmployees(res.data);
    })
    .catch((err)=>{
      console.error("Error fetching employees", err);
    });
  }
  const updateEmployeeRole = (id, role) =>{
    axios.put(`http://localhost:8000/api/employees/${id}`, {role})
    .then((res) =>{
      const updatedemployees = employees.map(employee =>{
        if(employee.id === id){
          return {...employee, role:res.data.employee.role};
        }
        return employee;
      });
      setEmployees(updatedemployees);
      console.log("Role updated successfully", res.data);   
    })
    .catch((err)=>{
      console.error("Error updating employee role", err);
      setEmployees(prevEmployees => {
        return prevEmployees.map(employee => {
          if (employee.id === id) {
            return { ...employee, role: "Error" };
          }
          return employee;
        })
      })
    }
    );
  };
  
  return (
    <>
     <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeList employees ={employees} deleteEmployee={deleteEmployee} updateEmployeeRole={updateEmployeeRole} />
      <button onClick={fetchEmployees} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4">Fetch Employees</button>
      <button onClick={() => setEmployees([])} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2">Clear List</button>
      </div>
    </>
  );
};

export default App;
