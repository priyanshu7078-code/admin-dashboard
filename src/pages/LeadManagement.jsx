import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import axios from "axios";

export default function LeadManagement() {
  const [showModal, setShowModal] = useState(false);
  const [leads, setLeads] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  const navigate = useNavigate();

  // Load leads from backend


const addLead = async (newLead) => {
  if (editingLead) {
    try {
      const res = await axios.put(
        `http://localhost:5000/dashboard/leads/${editingLead._id}`,
        newLead,{
      withCredentials: true,
    }
      );

      // Merge updated fields correctly, preserving the structure
      const updatedLeads = leads.map((lead) =>
        lead._id === editingLead._id
          ? {
              ...lead,
              ...newLead,
              userInfo: {
                ...lead.userInfo,
                ...newLead.userInfo,
                name: newLead.name,
                email: newLead.email,
                phone: newLead.phone,
                address: newLead.address,
              },
            }
          : lead
      );

      setLeads(updatedLeads);
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  } else {
    try {
      const res = await axios.post(
        `http://localhost:5000/dashboard/leads`,newLead,{
      withCredentials: true,
    }
      );
      setLeads([...leads,res.data]);
      console.log(res.data)
    } catch (err) {
      console.error("Error adding new lead:", err);
    }
  }

  setEditingLead(null);
  setShowModal(false);
};



  const deleteLead = async (_id) => {
  try {
    await axios.delete(`http://localhost:5000/dashboard/leads/${_id}`,{
      withCredentials: true,
    });
    setLeads((prev) => prev.filter((l) => l._id !== _id));
  } catch (err) {
    console.error("Error deleting lead:", err);
  }
  setDropdownIndex(null);
};



  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleCall = (lead) => {
    window.location.href = `tel:${lead.phone}`;
  };

  const handleEmail = (lead) => {
    window.location.href = `mailto:${lead.email}`;
  };

  const handleView = (lead) => {
    navigate(`/lead/${lead._id}`, { state: { lead } });
  };
    useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/leads/",{
      withCredentials: true,
    })
      .then((res) => {
        setLeads(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch leads:", err);
      });
  }, []);

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-gray-100 rounded-2xl p-6 shadow-inner w-full relative overflow-visible z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lead Management</h1>
          <button
            onClick={() => {
              setEditingLead(null);
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            + New Lead
          </button>
        </div>

        {leads.length > 0 ? (
          <div className="w-full">
            <table className="min-w-full bg-white text-sm rounded shadow">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Owner</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads &&
                  leads.map((lead, index) => {
                    if (!lead || !lead.userInfo) return null; // Skip if malformed

                    return (
                      <tr key={lead._id || index} className="border-t hover:bg-gray-50">
                        <td
                          onClick={() => handleView(lead)}
                          className="p-2 text-blue-600 hover:underline cursor-pointer"
                        >
                          {lead.userInfo.name}
                        </td>
                        <td className="p-2">{lead.userInfo.email}</td>
                        <td className="p-2">{lead.userInfo.phone}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-xs ${
                              lead.leadStatus === "active"
                                ? "bg-green-500"
                                : lead.leadStatus === "pending"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                            }`}
                          >
                            {lead.leadStatus}
                          </span>
                        </td>
                        <td className="p-2">{lead.owner}</td>
                        <td className="p-2 text-red-500">{lead.score}</td>
                        <td className="p-2 relative z-40">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className="text-gray-500 hover:text-black"
                            >
                              ⋮
                            </button>

                            {dropdownIndex === index && (
                              <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                <button
                                  onClick={() => handleEdit(lead)}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleCall(lead)}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  📞 Create Call
                                </button>
                                <button
                                  onClick={() => handleEmail(lead)}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  📧 Send Email
                                </button>
                                <button
                                  onClick={() => handleView(lead)}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  👁️ View
                                </button>
                                <button
                                  onClick={() => deleteLead(lead._id)}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No leads yet. Click "+ New Lead" to add.
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => {
                setShowModal(false);
                setEditingLead(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingLead ? "Edit Lead" : "Add New Lead"}
            </h2>
            <LeadForm
              onSubmit={addLead}
              onClose={() => {
                setShowModal(false);
                setEditingLead(null);
              }}
              initialData={editingLead}
            />
          </div>
        </div>
      )}
    </div>
  );
} 