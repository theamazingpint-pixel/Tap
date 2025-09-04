import React, { useState } from "react";

export default function AddEditionModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", published: "", access: "" });

  function submit(e) {
    e.preventDefault();
    onAdd(form);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-xl p-6 z-10 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Add Edition</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Title" value={form.title} onChange={e => setForm({...form,title:e.target.value})} className="w-full border rounded p-2" />
          <input required placeholder="Published (YYYY-MM-DD)" value={form.published} onChange={e => setForm({...form,published:e.target.value})} className="w-full border rounded p-2" />
          <input placeholder="Access (optional, comma separated subscriber emails or 'all')" value={form.access} onChange={e => setForm({...form,access:e.target.value})} className="w-full border rounded p-2" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
