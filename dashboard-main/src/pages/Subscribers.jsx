import React, { useState } from "react";
import SubscribersTable from "../components/subscribers/SubscribersTable";
import AddSubscriberModal from "../components/subscribers/AddSubscriberModal";
import { subscribers as initial } from "../data/subscribers";

export default function Subscribers() {
  const [data, setData] = useState(initial);
  const [open, setOpen] = useState(false);

  function addSubscriber(sub) {
    sub.id = Date.now();
    setData((prev) => [sub, ...prev]);
    setOpen(false);
  }

  function updateStatus(id, status) {
    setData((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Subscribers</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Add Subscriber
        </button>
      </div>

      <div className="overflow-x-auto">
        <SubscribersTable data={data} onChangeStatus={updateStatus} />
      </div>

      {open && <AddSubscriberModal onClose={() => setOpen(false)} onAdd={addSubscriber} />}
    </div>
  );
}
