import StatCard from "../components/StatCard";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    leads: 0,
    contacts: 0,
    properties: 0,
    tasks: 0,
  });

  useEffect(() => {
  axios.get("http://localhost:5000/dashboard", {
    withCredentials: true,
  })
  .then((res) => {
    setCounts(res.data); // ✅ Only set the actual response data
    console.log("Dashboard Data:", res.data);
  })
  .catch((err) => {
    console.error("Error fetching dashboard data:", err.response?.data || err.message);
    
    // Optionally fallback to localStorage if API fails
    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    const properties = JSON.parse(localStorage.getItem("properties") || "[]");
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    setCounts({
      leads: leads.length,
      contacts: contacts.length,
      properties: properties.length,
      tasks: tasks.length,
    });
  });
}, []);

  return (
    <div className="space-y-8 p-4 overflow-x-hidden overflow-y-auto min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={counts.leads} color="bg-blue-500" onClick={() => navigate("/leads")} />
        <StatCard title="Total Contacts" value={counts.contacts} color="bg-purple-600" onClick={() => navigate("/contacts")} />
        <StatCard title="Total Properties" value={counts.properties} color="bg-blue-500" onClick={() => navigate("/property")} />
        <StatCard title="Total Tasks" value={counts.tasks} color="bg-purple-600" onClick={() => navigate("/tasks")} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full min-w-0">
          <ChartOne />
        </div>
        <div className="w-full min-w-0">
          <ChartTwo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
