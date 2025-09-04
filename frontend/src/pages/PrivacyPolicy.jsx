import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  // Data with nested subpoints handled as arrays
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and billing details provided during subscription.",
        "Payment Information: Processed securely by our payment partner (Razorpay). We do not store sensitive card or UPI data on our servers.",
        "Account Information: Login credentials, subscription plan details, preferences.",
        "Technical Data: Browser type, IP address, device information, and cookies for improving user experience.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Creating and managing your account.",
        "Processing subscription payments and renewals.",
        "Providing access to e-magazine content.",
        "Sending important updates (renewal reminders, service notifications, newsletters).",
        "Improving website functionality and content.",
        "Legal compliance and fraud prevention.",
      ],
    },
    {
      title: "3. Data Sharing & Disclosure",
      content: [
        "We do not sell, rent, or trade your personal data to third parties.",
        "We may share limited data with:",
        [
          "Payment processors (e.g., Razorpay) for billing.",
          "Service providers (hosting, email delivery, analytics) strictly for operating the Services.",
          "Legal authorities if required by law.",
        ],
      ],
    },
    {
      title: "4. Cookies & Tracking",
      content: [
        "We may use cookies or similar technologies to enhance your browsing experience.",
        "You can disable cookies in your browser, but some features may not work properly.",
      ],
    },
    {
      title: "5. Data Retention",
      content: [
        "We retain your account and transaction records for as long as required to provide Services and comply with legal obligations.",
        "You may request deletion of your personal data by contacting us, subject to applicable retention laws.",
      ],
    },
    {
      title: "6. Security",
      content: [
        "We take reasonable technical and organizational measures to protect your personal data.",
        "However, no system is 100% secure. We cannot guarantee absolute security of your information.",
      ],
    },
    {
      title: "7. Your Rights",
      content: [
        "Depending on your jurisdiction, you may have the right to:",
        [
          "Access, update, or delete your personal data.",
          "Opt out of marketing emails (unsubscribe link provided in all emails).",
          "Request clarification on how your data is used.",
        ],
      ],
    },
    {
      title: "8. Third-Party Links",
      content: [
        "Our website may contain links to third-party websites.",
        "We are not responsible for their privacy practices. Please review their policies before providing personal data.",
      ],
    },
    {
      title: "9. Children’s Privacy",
      content: [
        "Our Services are intended for readers aged 25 years and above.",
        "We do not knowingly collect information from individuals below this age.",
      ],
    },
    {
      title: "10. Updates to Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time.",
        "The “Last Updated” date will reflect the latest changes.",
        "Continued use of our Services after updates means you accept the revised policy.",
      ],
    },
    {
      title: "11. Contact Us",
      content: ["📧 Email: theamazingpint@gmail.com", "📞 Phone/WhatsApp: +91-9156236277"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="w-[100%] h-24 bg-[#960000] mb-8 flex justify-center items-center">
        <Link to="/">
          <img className="w-[100px]" src="/Taplogo.png" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-[95%] mb-8 bg-white shadow-lg rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Privacy Policy — <span className="text-[#ffe101]">TAP</span> (The Amazing Pint)
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          <span className="font-medium">Effective Date:</span> August 23, 2025 <br />
          <span className="font-medium">Last Updated:</span> August 20, 2025
        </p>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">TAP (The Amazing Pint)</span>, we value your trust and
          are committed to protecting your privacy. This Privacy Policy explains how we collect,
          use, and safeguard your personal information when you use our website and digital
          services. By using our Services, you agree to the practices described in this Privacy
          Policy.
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.content.map((line, i) =>
                  Array.isArray(line) ? (
                    <ul key={i} className="list-circle list-inside ml-6 space-y-1">
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

export default PrivacyPolicy;
