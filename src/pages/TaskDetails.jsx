import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [activeTab, setActiveTab] = useState("information");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const found = tasks.find((t) => t.id === id);
    setTask(found);
  }, [id]);

  const handleDelete = () => {
    const updated = (JSON.parse(localStorage.getItem("tasks")) || []).filter(
      (t) => t.id !== id
    );
    localStorage.setItem("tasks", JSON.stringify(updated));
    navigate("/tasks");
  };

  const handleUpdate = (updatedTask) => {
    const all = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = all.map((t) => (t.id === id ? updatedTask : t));
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTask(updatedTask);
    setShowEditModal(false);
  };

  if (!task) {
    return (
      <div className="p-10">
        <p>No task data found.</p>
        <button
          onClick={() => navigate("/tasks")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const tabs = ["information", "activity"];

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-4">Task Details</h2>

      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize rounded-t-md ${
              activeTab === tab
                ? "bg-white border-l border-t border-r text-purple-600"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "information" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold border-b pb-1 mb-2">Basic Information</h3>
            <p><strong>Title:</strong> {task.title || "—"}</p>
            <p><strong>Related To:</strong> {task.relatedTo || "—"}</p>
            <p><strong>Assignment:</strong> {task.assignment || "—"}</p>
            <p><strong>Start Date:</strong> {task.startDate || "—"}</p>
            <p><strong>End Date:</strong> {task.endDate || "—"}</p>
            <p><strong>URL:</strong> <a href={task.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{task.url || "—"}</a></p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold border-b pb-1 mb-2">Description & Notes</h3>
            <p><strong>Description:</strong> {task.description || "—"}</p>
            <p><strong>Notes:</strong> {task.notes || "—"}</p>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
          <p className="text-gray-500">Activity logs and comments will go here.</p>
        </div>
      )}

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

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <TaskForm
              initialData={task}
              onClose={() => setShowEditModal(false)}
              onSave={handleUpdate}
            />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <p className="text-lg">Are you sure you want to delete this task?</p>
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