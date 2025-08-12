import { useEffect, useState } from "react";

export default function TaskForm({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    relatedTo: "",
    assignment: "",
    description: "",
    startDate: "",
    endDate: "",
    url: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-md font-semibold mb-4">
          {initialData ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="input w-full"
          />

          {/* Related To */}
          <div>
            <label className="block font-medium text-gray-600 mb-1">Related To</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="relatedTo"
                  value="Contact"
                  checked={formData.relatedTo === "Contact"}
                  onChange={handleChange}
                />
                Contact
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="relatedTo"
                  value="Lead"
                  checked={formData.relatedTo === "Lead"}
                  onChange={handleChange}
                />
                Lead
              </label>
            </div>
          </div>

          {/* Assignment To Lead */}
          <select
            name="assignment"
            value={formData.assignment}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="">Select Assignment To Lead</option>
            <option value="Lead A">Lead A</option>
            <option value="Lead B">Lead B</option>
            <option value="Lead C">Lead C</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="input w-full h-28"
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              placeholder="Start Date"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input"
              placeholder="End Date"
            />
          </div>

          {/* URL */}
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter Task Link"
            className="input w-full"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter Notes"
            className="input w-full h-24"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {initialData ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
