import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("information");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    const found = properties.find((p) => p.id === id);
    setProperty(found);
  }, [id]);

  const handleDelete = () => {
    const updated = (JSON.parse(localStorage.getItem("properties")) || []).filter(
      (p) => p.id !== id
    );
    localStorage.setItem("properties", JSON.stringify(updated));
    navigate("/property");
  };

  const handleUpdate = (updatedProperty) => {
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    const updated = all.map((p) => (p.id === id ? updatedProperty : p));
    localStorage.setItem("properties", JSON.stringify(updated));
    setProperty(updatedProperty);
    setShowEditModal(false);
  };

  if (!property) {
    return (
      <div className="p-10">
        <p>No property data found.</p>
        <button
          onClick={() => navigate("/property")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const tabs = ["information", "gallery"];

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-4">Property Details</h2>

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

      {activeTab === "information" && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Basic Information</h3>
              <p><strong>Type:</strong> {property.propertyType || "—"}</p>
              <p><strong>Year Built:</strong> {property.yearBuilt || "—"}</p>
              <p><strong>Address:</strong> {property.address || "—"}</p>
              <p><strong>Price:</strong> {property.price || "—"}</p>
              <p><strong>Square Footage:</strong> {property.squareFootage || "—"}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms || "—"}</p>
              <p><strong>Bathrooms:</strong> {property.bathrooms || "—"}</p>
              <p><strong>Description:</strong> {property.description || "—"}</p>
            </div>

            {/* Features */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Features & Amenities</h3>
              <p><strong>Lot Size:</strong> {property.lotSize || "—"}</p>
              <p><strong>Appliances:</strong> {property.appliances || "—"}</p>
              <p><strong>HVAC:</strong> {property.hvac || "—"}</p>
              <p><strong>Flooring:</strong> {property.flooring || "—"}</p>
              <p><strong>Exterior:</strong> {property.exterior || "—"}</p>
              <p><strong>Community:</strong> {property.community || "—"}</p>
              <p><strong>Parking:</strong> {property.parking || "—"}</p>
            </div>

            {/* Listing Details */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Listing Details</h3>
              <p><strong>Status:</strong> {property.status || "—"}</p>
              <p><strong>Agent:</strong> {property.agent || "—"}</p>
              <p><strong>Listing Date:</strong> {property.listingDate || "—"}</p>
              <p><strong>Marketing:</strong> {property.marketing || "—"}</p>
              <p><strong>MLS:</strong> {property.mls || "—"}</p>
              <p><strong>Previous Owners:</strong> {property.previousOwners || "—"}</p>
              <p><strong>Taxes:</strong> {property.taxes || "—"}</p>
              <p><strong>HOA:</strong> {property.hoa || "—"}</p>
            </div>

            {/* Mortgage & Parties */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold border-b pb-1 mb-2">Mortgage & Parties</h3>
              <p><strong>Mortgage Info:</strong> {property.mortgageInfo || "—"}</p>
              <p><strong>Sellers:</strong> {property.sellers || "—"}</p>
              <p><strong>Buyers:</strong> {property.buyers || "—"}</p>
              <p><strong>Managers:</strong> {property.managers || "—"}</p>
              <p><strong>Contractors:</strong> {property.contractors || "—"}</p>
            </div>

            {/* Internal Notes */}
            <div className="bg-white p-4 rounded shadow col-span-full">
              <h3 className="font-semibold border-b pb-1 mb-2">Internal Notes</h3>
              <p>{property.internalNotes || "—"}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}

      {activeTab === "gallery" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Add Property Gallery</h3>
          <p className="text-gray-500">This is where gallery content will go.</p>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <PropertyForm
              initialData={property}
              onClose={() => setShowEditModal(false)}
              onSave={handleUpdate}
            />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <p className="text-lg">Are you sure you want to delete this property?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}