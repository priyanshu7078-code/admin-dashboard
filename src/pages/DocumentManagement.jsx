import { useState } from "react";

export default function DocumentsManagement() {
  const [documentsByFolder, setDocumentsByFolder] = useState({});
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const handlePublish = () => {
    if (file && folderName && fileName) {
      const objectUrl = URL.createObjectURL(file);
      const dateTime = new Date().toLocaleString();

      const newDoc = {
        title: fileName,
        type: file.type,
        uploadedBy: "Admin",
        dateTime: dateTime,
        url: objectUrl,
      };

      setDocumentsByFolder((prev) => {
        const updated = { ...prev };
        if (!updated[folderName]) {
          updated[folderName] = [];
        }
        updated[folderName].push(newDoc);
        return updated;
      });

      setFileName("");
      setFolderName("");
      setFile(null);
    }
  };

  const handleDownload = (doc) => {
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.title;
    link.click();
  };

  const handleView = (doc) => {
    window.open(doc.url, "_blank");
  };

  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Documents</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: File Explorer */}
        <div className="lg:w-2/3 w-full bg-white p-4 shadow rounded-xl max-h-[80vh] overflow-auto">
          <h3 className="text-lg font-semibold mb-4">📁 File Explorer</h3>
          {Object.keys(documentsByFolder).length === 0 ? (
            <p className="text-gray-500">No folders created yet.</p>
          ) : (
            Object.entries(documentsByFolder).map(([folder, docs], index) => (
              <div key={index} className="mb-6">
                <h4 className="font-bold text-purple-700 mb-2">📁 {folder}</h4>
                <ul className="pl-4 space-y-2">
                  {docs.map((doc, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-50 p-3 rounded hover:bg-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">📄 {doc.title}</div>
                          <div className="text-xs text-gray-500">
                            Uploaded: {doc.dateTime}
                          </div>
                        </div>
                        <div className="space-x-2 text-sm">
                          <button
                            onClick={() => handleView(doc)}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="text-green-600 hover:underline"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Right: Upload Panel */}
        <div className="lg:w-1/3 w-full bg-white p-6 shadow rounded-xl">
          <h3 className="text-lg font-semibold mb-4">📤 Upload Panel</h3>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter folder name"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter file name"
            />
          </div>

          <button
            onClick={handlePublish}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
}
