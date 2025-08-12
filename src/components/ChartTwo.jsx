
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const ChartTwo = () => {
  const [chartData, setChartData] = useState([
    { name: "Lead", value: 0 },
    { name: "Contact", value: 0 },
    { name: "Property", value: 0 },
    { name: "Task", value: 0 },
    { name: "Meeting", value: 0 },
    { name: "Email", value: 0 },
    { name: "Call", value: 0 },
  ]);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard", {
  withCredentials: true,
});
      const {
        leads = 0,
        contacts = 0,
        properties = 0,
        tasks = 0,
        meetings = 0,
        emails = 0,
        calls = 0,
      } = res.data;

      setChartData([
        { name: "Lead", value: leads },
        { name: "Contact", value: contacts },
        { name: "Property", value: properties },
        { name: "Task", value: tasks },
        { name: "Meeting", value: meetings },
        { name: "Email", value: emails },
        { name: "Call", value: calls },
      ]);
    } catch (err) {
      console.error("Failed to load chart data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow min-w-0 w-full">
      <p className="font-medium text-sm mb-4">Report</p>
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 180]} /> {/* Fixed Y-axis range */}
            <Tooltip />
            <Bar dataKey="value" fill="#87CEFA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartTwo;
