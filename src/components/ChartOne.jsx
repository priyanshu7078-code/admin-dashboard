import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mar '24", EmailDetails: 0, outboundcalls: 0 },
  { name: "Jun '25", EmailDetails: 0, outboundcalls: 0 },
];

const ChartOne = () => (
  <div className="bg-white p-5 rounded-xl shadow min-w-0 w-full">
    <p className="font-medium text-sm mb-4">Report</p>
    
    {/* Height: 300px (mobile), 400px (tablet), 500px (desktop) */}
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="EmailDetails" stroke="#1E90FF" />
          <Line type="monotone" dataKey="outboundcalls" stroke="#00C49F" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ChartOne;
