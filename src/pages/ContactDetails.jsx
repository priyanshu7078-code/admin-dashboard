import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ContactForm from "../components/ContactForm";

const ContactDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState(state?.contact || {});
  const [activeTab, setActiveTab] = useState("information");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notes, setNotes] = useState(contact?.notes || "");


  if (!contact) {
    return (
      <div className="p-10">
        <p>No contact data found.</p>
        <button
          onClick={() => navigate("/contacts")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const tabs = ["information", "activity", "documents", "Social Media" , "Notes"];

  const handleEdit = () => setShowEditModal(true);
  const handleDelete = () => setShowDeleteConfirm(true);

  const handleUpdate = (updatedData) => {
    console.log("Updated contact:", updatedData);
    setContact(updatedData);
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    console.log("Contact deleted:", contact.id);
    setShowDeleteConfirm(false);
    navigate("/contacts");
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

      {/* Tabs */}
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

      {/* Tab Content */}
      {activeTab === "information" && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Basic Information</h3>
              <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
              <p><strong>Title:</strong> {contact.title}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Mobile:</strong> {contact.mobile}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Address & Contact Prefs</h3>
              <p><strong>Physical Address:</strong> {contact.physicalAddress}</p>
              <p><strong>Mailing Address:</strong> {contact.mailingAddress}</p>
              <p><strong>Preferred Contact Method:</strong> {contact.contactMethod}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Classification</h3>
              <p><strong>Lead Source:</strong> {contact.leadSource}</p>
              <p><strong>Referral Source:</strong> {contact.referralSource}</p>
              <p><strong>Campaign Source:</strong> {contact.campaignSource}</p>
              <p><strong>Status:</strong> {contact.status}</p>
              <p><strong>Rating:</strong> {contact.rating}</p>
              <p><strong>Probability:</strong> {contact.probability}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Additional Info</h3>
              <p><strong>Birthday:</strong> {contact.birthday}</p>
              <p><strong>Anniversary:</strong> {contact.anniversary}</p>
              <p><strong>Milestones:</strong> {contact.milestones}</p>
              <p><strong>Occupation:</strong> {contact.occupation}</p>
              <p><strong>Interests:</strong> {contact.interests}</p>
              <p><strong>Gender:</strong> {contact.gender}</p>
              <p><strong>DOB:</strong> {contact.dob}</p>
              <p><strong>Frequency:</strong> {contact.frequency}</p>
              <p><strong>Preferences:</strong> {contact.preferences}</p>
              <p><strong>Notes:</strong> {contact.notes}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Social Media & Assignment</h3>
              <p><strong>LinkedIn:</strong> {contact.linkedin}</p>
              <p><strong>Facebook:</strong> {contact.facebook}</p>
              <p><strong>Twitter:</strong> {contact.twitter}</p>
              <p><strong>Other Social:</strong> {contact.otherSocial}</p>
              <p><strong>Assigned Agent:</strong> {contact.assignedAgent}</p>
              <p><strong>Internal Notes:</strong> {contact.internalNotes}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={handleEdit} className="px-4 py-2 bg-purple-600 text-white rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        </>
      )}

      {activeTab === "activity" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Activity Log</h3>
          <p>(Display contact activities, emails, meetings here)</p>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Documents</h3>
          <p>(Upload or list files related to contact)</p>
        </div>
      )}

      {activeTab === "Social Media" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Social Media</h3>
          <p><strong>LinkedIn:</strong> {contact.linkedin}</p>
          <p><strong>Facebook:</strong> {contact.facebook}</p>
          <p><strong>Twitter:</strong> {contact.twitter}</p>
          <p><strong>Other:</strong> {contact.otherSocial}</p>
        </div>
      )}
        
        {activeTab === "Notes" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <textarea
            className="w-full h-40 p-3 border rounded resize-none"
            placeholder="Write notes about this contact..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      )}

      {showEditModal && (
        <ContactForm
          initialData={contact}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this contact?</h2>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
