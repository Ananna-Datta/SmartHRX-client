import React from 'react';

const FAQ = () => {
    return (
        <section className="py-10">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">How can I reset my password?</summary>
          <p className="mt-2">Go to the login page and click on “Forgot Password?” to receive a reset link in your email.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">How do I view my salary details?</summary>
          <p className="mt-2">Navigate to the dashboard and select the “Salary Chart” option to view your salary breakdown.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">Can I update my profile information?</summary>
          <p className="mt-2">Yes, you can update your profile from the “My Profile” section in the dashboard.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">Who can access the employee performance report?</summary>
          <p className="mt-2">HR and Admin roles can view performance reports. Employees can only view their own data.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">How is attendance tracked?</summary>
          <p className="mt-2">Attendance is automatically tracked through digital check-ins and is displayed in the attendance section.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">Can I request time off or leave?</summary>
          <p className="mt-2">Yes, employees can request leave from the “Leave Request” form in their dashboard.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">Is my data secure?</summary>
          <p className="mt-2">Absolutely. All employee data is encrypted and only accessible by authorized roles.</p>
        </details>

        <details className="bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-semibold">What happens if I forget to check in?</summary>
          <p className="mt-2">If you forget to check in, inform your HR manually so they can update the attendance record.</p>
        </details>

      </div>
    </div>
  </section>
    );
};

export default FAQ;