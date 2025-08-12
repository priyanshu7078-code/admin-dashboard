import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailForm from "../components/EmailForm";

export default function EmailManagement() {
  const [showModal, setShowModal] = useState(false);
  const [emails, setEmails] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    setEmails(storedEmails);
  }, []);

  useEffect(() => {
    localStorage.setItem("emails", JSON.stringify(emails));
  }, [emails]);

  const handleSaveEmail = (email) => {
    const timestamp = new Date().toISOString();
    const createdBy = "Admin";

    if (editingEmail) {
      setEmails((prev) =>
        prev.map((e) =>
          e.id === editingEmail.id
            ? { ...email, id: editingEmail.id, createdBy, timeStamp: timestamp }
            : e
        )
      );
    } else {
      const id = Date.now().toString();
      setEmails((prev) => [
        ...prev,
        { ...email, id, createdBy, timeStamp: timestamp },
      ]);
    }

    setShowModal(false);
    setEditingEmail(null);
    setViewOnly(false);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Email Management</h1>
          <button
            onClick={() => {
              setEditingEmail(null);
              setViewOnly(false);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Email
          </button>
        </div>

        {emails.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Recipient</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Created By</th>
                <th className="p-3 text-left">Time Stamp</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((e) => (
                <tr key={e.id} className="border-t hover:bg-gray-50">
                  <td
                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/emails/${e.id}`)}
                  >
                    {e.recipient || "N/A"}
                  </td>
                  <td className="p-3">{e.subject}</td>
                  <td className="p-3">{e.startDate || "-"}</td>
                  <td className="p-3">{e.endDate || "-"}</td>
                  <td className="p-3">{e.createdBy || "Admin"}</td>
                  <td className="p-3">{new Date(e.timeStamp).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/emails/${e.id}`)}
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="green"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12C2.25 12 5.25 6.75 12 6.75s9.75 5.25 9.75 5.25-3 5.25-9.75 5.25S2.25 12 2.25 12z"
                        />
                        <circle cx="12" cy="14" r="2.25" fill="white" />
                      </svg>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No emails yet. Click "+ New Email" to add.</p>
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
                setEditingEmail(null);
                setViewOnly(false);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {viewOnly
                ? "View Email"
                : editingEmail
                ? "Edit Email"
                : "Add New Email"}
            </h2>
            <EmailForm
              initialData={editingEmail}
              readOnly={viewOnly}
              onSubmit={handleSaveEmail}
              onClose={() => {
                setShowModal(false);
                setEditingEmail(null);
                setViewOnly(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
