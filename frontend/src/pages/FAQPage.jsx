import React, { useState } from "react";
import Title from "../component/Title";
import Footer from "./Footer";

const FAQPage = () => {
  const faqs = [
    {
      question: "How can I place an order?",
      answer: "You can place an order by visiting the 'Order' page, selecting your items, and completing the checkout process."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, UPI, and net banking for payments."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is confirmed, you will receive a tracking link via email."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, orders can be cancelled within 24 hours of placing them by contacting support."
    },
    {
      question: "Who can I contact for support?",
      answer: "You can reach out via email at support@varuno.qzz.io or call us at +91 6397011309."
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 ">
        <Title text1="FREQUENTLY" text2="ASKED QUESTIONS" className="mb-10 text-3xl md:text-4xl" />

        <div className="space-y-5 py-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-gray-400">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-800 text-gray-300 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;