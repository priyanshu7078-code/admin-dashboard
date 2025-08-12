import { useState } from "react";

export default function EmailForm({ onClose, onSubmit, initialData = {} }) {
  const [relatedTo, setRelatedTo] = useState(initialData?.relatedTo || "Lead");
  const [recipient, setRecipient] = useState(initialData?.recipient || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [message, setMessage] = useState(initialData?.message || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailData = {
      relatedTo,
      recipient,
      startDate,
      endDate,
      subject,
      message,
      timeStamp: new Date().toISOString(),
      createdBy: initialData?.createdBy || "Admin",
      id: initialData?.id || Date.now().toString()
    };
    onSubmit(emailData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {initialData?.id ? "Edit Email" : "Create Email"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Related To */}
          <div>
            <label className="block text-sm font-medium mb-1">Related To</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="relatedTo"
                  value="Contact"
                  checked={relatedTo === "Contact"}
                  onChange={() => setRelatedTo("Contact")}
                  className="mr-2"
                />
                Contact
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="relatedTo"
                  value="Lead"
                  checked={relatedTo === "Lead"}
                  onChange={() => setRelatedTo("Lead")}
                  className="mr-2"
                />
                Lead
              </label>
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient ({relatedTo.toLowerCase()})
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            >
              <option value="">Assignment To</option>
              <option value="Person A">Person A</option>
              <option value="Person B">Person B</option>
              {/* You can populate this dynamically */}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              {initialData?.id ? "Update Email" : "Add Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
