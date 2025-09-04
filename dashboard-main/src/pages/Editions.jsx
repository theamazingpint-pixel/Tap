import React, { useState } from "react";
import EditionsTable from "../components/editions/EditionsTable";
import { editions as initial } from "../data/editions";
import AddEditionModal from "../components/editions/AddEditionModal";
import PreviewEditionModal from "../components/editions/PreviewEditionModal";

export default function Editions() {
  const [data, setData] = useState(initial);
  const [openAdd, setOpenAdd] = useState(false);
  const [preview, setPreview] = useState(null);

  function addEdition(e) {
    e.id = Date.now();
    setData((prev) => [e, ...prev]);
    setOpenAdd(false);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">Editions (E-Magazines)</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Add Edition
        </button>
      </div>

      <div className="overflow-x-auto">
        <EditionsTable data={data} onPreview={(e) => setPreview(e)} />
      </div>

      {openAdd && <AddEditionModal onClose={() => setOpenAdd(false)} onAdd={addEdition} />}
      {preview && <PreviewEditionModal edition={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
