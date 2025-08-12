import { useState, useEffect } from "react";
import axios from "axios";

export default function LeadForm({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    userInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    
     leadSource: '',
    // sourceDetails: "",
    // campaign: "",
    // channel: "",
    // medium: "",
    // sourceCampaign: "",
    // referral: "",
    // agent: "",
    owner: '',
    // pref: "",
    leadStatus: '',
    //  creationDate: "",
     conversionDate: "",
     followUpDate: "",
     followUpStatus: "",
     score: '',
    // nurturingWorkflow: "",
    // engagementLevel: "",
    // conversionRate: "",
    // nurturingStage: "",
    // nextAction: "",
  });




const formatDate = (date) => {
  if (!date) return "";
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch {
    return "";
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["name", "email", "phone", "address"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const cleanedUserInfo = {
    name: String(formData.userInfo?.name || "").trim(),
    phone: String(formData.userInfo?.phone || "").trim(),
    email: String(formData.userInfo?.email || "").trim(),
    address: String(formData.userInfo?.address || "").trim(),
  };

  if (!cleanedUserInfo.name || !cleanedUserInfo.phone) {
    alert("Name and Phone are required.");
    return;
  }

  const leadToSubmit = {
    ...formData,
    ...cleanedUserInfo,
    userInfo: undefined,
    followUpStatus: formData.followUpStatus || "Pending",
  };

  delete leadToSubmit._id;
  delete leadToSubmit.__v;
  delete leadToSubmit.status;
  delete leadToSubmit.createdAt;
  delete leadToSubmit.updatedAt;

  try {
    if (initialData?._id) {
      await axios.put(
        `http://localhost:5000/dashboard/leads/${formData._id}`,
        leadToSubmit,{
      withCredentials: true,
    }
      );
    } 
//     else {

//       await axios.post(
        
//         `http://192.168.1.43:5000/dashboard/leads`,
//         leadToSubmit
//       ).then((res)=>{
//         console.log(formData)
//  onSubmit?.(res.data);
//       })
      
//     }
  
    onSubmit?.(leadToSubmit);
    onClose?.();
  } catch (err) {
    console.error("❌ Error submitting lead:", err);
    alert(err?.response?.data || "Failed to submit lead. Check console.");
  }
};

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        userInfo: {
          ...prev.userInfo,
          ...(initialData.userInfo || {}),
        },
      }));
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Basic Lead Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="*Enter Lead Name" value={formData?.userInfo?.name} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="email" placeholder="Enter Lead Email" value={formData?.userInfo?.email} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="phone" placeholder="Enter Phone Number" value={formData?.userInfo?.phone} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <textarea name="address" placeholder="Enter Lead Address" value={formData?.userInfo?.address} onChange={handleChange} className="border rounded-md p-2 w-full h-20 resize-none" />
            </div>
          </div>

          {/* Source Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Lead Source and Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="leadSource" placeholder="Enter Lead Source" value={formData?.leadSource} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <select
                 name="leadStatus"  // ✅ corrected
                 value={formData?.leadStatus}  // ✅ corrected
                 onChange={handleChange}

                className="w-full border border-gray-300 rounded px-3 py-2"
               >
                <option value="">Select Lead Status</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="active">Active</option>
              </select>
              <input name="sourceDetails" placeholder="Enter Source Details" value={formData.sourceDetails} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="campaign" placeholder="Enter Campaign" value={formData.campaign} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="channel" placeholder="Enter Channel" value={formData.channel} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="medium" placeholder="Enter Medium" value={formData.medium} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="sourceCampaign" placeholder="Enter Source Campaign" value={formData.sourceCampaign} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="referral" placeholder="Enter Referral" value={formData.referral} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Assignment */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Lead Assignment and Ownership</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="agent" placeholder="Assigned Agent" value={formData.agent} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="owner" placeholder="Owner" value={formData.owner} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="pref" placeholder="Preferences" value={formData.pref} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Lead Dates and Follow-up</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <input
    name="creationDate"
    type="date"
    value={formatDate(formData.creationDate)}
    onChange={handleChange}
    className="border rounded-md p-2 w-full"
  />
  <input
    name="conversionDate"
    type="date"
    value={formatDate(formData.conversionDate)}
    onChange={handleChange}
    className="border rounded-md p-2 w-full"
  />
  <input
    name="followUpDate"
    type="date"
    value={formatDate(formData.followUpDate)}
    onChange={handleChange}
    className="border rounded-md p-2 w-full"
  />
</div>

            <input name="followUpStatus" placeholder="Follow Up Status" value={formData.followUpStatus} onChange={handleChange} className="border rounded-md p-2 w-full mt-4" />
          </div>

          {/* Scoring */}
          <div>
            <h3 className="text-sm font-semibold mt-6 mb-2">Lead Scoring and Nurturing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="score" type="number" placeholder="Lead Score" value={formData.score} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="nurturingWorkflow" placeholder="Nurturing Workflow" value={formData.nurturingWorkflow} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="engagementLevel" placeholder="Engagement Level" value={formData.engagementLevel} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="conversionRate" placeholder="Conversion Rate" value={formData.conversionRate} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="nurturingStage" placeholder="Nurturing Stage" value={formData.nurturingStage} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="nextAction" placeholder="Next Action" value={formData.nextAction} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="text-red-500 hover:underline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              {initialData ? "Update Lead" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
