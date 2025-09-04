import React from "react";

export default function PreviewEditionModal({ edition, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-xl p-6 z-10 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Preview: {edition.title}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <p><strong>Published:</strong> {edition.published}</p>
          <p className="mt-3">This is a preview area. Replace with real edition content (PDF embed, images or HTML) when integrating.</p>
        </div>
      </div>
    </div>
  );
}
