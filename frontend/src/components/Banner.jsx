export default function Banner({ onSubscribe }) {
  return (
    <header className="relative isolate">
      {/* Desktop Banner */}
      <img
        src="/Tapbanner.webp"
        alt="Craft culture banner"
        className="hidden md:block h-[100vh] w-full object-cover center-center"
      />

      {/* Mobile Banner */}
      <img
        src="/Mobiletapbanner.webp"
        alt="Craft culture banner mobile"
        className="block md:hidden h-[100vh] w-full object-fit center-center"
      />

      <div className="absolute" />
      <div className="absolute bottom-[11.5%] right-[25%] md:bottom-[15%] md:right-[10%] flex justify-end text-white">
        <img
          src="/subscribenow.png"
          alt="Subscribe Now"
          onClick={onSubscribe}
          className="hidden md:block cursor-pointer w-[50%] h-auto"
        />
        <img
          src="/Mobilesubscribebtn.png"
          alt="Subscribe Now"
          onClick={onSubscribe}
          className="md:hidden cursor-pointer w-[180px] h-auto"
        />
      </div>
    </header>
  );
}
