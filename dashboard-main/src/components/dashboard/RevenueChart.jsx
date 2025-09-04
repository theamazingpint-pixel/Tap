import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "01 Jun", revenue: 250 },
  { name: "02 Jun", revenue: 320 },
  { name: "03 Jun", revenue: 300 },
  { name: "04 Jun", revenue: 360 },
  { name: "05 Jun", revenue: 340 },
  { name: "06 Jun", revenue: 430 },
  { name: "07 Jun", revenue: 370 },
  { name: "08 Jun", revenue: 460 },
  { name: "09 Jun", revenue: 400 },
  { name: "10 Jun", revenue: 480 },
  { name: "11 Jun", revenue: 310 },
  { name: "12 Jun", revenue: 580 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-lg font-semibold mb-4">Revenue (last 12 days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
