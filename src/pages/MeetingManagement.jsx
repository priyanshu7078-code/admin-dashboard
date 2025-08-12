import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeetingForm from "../components/MeetingForm";

export default function MeetingManagement() {
  const [showModal, setShowModal] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(storedMeetings);
  }, []);

  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handleSaveMeeting = (meeting) => {
    if (editingMeeting) {
      setMeetings((prev) =>
        prev.map((m) =>
          m.id === editingMeeting.id ? { ...meeting, id: editingMeeting.id } : m
        )
      );
    } else {
      const id = Date.now().toString();
      setMeetings((prev) => [...prev, { ...meeting, id }]);
    }

    setShowModal(false);
    setEditingMeeting(null);
    setViewOnly(false);
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setViewOnly(false);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = (index) => {
    setMeetings((prev) => prev.filter((_, i) => i !== index));
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meeting Management</h1>
          <button
            onClick={() => {
              setEditingMeeting(null);
              setViewOnly(false);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Meeting
          </button>
        </div>

        {meetings.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Agenda</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">Time Stamp</th>
                <th className="p-3 text-left">Created By</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m, index) => (
                <tr key={m.id} className="border-t hover:bg-gray-50">
                  <td
                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/meeting/${m.id}`)}
                  >
                    {m.agenda || "-"}
                  </td>
                  <td className="p-3">{m.dateTime?.replace("T", " ") || "-"}</td>
                  <td className="p-3">{new Date(m.timeStamp).toLocaleString()}</td>
                  <td className="p-3">{m.createdBy || "Admin"}</td>
                  <td className="p-3 relative z-30">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(index)}>⋮</button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                          <button
                            onClick={() => navigate(`/meeting/${m.id}`)}
                            className="block px-4 py-2 hover:bg-blue-100 text-blue-600 w-full text-left"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleEdit(m)}
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
          <p className="text-gray-600">No meetings yet. Click "+ New Meeting" to add.</p>
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
                setEditingMeeting(null);
                setViewOnly(false);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {viewOnly
                ? "View Meeting"
                : editingMeeting
                ? "Edit Meeting"
                : "Add New Meeting"}
            </h2>
            <MeetingForm
              initialData={editingMeeting}
              readOnly={viewOnly}
              onSave={handleSaveMeeting}
              onClose={() => {
                setShowModal(false);
                setEditingMeeting(null);
                setViewOnly(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
