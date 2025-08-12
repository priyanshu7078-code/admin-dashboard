import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function TaskManagement() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...task, id: editingTask.id } : t
        )
      );
    } else {
      const id = Date.now().toString();
      setTasks((prev) => [...prev, { ...task, id }]);
    }

    setShowModal(false);
    setEditingTask(null);
    setViewOnly(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setViewOnly(false);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setViewOnly(false);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Task
          </button>
        </div>

        {tasks.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Title</th>
                 <th className="p-3 text-left">Related To</th>
                 <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, index) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td
                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/tasks/${t.id}`)}
                  >
                    {t.title || "-"}
                  </td>
                  <td className="p-3">{t.relatedTo || "-"}</td>
                  <td className="p-3">{t.assignment || "-"}</td>
                  <td className="p-3">{t.startDate || "-"}</td>
                  <td className="p-3">{t.endDate || "-"}</td>
                  <td className="p-3 relative z-30">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(index)}>⋮</button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                          <button
                            onClick={() => navigate(`/tasks/${t.id}`)}
                            className="block px-4 py-2 hover:bg-blue-100 text-blue-600 w-full text-left"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleEdit(t)}
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
          <p className="text-gray-600">No tasks yet. Click "+ New Task" to add.</p>
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
                setEditingTask(null);
                setViewOnly(false);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {viewOnly ? "View Task" : editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <TaskForm
              initialData={editingTask}
              readOnly={viewOnly}
              onSave={handleSaveTask}
              onClose={() => {
                setShowModal(false);
                setEditingTask(null);
                setViewOnly(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
