import React from "react";
import { Link } from "react-router-dom";

const RefundCancellationPolicy = () => {
  const sections = [
    {
      title: "1. Subscription Payments",
      content: [
        "All subscription fees (6-month or 12-month plans) are charged securely via our payment partners.",
        "By subscribing, you authorize us to charge your selected payment method on a recurring basis until cancelled.",
      ],
    },
    {
      title: "2. Refund Policy",
      content: [
        "All payments are final and strictly non-refundable.",
        "We do not issue refunds for:",
        [
          "Partial subscription periods",
          "Early cancellations",
          "Unused access",
          "Accidental or mistaken purchases",
        ],
      ],
    },
    {
      title: "3. Cancellation of Subscription",
      content: [
        "You may cancel your subscription at any time through your account dashboard or by contacting our support team.",
        "Cancelling your subscription will stop future auto-renewals.",
        "Your access will remain active until the end of the current paid term (no refunds for unused days/months).",
      ],
    },
    {
      title: "4. Failed Payments",
      content: [
        "If a renewal payment fails, we may retry the payment.",
        "If payment cannot be completed, your subscription access may be suspended until a successful payment is made.",
      ],
    },
    {
      title: "5. Changes to Policy",
      content: [
        "We may update this Refund & Cancellation Policy at any time.",
        "The “Last Updated” date will reflect the latest changes.",
        "Continued use of the Services after updates means you accept the revised policy.",
      ],
    },
    {
      title: "6. Contact Us",
      content: [
        "📧 Email: theamazingpint@gmail.com",
        "📞 Phone/WhatsApp: +91-9156236277",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-[100%] h-24 bg-[#960000] mb-8 flex justify-center items-center">
        <Link to="/">
          <img className="w-[100px]" src="/Taplogo.png" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-[95%] mb-8 bg-white shadow-lg rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Refund & Cancellation Policy —{" "}
          <span className="text-[#ffe101]">TAP</span> (The Amazing Pint)
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          <span className="font-medium">Effective Date:</span> August 23, 2025 <br />
          <span className="font-medium">Last Updated:</span> August 20, 2025
        </p>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">TAP (The Amazing Pint)</span>, we
          value our subscribers and strive to provide a smooth experience. Please
          read our Refund & Cancellation Policy carefully before subscribing.
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.content.map((line, i) =>
                  Array.isArray(line) ? (
                    <ul
                      key={i}
                      className="list-circle list-inside ml-6 space-y-1"
                    >
                      {line.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  ) : (
                    <li key={i}>{line}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundCancellationPolicy;
