import React, { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

export default function SubscribersTable() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  // 1️⃣ Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const json = await res.json();
        setData(json.items || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  // 2️⃣ Filter logic
  const filtered = useMemo(() => {
    return data.filter((u) => {
      const status = u.isSubscribed ? "active" : "expired";
      if (filter !== "all" && status !== filter) return false;
      if (!q) return true;
      return `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase());
    });
  }, [data, q, filter]);

  // 3️⃣ Handle status update
  const handleStatusChange = async (id, toStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          isSubscribed: toStatus === "active",
          subscriptionEnd: toStatus === "active" ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null,
        }),
      });

      const updated = await res.json();
      if (res.ok) {
        setData((prev) =>
          prev.map((u) => (u._id === updated._id ? { ...u, ...updated } : u))
        );
      } else {
        alert(updated?.msg || "Error updating subscription");
      }
    } catch (err) {
      console.error("Status change failed", err);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full overflow-x-auto">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Left Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          <input
            className="border rounded-md px-3 py-2 w-full sm:w-64"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or email"
          />
          <select
            className="border rounded-md px-3 py-2 w-full sm:w-40"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Export CSV */}
        <div className="flex justify-end">
          <CSVLink
            data={filtered}
            filename={"subscribers.csv"}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md text-sm"
          >
            <Download size={14} /> Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Subscription</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="py-3 pr-4">{u.name}</td>
                <td className="py-3 pr-4">{u.email}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      u.isSubscribed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.isSubscribed ? "active" : "expired"}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  {u.subscriptionAt
                    ? new Date(u.subscriptionAt).toLocaleDateString()
                    : "-"}{" "}
                  →{" "}
                  {u.subscriptionEnd
                    ? new Date(u.subscriptionEnd).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 pr-4">
                  {u.isSubscribed ? (
                    <button
                      onClick={() => handleStatusChange(u._id, "expired")}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(u._id, "active")}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Renew
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
