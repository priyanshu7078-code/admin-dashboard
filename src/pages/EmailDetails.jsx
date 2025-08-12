import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmailDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const emails = JSON.parse(localStorage.getItem("emails")) || [];
    const found = emails.find((e) => e.id === id);
    setEmail(found);
  }, [id]);

  if (!email) {
    return (
      <div className="p-10">
        <p>No email data found.</p>
        <button
          onClick={() => navigate("/emails")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-lg mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 flex items-center gap-2 text-purple-700 border border-purple-700 px-3 py-1.5 rounded hover:bg-purple-100"
      >
        <span className="text-lg">←</span>
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="bg-white rounded-xl shadow p-6 mt-14">
        <h2 className="text-xl font-semibold mb-4">Email View page</h2>
        <hr className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-800">
          <div>
            <p className="font-semibold">Sender</p>
            <p>{email.createdBy || "Admin"}</p>
          </div>
          <div>
            <p className="font-semibold">Recipient</p>
            <p>{email.recipient || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Related To</p>
            <p>{email.relatedTo || "—"}</p>
          </div>
          <div>
            <p className="font-semibold">Start Date</p>
            <p>{email.startDate ? `(${email.startDate}) 12:00am` : "—"}</p>
          </div>
          <div>
            <p className="font-semibold">End Date</p>
            <p>{email.endDate ? `(${email.endDate}) 12:00am` : "—"}</p>
          </div>
          <div>
            <p className="font-semibold">Timestamp</p>
            <p>
              {email.timeStamp
                ? new Date(email.timeStamp).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </p>
          </div>
          <div>
            <p className="font-semibold">Subject</p>
            <p>{email.subject || "—"}</p>
          </div>
          <div className="md:col-span-2 mt-4">
            <p className="font-semibold">Message</p>
            <p>{email.message || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
