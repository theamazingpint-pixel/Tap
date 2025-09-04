import { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, UserPlus, Download } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import MetricChart from "../components/dashboard/MetricChart";

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState("subscribers");
  const [selectedFilter, setSelectedFilter] = useState("monthly");
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get(`/api/admin/overview?range=${selectedFilter}`);
        setOverviewData(res.data);
      } catch (err) {
        console.error("Failed to fetch overview:", err);
      }
    };
    fetchOverview();
  }, [selectedFilter]);

  const metrics = [
    {
      key: "subscribers",
      title: "Total Subscribers",
      value: overviewData?.totalUsers ?? "-",
      subtitle: overviewData
        ? `${overviewData.activeSubscribers} active / ${overviewData.totalUsers - overviewData.activeSubscribers} inactive`
        : "",
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      change: overviewData?.changes?.newUsers?.change?.toFixed(1) ?? null,
      positive: (overviewData?.changes?.newUsers?.change ?? 0) >= 0,
    },
    {
      key: "editions",
      title: "Total Editions",
      value: 12, // Replace this with dynamic count if needed
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      change: 0,
      positive: true,
    },
    {
      key: "recent",
      title: "New Subscriptions",
      value: overviewData?.changes?.newUsers?.value ?? "-",
      icon: <UserPlus className="w-5 h-5 text-green-600" />,
      change: overviewData?.changes?.newUsers?.change?.toFixed(1) ?? null,
      positive: (overviewData?.changes?.newUsers?.change ?? 0) >= 0,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full xl:w-2/3 space-y-6">
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold">Overview</h2>
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="text-sm appearance-none px-4 py-2 bg-gray-100 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-8"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <StatCard
                  key={m.key}
                  {...m}
                  active={selectedMetric === m.key}
                  onClick={() => setSelectedMetric(m.key)}
                />
              ))}
            </div>

            {/* Chart */}
            <div className="mt-6">
             <MetricChart selectedMetric={selectedMetric} selectedRange={selectedFilter} />

            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* Payment Report */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Revenue ({selectedFilter})</p>
                <h3 className="text-2xl font-bold">
                  ₹{overviewData?.revenue?.toLocaleString() ?? "0"}
                </h3>
                <p className={`text-xs mt-1 ${overviewData?.changes?.revenue?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overviewData?.changes?.revenue?.change >= 0 ? "+" : ""}
                  {overviewData?.changes?.revenue?.change?.toFixed(1)}% from previous
                </p>
              </div>
              <button className="bg-gray-100 p-2 rounded-md">
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* Top Editions — static for now */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Top Editions</h2>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex justify-between items-center border-b pb-2 last:border-none">
                  <div>
                    <p className="font-medium text-sm">Edition #{n}</p>
                    <p className="text-xs text-gray-400">Readers: {10 * n}</p>
                  </div>
                  <span className="text-green-500 font-semibold text-sm">+{5 * n}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
