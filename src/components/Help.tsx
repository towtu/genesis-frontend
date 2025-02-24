import Sidebar from "./Sidebar";
import React from "react";

const Help: React.FC = () => {
  const faqs = [
    {
      question: "How do I create a new todo?",
      answer: "Go to the Todos page and click the 'New Task' button.",
    },
    {
      question: "How do I mark a todo as completed?",
      answer: "Click the checkbox next to the todo in the Todos page.",
    },
    {
      question: "How do I edit my profile?",
      answer: "Go to the Account page and click the 'Edit Profile' button.",
    },
  ];

  return (
    <div className="flex">
    <Sidebar />
        <div className="flex min-h-screen">
        <div className="flex-1 p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Help</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Help;