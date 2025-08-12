import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CallForm from "../components/CallForm";

export default function CallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const calls = JSON.parse(localStorage.getItem("calls")) || [];
    const found = calls.find((c) => c.id === id);
    setCall(found);
  }, [id]);

  const handleDelete = () => {
    const updated = (JSON.parse(localStorage.getItem("calls")) || []).filter(
      (c) => c.id !== id
    );
    localStorage.setItem("calls", JSON.stringify(updated));
    navigate("/calls");
  };

  const handleUpdate = (updatedCall) => {
    updatedCall.id = call.id;
    const all = JSON.parse(localStorage.getItem("calls")) || [];
    const updated = all.map((c) => (c.id === id ? updatedCall : c));
    localStorage.setItem("calls", JSON.stringify(updated));
    setCall(updatedCall);
    setShowEditModal(false);
  };

  if (!call) {
    return (
      <div className="p-10">
        <p>No call data found.</p>
        <button
          onClick={() => navigate("/calls")}
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

      <h2 className="text-2xl font-bold mb-6">Call Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold border-b pb-1 mb-2">Call Information</h3>
          <p><strong>Related To:</strong> {call.relatedTo || "—"}</p>
          <p><strong>Recipient:</strong> {call.recipient || "—"}</p>
          <p><strong>Start Date:</strong> {call.startDate || "—"}</p>
          <p><strong>End Date:</strong> {call.endDate || "—"}</p>
          <p><strong>Call Duration:</strong> {call.duration || "—"}</p>
          <p><strong>Created By:</strong> {call.createdBy || "Admin"}</p>
          <p><strong>Time Stamp:</strong> {call.timeStamp ? new Date(call.timeStamp).toLocaleString() : "—"}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold border-b pb-1 mb-2">Notes</h3>
          <p>{call.notes || "—"}</p>
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
            <CallForm
              initialData={call}
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
            <p className="text-lg">Are you sure you want to delete this call?</p>
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
