export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-neutral-300">
      <span className="h-2 w-2 animate-ping rounded-full bg-white" />
      {label}
    </div>
  );
}