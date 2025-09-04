import { useState } from "react";
import Banner from "../components/Banner";
import SubscribeModal from "../components/SubscribeModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Banner onSubscribe={() => setOpen(true)} />
      <SubscribeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
