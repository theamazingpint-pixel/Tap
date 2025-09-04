import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataSets = {
  subscribers: [
    { date: "01 Jun", value: 3 },
    { date: "02 Jun", value: 4 },
    { date: "03 Jun", value: 5 },
    { date: "04 Jun", value: 5 },
    { date: "05 Jun", value: 6 },
    { date: "06 Jun", value: 7 },
    { date: "07 Jun", value: 5 },
  ],
  editions: [
    { date: "01 Jun", value: 1 },
    { date: "02 Jun", value: 1 },
    { date: "03 Jun", value: 2 },
    { date: "04 Jun", value: 2 },
    { date: "05 Jun", value: 3 },
    { date: "06 Jun", value: 3 },
    { date: "07 Jun", value: 3 },
  ],
  recentSubscriptions: [
    { date: "01 Jun", value: 1 },
    { date: "02 Jun", value: 2 },
    { date: "03 Jun", value: 2 },
    { date: "04 Jun", value: 3 },
    { date: "05 Jun", value: 4 },
    { date: "06 Jun", value: 5 },
    { date: "07 Jun", value: 5 },
  ],
};

export default function MetricChart({ selectedMetric }) {
  const data = dataSets[selectedMetric] || [];

  const titles = {
    subscribers: "Subscribers Trend",
    editions: "Editions Trend",
    recentSubscriptions: "Recent Subscriptions Trend",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">
        {titles[selectedMetric] || "Metric Trend"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
