import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import LeadForm from "../components/LeadForm";

const LeadDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [lead, setLead] = useState(state?.lead || {});
  const [activeTab, setActiveTab] = useState("information");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!lead) {
    return (
      <div className="p-10">
        <p>No lead data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const tabs = ["information", "activity", "documents"];

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleUpdate = (updatedData) => {
    console.log("Updated lead data:", updatedData);
    setLead(updatedData)
    setShowEditModal(false);
    // Call your API to update the lead with updatedData
  };

  const handleConfirmDelete = () => {
    console.log("Lead deleted:", lead.id);
    // Call your delete API here
    setShowDeleteConfirm(false);
    navigate("/leads");
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

      <h2 className="text-2xl font-bold mb-4">Lead Details</h2>

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
            {/* Example Info Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Basic Lead Information</h3>
              <p><strong>Lead Name:</strong> {lead.userInfo.name}</p>
              <p><strong>Lead Email:</strong> {lead.userInfo.email}</p>
              <p><strong>Lead Phone Number:</strong> {lead.userInfo.phone}</p>
              <p><strong>Lead Address:</strong> {lead.userInfo.address}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Lead Dates and Follow-up</h3>
              <p><strong>Creation Date:</strong> {lead.creationDate}</p>
              <p><strong>Conversion Date:</strong> {lead.conversionDate}</p>
              <p><strong>Follow-up Date:</strong> {lead.followUpDate}</p>
              <p><strong>Follow-up Status:</strong> {lead.followUpStatus}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Source and Status</h3>
              <p><strong>Source:</strong> {lead.source}</p>
              <p><strong>Status:</strong> {lead.leadStatus}</p>
              <p><strong>Source Details:</strong> {lead.sourceDetails || "N/A"}</p>
              <p><strong>Campaign:</strong> {lead.campaign || "N/A"}</p>
              <p><strong>Channel:</strong> {lead.channel || "N/A"}</p>
              <p><strong>Medium:</strong> {lead.medium || "N/A"}</p>
              <p><strong>Source Campaign:</strong> {lead.sourceCampaign || "N/A"}</p>
              <p><strong>Referral:</strong> {lead.referral || "N/A"}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Assignment & Ownership</h3>
              <p><strong>Owner:</strong> {lead.owner || "N/A"}</p>
              <p><strong>Agent:</strong> {lead.agent || "N/A"}</p>
              <p><strong>Preferences:</strong> {lead.pref || "N/A"}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Scoring & Nurturing</h3>
              <p><strong>Score:</strong> {lead.score || "N/A"}</p>
              <p><strong>Nurturing Workflow:</strong> {lead.nurturingWorkflow || "N/A"}</p>
              <p><strong>Engagement Level:</strong> {lead.engagementLevel || "N/A"}</p>
              <p><strong>Conversion Rate:</strong> {lead.conversionRate || "N/A"}</p>
              <p><strong>Nurturing Stage:</strong> {lead.nurturingStage || "N/A"}</p>
              <p><strong>Next Action:</strong> {lead.nextAction || "N/A"}</p>
            </div>
          </div>

          {/* Action Buttons */}
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
          <p>(You can later display user actions, follow-up attempts, notes here...)</p>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-white p-6 rounded shadow text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Documents</h3>
          <p>(You can upload/view files related to the lead here...)</p>
        </div>
      )}

      {/* Edit Modal using LeadForm */}
          {showEditModal && (
  <LeadForm
    mode="edit"
    initialData={lead}
    onClose={() => setShowEditModal(false)}
    onSubmit={handleUpdate} // ✅ FIXED
  />
)}


      {/* Delete Confirm Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this lead?</h2>
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

export default LeadDetails;
