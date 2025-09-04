import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Contact <span className="text-[#ffe101]">Us</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Have questions or inquiries? Fill out the form below and we’ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffe101] hover:bg-[#ffe101] text-black font-medium py-3 rounded-xl transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-gray-600">{status}</p>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Other Ways to Reach Us</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📧 Email: <a href="mailto:theamazingpint@gmail.com" className="text-[#960000] font-medium">theamazingpint@gmail.com</a></li>
            <li>📞 Phone/WhatsApp: +91-9156236277</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
