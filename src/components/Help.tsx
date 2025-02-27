import React from "react";
import { useTheme } from "./ThemeContext"; // Import useTheme

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
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className={`flex min-h-full justify-center items-center`}>
      <div className={`p-8 rounded-lg shadow-lg w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Help Center</h2>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white'
              }`}
            >
              <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{faq.question}</h3>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
