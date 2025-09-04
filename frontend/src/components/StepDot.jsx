export default function StepDot({ active, label }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-black" : "bg-black/20"}`} />
      <span className={active ? "text-black" : "text-neutral-500"}>{label}</span>
    </div>
  );
}