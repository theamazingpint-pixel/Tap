export default function CheckoutFailed() {
  return (
    <div className="min-h-screen grid place-items-center bg-neutral-950 text-white px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">Payment cancelled</h1>
        <p className="mt-3 text-neutral-300">No worries—your card wasn’t charged. You can try again anytime.</p>
        <a href="/" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-neutral-900">Back to Home</a>
      </div>
    </div>
  );
}
