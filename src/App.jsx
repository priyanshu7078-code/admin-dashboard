import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadManagement from "./pages/LeadManagement";
import LeadDetails from "./pages/LeadDetails";
import ContactManagement from "./pages/ContactManagement";
import ContactDetails from "./pages/ContactDetails";
import EmployeeManagement from "./pages/EmployeeManagement";
import PropertyManagement from "./pages/PropertyManagement";
import PropertyDetails from "./pages/PropertyDetails";
import TaskManagement from "./pages/TaskManagement";
import TaskDetails from "./pages/TaskDetails";
import MeetingManagement from "./pages/MeetingManagement";
import MeetingDetails from "./pages/MeetingDetails";
import CallManagement from "./pages/CallManagement";
import CallDetails from "./pages/CallDetails";
import EmailManagement from "./pages/EmailManagement";
import EmailDetails from "./pages/EmailDetails";
import CalendarPage from "./pages/CalendarPage";
import ManageAdminsPage from "./pages/ManageAdmins";
import ManageManagersPage from "./pages/ManageManagers"; 
import DocumentsManagement from "./pages/DocumentManagement";
import PrivateRoute from "./components/PrivateRoute";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const Layout = () => (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Topbar onMenuClick={toggleSidebar} />
      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <div
          className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <main className="p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<LeadManagement />} />
              <Route path="/lead/:id" element={<LeadDetails />} />
              <Route path="/contacts" element={<ContactManagement />} />
              <Route path="/contact/:id" element={<ContactDetails />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/property" element={<PropertyManagement />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/tasks" element={<TaskManagement />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/meeting" element={<MeetingManagement />} />
              <Route path="/meeting/:id" element={<MeetingDetails />} />
              <Route path="/calls" element={<CallManagement />} />
              <Route path="/call/:id" element={<CallDetails />} />
              <Route path="/emails" element={<EmailManagement />} />
              <Route path="/emails/:id" element={<EmailDetails />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/documents" element={<DocumentsManagement />} />

              <Route path="/manage-admins" element={<ManageAdminsPage />} />
              <Route path="/manage-managers" element={<ManageManagersPage />} />
              
              <Route path="/profile-settings" element={<ProfileSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Layout + Routes */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
