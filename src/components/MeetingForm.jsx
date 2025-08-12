import { useState } from "react";

export default function MeetingForm({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    agenda: "",
    relatedTo: "Contact",
    contactName: "",
    leadName: "",
    location: "",
    dateTime: "",
    notes: "",
    createdBy: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION CHECKS
    if (!formData.agenda.trim()) {
      alert("Agenda is required.");
      return;
    }

    if (!formData.dateTime) {
      alert("Please select a date and time.");
      return;
    }

    if (
      (formData.relatedTo === "Contact" && !formData.contactName.trim()) ||
      (formData.relatedTo === "Lead" && !formData.leadName.trim())
    ) {
      alert(`Please provide a ${formData.relatedTo.toLowerCase()} name.`);
      return;
    }

    const dataToSave = {
      ...formData,
      contactName: formData.relatedTo === "Contact" ? formData.contactName : "",
      leadName: formData.relatedTo === "Lead" ? formData.leadName : "",
      timeStamp: new Date().toISOString(),
    };

    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Agenda</label>
            <input
              type="text"
              name="agenda"
              value={formData.agenda}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Related To</label>
            <select
              name="relatedTo"
              value={formData.relatedTo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Contact">Contact</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          {formData.relatedTo === "Contact" && (
            <div>
              <label className="block mb-1 font-medium">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          {formData.relatedTo === "Lead" && (
            <div>
              <label className="block mb-1 font-medium">Lead Name</label>
              <input
                type="text"
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Add Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
