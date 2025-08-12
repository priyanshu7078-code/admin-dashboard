import { useState, useEffect } from "react";

export default function ContactForm({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    mobile: "",
    physicalAddress: "",
    mailingAddress: "",
    contactMethod: "",
    leadSource: "",
    referralSource: "",
    campaignSource: "",
    status: "",
    rating: 0,
    probability: "",
    tags: "",
    notes: "",
    birthday: "",
    anniversary: "",
    milestones: "",
    occupation: "",
    interests: "",
    gender: "",
    dob: "",
    frequency: "",
    preferences: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    otherSocial: "",
    assignedAgent: "",
    internalNotes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-md font-semibold mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="physicalAddress" placeholder="Physical Address" value={formData.physicalAddress} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="mailingAddress" placeholder="Mailing Address" value={formData.mailingAddress} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="contactMethod" placeholder="Preferred Contact Method" value={formData.contactMethod} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Lead Source Information */}
          <div>
            <h3 className="text-md font-semibold mb-2">Lead Source Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="leadSource" placeholder="Lead Source" value={formData.leadSource} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="referralSource" placeholder="Referral Source" value={formData.referralSource} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="campaignSource" placeholder="Campaign Source" value={formData.campaignSource} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Status and Classifications */}
          <div>
            <h3 className="text-md font-semibold mb-2">Status and Classifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="status" placeholder="Lead Status" value={formData.status} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="rating" type="number" placeholder="Lead Rating (0)" value={formData.rating} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="probability" placeholder="Lead Conversion Probability" value={formData.probability} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="tags" placeholder="Tags or Categories" value={formData.tags} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <textarea name="notes" placeholder="Notes and Comments" value={formData.notes} onChange={handleChange} className="border rounded-md p-2 w-full h-20 resize-none" />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-md font-semibold mb-2">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="birthday" type="date" value={formData.birthday} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="anniversary" type="date" value={formData.anniversary} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="milestones" placeholder="Key Milestones" value={formData.milestones} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="interests" placeholder="Interests or Hobbies" value={formData.interests} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded-md p-2 w-full text-gray-700">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="frequency" placeholder="Communication Frequency" value={formData.frequency} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="preferences" placeholder="Preferences" value={formData.preferences} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>

          {/* Social Media & Assignment */}
          <div>
            <h3 className="text-md font-semibold mb-2">Social & Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="linkedin" placeholder="LinkedIn Profile URL" value={formData.linkedin} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="facebook" placeholder="Facebook Profile URL" value={formData.facebook} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="twitter" placeholder="Twitter Handle" value={formData.twitter} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="otherSocial" placeholder="Other Social Media URL" value={formData.otherSocial} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <input name="assignedAgent" placeholder="Assigned Agent or Team Member" value={formData.assignedAgent} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <textarea name="internalNotes" placeholder="Internal Notes" value={formData.internalNotes} onChange={handleChange} className="border rounded-md p-2 w-full h-20 resize-none" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="text-red-500 hover:underline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              {initialData ? "Update Contact" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
