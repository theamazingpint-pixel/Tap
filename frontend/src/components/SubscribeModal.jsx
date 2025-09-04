import { useEffect, useState } from "react";
import StepDot from "./StepDot";
import Loader from "./Loader";
import { SummaryApi } from "../services/SummaryApi";
import { loadRazorpay, openRazorpaySubscription } from "../utils/razorpay";
import { useAuth } from "../context/AuthContext";

const PLAN_ID = import.meta.env.VITE_RAZORPAY_PLAN_ID;

export default function SubscribeModal({ open, onClose }) {
  const { setToken, setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail("");
      setPassword("");
      setError("");
      loadRazorpay().catch(() => { });
    }
  }, [open]);

  if (!open) return null;

  const onNextFromEmail = (e) => {
    e.preventDefault();
    setError("");
    const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    if (!ok) return setError("Please enter a valid email address.");
    setStep(2);
  };

  const onSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (!PLAN_ID) return setError("Missing VITE_RAZORPAY_PLAN_ID in frontend .env");

    setLoading(true);
    try {
      // 1) Signup (no Razorpay here)
      const signup = await SummaryApi.signup(email, password);
      if (signup?.token) {
        localStorage.setItem("auth_token", signup.token);
        setToken(signup.token);
      }
      if (signup?.user) {
        localStorage.setItem("auth_user", JSON.stringify(signup.user));
        setUser(signup.user);
      }

      // 2) Create subscription (protected route)
      const sub = await SummaryApi.createSubscription(PLAN_ID);
      const subscription_id = sub?.id || sub?.subscription?.id || sub?.razorpay_subscription_id;
      if (!subscription_id) throw new Error("No subscription id returned by server");

      const keyFromServer = sub?.key;
      console.log("RZP key (server):", keyFromServer);
      console.log("RZP key (env):", import.meta.env.VITE_RAZORPAY_KEY_ID);

      // 3) Open Razorpay subscription checkout
      await openRazorpaySubscription({
        keyOverride: keyFromServer,
        subscription_id,
        email,
        onDismiss: () => console.log("Checkout dismissed"),
        onSuccess: async (res) => {
          await SummaryApi.verifySubscription({
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_subscription_id: res.razorpay_subscription_id,
            razorpay_signature: res.razorpay_signature,
          });
          window.location.href = "/thank-you";
        },
      });

      onClose?.();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal>
      <div className="w-full md:max-w-[45%] rounded-3xl bg-white p-6 shadow-2xl border border-white/10 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Start your subscription</h2>
          <button onClick={() => !loading && onClose()} className="rounded-full text-black p-2 hover:bg-white/10" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mt-4 mb-6 flex items-center gap-3 text-xs text-neutral-400">
          <StepDot active={step >= 1} label="Email"/>
          <div className="h-px flex-1 bg-black/10" />
          <StepDot active={step >= 2} label="Create Password" />
          <div className="h-px flex-1 bg-black/10" />
          <StepDot active={false} label="Checkout" />
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={onNextFromEmail} className="space-y-4">
            <label className="block text-sm text-black">
              Email
              <input
                type="email"
                className="mt-1 w-full text-white/60 rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none focus:border-white/30"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="w-full rounded-xl bg-neutral-200 px-4 py-3 font-semibold text-neutral-900 hover:bg-neutral-100">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onSignup} className="space-y-4">
            <label className="block text-sm">
              Create a password
              <input
                type="password"
                className="mt-1 w-full text-white/60 rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 outline-none focus:border-white/30"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-neutral-200 px-4 py-3 font-semibold text-neutral-900 hover:bg-neutral-100 disabled:opacity-50"
            >
              {loading ? <Loader label="Creating account…" /> : "Create account & Pay"}
            </button>
            <p className="text-[11px] text-black text-center">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
