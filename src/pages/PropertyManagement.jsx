import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";

export default function PropertyManagement() {
  const [showModal, setShowModal] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
  }, []);

  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  const handleSaveProperty = (property) => {
    if (editingProperty) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingProperty.id ? { ...property, id: editingProperty.id } : p
        )
      );
    } else {
      const id = Date.now().toString();
      setProperties((prev) => [...prev, { ...property, id }]);
    }

    setShowModal(false);
    setEditingProperty(null);
    setViewOnly(false);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setViewOnly(false);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = (index) => {
    setProperties((prev) => prev.filter((_, i) => i !== index));
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Property Management</h1>
          <button
            onClick={() => {
              setEditingProperty(null);
              setViewOnly(false);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Property
          </button>
        </div>

        {properties.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Property Type</th>
                <th className="p-3 text-left">Listing Price</th>
                <th className="p-3 text-left">Square Foot</th>
                <th className="p-3 text-left">Year Built</th>
                <th className="p-3 text-left">Bedrooms</th>
                <th className="p-3 text-left">Bathrooms</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, index) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-blue-600 cursor-pointer hover:underline" onClick={() => navigate(`/property/${p.id}`)}>
                    {p.propertyType || "-"}
                  </td>
                  <td className="p-3">{p.price || "-"}</td>
                  <td className="p-3">{p.squareFootage || "-"}</td>
                  <td className="p-3">{p.yearBuilt || "-"}</td>
                  <td className="p-3">{p.bedrooms || "-"}</td>
                  <td className="p-3">{p.bathrooms || "-"}</td>
                  <td className="p-3 relative z-30">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(index)}>⋮</button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                          <button
                            onClick={() => navigate(`/property/${p.id}`)}
                            className="block px-4 py-2 hover:bg-blue-100 text-blue-600 w-full text-left"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleEdit(p)}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="block px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No properties yet. Click "+ New Property" to add.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
          <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => {
                setShowModal(false);
                setEditingProperty(null);
                setViewOnly(false);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {viewOnly ? "View Property" : editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <PropertyForm
              initialData={editingProperty}
              readOnly={viewOnly}
              onSave={handleSaveProperty}
              onClose={() => {
                setShowModal(false);
                setEditingProperty(null);
                setViewOnly(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
