import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MeetingForm from "../components/MeetingForm";

export default function MeetingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
    const found = meetings.find((m) => m.id === id);
    setMeeting(found);
  }, [id]);

  const handleDelete = () => {
    const updated = (JSON.parse(localStorage.getItem("meetings")) || []).filter(
      (m) => m.id !== id
    );
    localStorage.setItem("meetings", JSON.stringify(updated));
    navigate("/meeting");
  };

  const handleUpdate = (updatedMeeting) => {
    updatedMeeting.id = meeting.id;
    const all = JSON.parse(localStorage.getItem("meetings")) || [];
    const updated = all.map((m) => (m.id === id ? updatedMeeting : m));
    localStorage.setItem("meetings", JSON.stringify(updated));
    setMeeting(updatedMeeting);
    setShowEditModal(false);
  };

  if (!meeting) {
    return (
      <div className="p-10">
        <p>No meeting data found.</p>
        <button
          onClick={() => navigate("/meeting")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-6">Meeting Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold border-b pb-1 mb-2">Basic Information</h3>
          <p><strong>Agenda:</strong> {meeting.agenda || "—"}</p>
          <p><strong>Date & Time:</strong> {meeting.dateTime ? new Date(meeting.dateTime).toLocaleString() : "—"}</p>
          <p><strong>Created By:</strong> {meeting.createdBy || "—"}</p>
           <p><strong>Time Stamp:</strong> {meeting.timeStamp ? new Date(meeting.timeStamp).toLocaleString() : "—"}</p>
          <p><strong>Location:</strong> {meeting.location || "—"}</p>
          <p><strong>Related To:</strong> {meeting.relatedTo || "—"}</p>
          <p><strong>Contact Name:</strong> {meeting.contactName || "—"}</p>
          <p><strong>Lead Name:</strong> {meeting.leadName || "—"}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold border-b pb-1 mb-2">Description & Notes</h3>
          <p><strong>Notes:</strong> {meeting.notes || "—"}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setShowEditModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <MeetingForm
              initialData={meeting}
               onClose={() => setShowEditModal(false)}
               onSave={handleUpdate}
               />

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <p className="text-lg">Are you sure you want to delete this meeting?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
