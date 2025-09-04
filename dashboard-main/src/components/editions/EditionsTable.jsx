import React from "react";

export default function EditionsTable({ data, onPreview }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <table className="w-full text-left">
        <thead className="text-sm text-gray-500">
          <tr>
            <th className="pb-2">Title</th>
            <th className="pb-2">Published</th>
            <th className="pb-2">Access</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ed => (
            <tr key={ed.id} className="border-t">
              <td className="py-3">{ed.title}</td>
              <td className="py-3">{ed.published}</td>
              <td className="py-3">{ed.access || "All"}</td>
              <td className="py-3">
                <button onClick={() => onPreview(ed)} className="text-sm text-blue-600 mr-3">Preview</button>
                <button className="text-sm text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
