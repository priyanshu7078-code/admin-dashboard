import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CallForm from "../components/CallForm";

export default function CallManagement() {
  const [showModal, setShowModal] = useState(false);
  const [calls, setCalls] = useState([]);
  const [editingCall, setEditingCall] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCalls = JSON.parse(localStorage.getItem("calls")) || [];
    setCalls(storedCalls);
  }, []);

  useEffect(() => {
    localStorage.setItem("calls", JSON.stringify(calls));
  }, [calls]);

  const handleSaveCall = (call) => {
    const timestamp = new Date().toISOString();
    const createdBy = "Admin";

    if (editingCall) {
      setCalls((prev) =>
        prev.map((c) =>
          c.id === editingCall.id
            ? { ...call, id: editingCall.id, createdBy, timeStamp: timestamp }
            : c
        )
      );
    } else {
      const id = Date.now().toString();
      setCalls((prev) => [
        ...prev,
        { ...call, id, createdBy, timeStamp: timestamp },
      ]);
    }

    setShowModal(false);
    setEditingCall(null);
    setViewOnly(false);
  };

  const handleEdit = (call) => {
    setEditingCall(call);
    setViewOnly(false);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = (index) => {
    setCalls((prev) => prev.filter((_, i) => i !== index));
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Call Management</h1>
          <button
            onClick={() => {
              setEditingCall(null);
              setViewOnly(false);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Call
          </button>
        </div>

        {calls.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Recipient</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Created By</th>
                <th className="p-3 text-left">Time Stamp</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((c, index) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td
                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/call/${c.id}`)}
                  >
                    {c.recipient}
                  </td>
                  <td className="p-3">{c.startDate || "-"}</td>
                  <td className="p-3">{c.endDate || "-"}</td>
                  <td className="p-3">{c.duration}</td>
                  <td className="p-3">{c.createdBy || "Admin"}</td>
                  <td className="p-3">{new Date(c.timeStamp).toLocaleString()}</td>
                  <td className="p-3 relative z-30">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(index)}>⋮</button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                          <button
                            onClick={() => navigate(`/call/${c.id}`)}
                            className="block px-4 py-2 hover:bg-blue-100 text-blue-600 w-full text-left"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleEdit(c)}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="block px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No calls yet. Click "+ New Call" to add.</p>
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
                setEditingCall(null);
                setViewOnly(false);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {viewOnly
                ? "View Call"
                : editingCall
                ? "Edit Call"
                : "Add New Call"}
            </h2>
            <CallForm
              initialData={editingCall}
              readOnly={viewOnly}
              onSubmit={handleSaveCall}
              onClose={() => {
                setShowModal(false);
                setEditingCall(null);
                setViewOnly(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
