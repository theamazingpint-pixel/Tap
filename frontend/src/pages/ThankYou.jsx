export default function ThankYou() {
  return (
    <div className="w-[100vw] h-[100vh] grid place-items-start bg-neutral-950 text-white">
      <div className="max-w-[100vw] text-center">
        <img src="/Thankyoupage.webp" alt="Thank You" className="hidden md:block md:w-[100vw] md:h-[100vh]" />
        <img src="/Thankyoupagemobile.webp" alt="Thank You" className="block md:hidden h-[95vh] w-[100vw] object-fit center-center" />
      </div>
    </div>
  );
}