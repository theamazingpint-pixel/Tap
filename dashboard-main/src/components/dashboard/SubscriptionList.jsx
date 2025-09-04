import React, { useEffect, useState } from "react";

export default function SubscriptionList({ title = "Recent Subscribers" }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users?limit=6", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        if (res.ok) setUsers(data.items);
        else console.error("Error:", data.msg);
      } catch (err) {
        console.error("Network error:", err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <div className="font-medium">{u.name || "Unnamed"}</div>
              <div className="text-xs text-gray-500">{u.email}</div>
            </div>
            <div className={`text-sm font-medium ${u.isSubscribed ? "text-green-600" : "text-red-600"}`}>
              {u.isSubscribed ? "active" : "inactive"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
