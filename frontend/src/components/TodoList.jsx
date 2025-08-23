import { useState } from "react";

const EmployeeList = ({ employees, deleteEmployee, updateEmployeeRole }) => {
  const [editRoles, setEditedRoles] = useState({});

  const handleRoleChange = (id, role) => {
    setEditedRoles((prev) => ({ ...prev, [id]: role }));
  };
  const handleupdateRole = (id) => {
    const role = editRoles[id] || "";
    if (role) {
      updateEmployeeRole(id, role);
    }
  };
  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">
                {editRoles[employee.id] !== undefined
                  ? editRoles[employee.id]
                  : employee.role}
              </td>

              <td className="border p-2">
                <input
                  type="text"
                  value={editRoles[employee.id] ?? employee.role}
                  onChange={(e) =>
                    handleRoleChange(employee.id, e.target.value)
                  }
                />
                <button
                  onClick={() => handleupdateRole(employee.id)}
                  className="bg-blue-500 text-white p-1 rounded ml-2 hover: transition cursor-pointer"
                >
                  Update Role
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeList;
