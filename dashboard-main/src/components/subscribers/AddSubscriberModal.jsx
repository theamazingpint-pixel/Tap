import React, { useState } from "react";

export default function AddSubscriberModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", status: "active", start: "", end: "" });

  function submit(e) {
    e.preventDefault();
    onAdd(form);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-xl p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Add Subscriber</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="w-full border rounded p-2" />
          <input required placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} className="w-full border rounded p-2" />
          <div className="flex gap-2">
            <input required placeholder="Start (YYYY-MM-DD)" value={form.start} onChange={e => setForm({...form,start:e.target.value})} className="w-1/2 border rounded p-2" />
            <input required placeholder="End (YYYY-MM-DD)" value={form.end} onChange={e => setForm({...form,end:e.target.value})} className="w-1/2 border rounded p-2" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
