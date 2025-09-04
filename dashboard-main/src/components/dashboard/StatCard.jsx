import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive,
  icon,
  subtitle,
  active,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl p-5 flex flex-col transition-all
        border shadow-sm
        ${active ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"}
        hover:shadow-md hover:border-indigo-400
      `}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full ${
            active ? "bg-indigo-100" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Change */}
      {change !== undefined && (
        <div className="flex items-center gap-1 text-sm mt-3">
          {positive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span
            className={positive ? "text-green-500 font-medium" : "text-red-500 font-medium"}
          >
            {change}%
          </span>
          <span className="text-gray-400">from last month</span>
        </div>
      )}
    </div>
  );
}
