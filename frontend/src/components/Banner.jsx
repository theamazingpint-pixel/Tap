export default function Banner({ onSubscribe }) {
  return (
    <header className="relative isolate">
      {/* Desktop Banner */}
      <img
        src="/Tapbanner.webp"
        alt="Craft culture banner"
        onClick={onSubscribe}
        className="hidden md:block h-[100vh] w-full object-cover center-center"
      />

      {/* Mobile Banner */}
      <img
        src="/Mobiletapbanner.webp"
        alt="Craft culture banner mobile"
        onClick={onSubscribe}
        className="block md:hidden h-[100vh] w-full object-fit center-center"
      />

     
    </header>
  );
}
