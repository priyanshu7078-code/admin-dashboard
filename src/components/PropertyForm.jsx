import { useEffect, useState } from "react";

export default function PropertyForm({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    propertyType: "",
    yearBuilt: "",
    address: "",
    price: "",
    squareFootage: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    lotSize: "",
    appliances: "",
    hvac: "",
    flooring: "",
    exterior: "",
    community: "",
    parking: "",
    status: "",
    agent: "",
    listingDate: "",
    marketing: "",
    mls: "",
    previousOwners: "",
    taxes: "",
    hoa: "",
    mortgageInfo: "",
    sellers: "",
    buyers: "",
    managers: "",
    contractors: "",
    internalNotes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Property" : "Add New Property"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* === BASIC INFO === */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Property Type" className="input" />
              <input type="text" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} placeholder="Year Built" className="input" />
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
              <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />
              <input type="text" name="squareFootage" value={formData.squareFootage} onChange={handleChange} placeholder="Square Footage" className="input" />
              <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="input" />
              <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="input" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input col-span-1 md:col-span-2" />
            </div>
          </div>

          {/* === FEATURES === */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Features & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="lotSize" value={formData.lotSize} onChange={handleChange} placeholder="Lot Size" className="input" />
              <input type="text" name="appliances" value={formData.appliances} onChange={handleChange} placeholder="Appliances" className="input" />
              <input type="text" name="hvac" value={formData.hvac} onChange={handleChange} placeholder="HVAC" className="input" />
              <input type="text" name="flooring" value={formData.flooring} onChange={handleChange} placeholder="Flooring" className="input" />
              <input type="text" name="exterior" value={formData.exterior} onChange={handleChange} placeholder="Exterior" className="input" />
              <input type="text" name="community" value={formData.community} onChange={handleChange} placeholder="Community Amenities" className="input" />
              <input type="text" name="parking" value={formData.parking} onChange={handleChange} placeholder="Parking" className="input" />
            </div>
          </div>

          {/* === LISTING DETAILS === */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Listing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Listing Status" className="input" />
              <input type="text" name="agent" value={formData.agent} onChange={handleChange} placeholder="Agent / Team" className="input" />
              <input type="text" name="listingDate" value={formData.listingDate} onChange={handleChange} placeholder="Listing Date" className="input" />
              <input type="text" name="marketing" value={formData.marketing} onChange={handleChange} placeholder="Marketing Description" className="input" />
              <input type="text" name="mls" value={formData.mls} onChange={handleChange} placeholder="MLS" className="input" />
              <input type="text" name="previousOwners" value={formData.previousOwners} onChange={handleChange} placeholder="Previous Owners" className="input" />
              <input type="text" name="taxes" value={formData.taxes} onChange={handleChange} placeholder="Taxes" className="input" />
              <input type="text" name="hoa" value={formData.hoa} onChange={handleChange} placeholder="HOA" className="input" />
            </div>
          </div>

          {/* === MORTGAGE & PARTIES === */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Mortgage Info & Involved Parties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="mortgageInfo" value={formData.mortgageInfo} onChange={handleChange} placeholder="Mortgage Info" className="input" />
              <input type="text" name="sellers" value={formData.sellers} onChange={handleChange} placeholder="Sellers" className="input" />
              <input type="text" name="buyers" value={formData.buyers} onChange={handleChange} placeholder="Buyers" className="input" />
              <input type="text" name="managers" value={formData.managers} onChange={handleChange} placeholder="Managers" className="input" />
              <input type="text" name="contractors" value={formData.contractors} onChange={handleChange} placeholder="Service Providers / Contractors" className="input" />
            </div>
          </div>

          {/* === INTERNAL NOTES === */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Internal Notes</h3>
            <textarea name="internalNotes" value={formData.internalNotes} onChange={handleChange} placeholder="Notes, Reminders, Flags" className="input w-full" />
          </div>

          {/* === BUTTONS === */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              {initialData ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}   