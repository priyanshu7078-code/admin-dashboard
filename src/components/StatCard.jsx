import { FaChartBar } from "react-icons/fa";

const StatCard = ({ title, value, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl text-white p-5 shadow-md ${color} min-h-[150px] flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform`}
    >
      <div className="text-4xl font-bold flex items-center gap-2">
        {value}
        <FaChartBar className="text-white text-2xl" />
      </div>
      <p className="text-sm mt-3 font-bold text-center">{title}</p>
    </div>
  );
};

export default StatCard;
