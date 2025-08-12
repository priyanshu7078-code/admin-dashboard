"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

export default function EmployeePage() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/employees",{
      withCredentials: true,
    });
      setEmployees(res.data || []);
      console.log(res.data);


    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);      

  const handleSave = async (formData) => {
    try {
      if (editingEmployee) {
        await axios.put(`http://localhost:5000/dashboard/employees/${editingEmployee._id}`, formData,{
      withCredentials: true,
    }); 
      } 
      else {
        await axios.post("http://localhost:5000/dashboard/employees", formData,{
      withCredentials: true,
    });
        
      }

      console.log(formData);
      setShowModal(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to save employee:", err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
       await axios.delete(`http://localhost:5000/dashboard/employees/${id}`,{
      withCredentials: true,
    })
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
          <button
            onClick={() => {
              setEditingEmployee(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Employee
          </button>
        </div>

        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm rounded shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Position</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Salary</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) =>{ return <React.Fragment key={employee._id}>
                  <tr key={employee._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{employee.userInfo.name}</td>
                    <td className="p-3 truncate max-w-[200px]">{employee.userInfo.email}</td>
                    <td className="p-3">{employee.userInfo.phone}</td>
                    <td className="p-3">{employee.position}</td>
                    <td className="p-3">{employee.department}</td>
                    <td className="p-3">₹{employee.salary}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          employee.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="bg-yellow-500 text-white text-sm px-4 py-1.5 rounded hover:bg-yellow-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 text-white text-sm px-4 py-1.5 rounded hover:bg-red-600"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                  </React.Fragment>
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No employees found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
          <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => {
                setShowModal(false);
                setEditingEmployee(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <EmployeeForm
              initialData={editingEmployee}
              onClose={() => {
                setShowModal(false);
                setEditingEmployee(null);
              }}
              onSubmit={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
