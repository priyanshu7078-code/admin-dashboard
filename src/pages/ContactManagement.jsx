import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

export default function ContactManagement() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id ? { ...newContact, id: editingContact.id } : c
        )
      );
      setEditingContact(null);
    } else {
      const id = Date.now().toString();
      setContacts((prev) => [...prev, { ...newContact, id }]);
    }
    setShowModal(false);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleView = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  const deleteContact = (index) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
    setDropdownIndex(null);
  };

  return (
    <div className="p-10 w-full min-h-screen bg-gray-50">
      <div className="bg-gray-100 rounded-2xl p-6 shadow-inner w-full relative overflow-visible z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Contact Management</h1>
          <button
            onClick={() => {
              setEditingContact(null);
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            + New Contact
          </button>
        </div>

        {contacts.length > 0 ? (
          <table className="min-w-full bg-white text-sm rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Email Address</th>
                <th className="p-3 text-left">Contact Method</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{contact.title || "-"}</td>

                  {/* Make First Name clickable */}
                  <td className="p-3">
                    <button
                      onClick={() => handleView(contact)}
                      className="text-blue-600 hover:underline focus:outline-none"
                    >
                      {contact.firstName || "-"}
                    </button>
                  </td>

                  <td className="p-3">{contact.lastName || "-"}</td>
                  <td className="p-3">{contact.phone || "-"}</td>
                  <td className="p-3">{contact.email || "-"}</td>
                  <td className="p-3">{contact.contactMethod || "-"}</td>
                  <td className="p-3 relative z-40">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="text-gray-500 hover:text-black"
                      >
                        ⋮
                      </button>

                      {dropdownIndex === index && (
                        <div className="absolute right-0 z-50 mt-2 w-44 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                          <button
                            onClick={() => handleEdit(contact)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleView(contact)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => alert('Email composer not implemented yet')}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                          >
                            ✉️ Create Email
                          </button>
                          <button
                            onClick={() => alert('Sending email not implemented yet')}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                          >
                            📤 Send Email
                          </button>
                          <button
                            onClick={() => deleteContact(index)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
          <p className="text-gray-600">No contacts yet. Click "+ New Contact" to add.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => {
                setShowModal(false);
                setEditingContact(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingContact ? "Edit Contact" : "Add New Contact"}
            </h2>
            <ContactForm
              onSubmit={addContact}
              onClose={() => {
                setShowModal(false);
                setEditingContact(null);
              }}
              initialData={editingContact}
            />
          </div>
        </div>
      )}
    </div>
  );
}
