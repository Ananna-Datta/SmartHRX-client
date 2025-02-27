import React from "react";

const Services = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          We offer a wide range of professional services to help your business grow.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Employee Management</h3>
            <p className="text-gray-600 mb-4">
              Streamline your employee data and improve workforce management with our easy-to-use HR tools.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Track employee attendance</li>
              <li>Manage payroll</li>
              <li>Generate reports</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recruitment Services</h3>
            <p className="text-gray-600 mb-4">
              We assist companies in finding the right talent for the job with a seamless recruitment process.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Job postings & candidate sourcing</li>
              <li>Resume screening</li>
              <li>Interview coordination</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Training & Development</h3>
            <p className="text-gray-600 mb-4">
              Empower your employees with skill-building and career development programs tailored to your needs.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Leadership training</li>
              <li>Team-building workshops</li>
              <li>Compliance and skill development courses</li>
            </ul>
          </div>
          
          {/* Service 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payroll & Benefits</h3>
            <p className="text-gray-600 mb-4">
              Take the hassle out of payroll management and ensure your employees receive accurate and timely payments.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Automated payroll processing</li>
              <li>Tax compliance</li>
              <li>Employee benefit management</li>
            </ul>
          </div>
          
          {/* Service 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Performance Management</h3>
            <p className="text-gray-600 mb-4">
              Optimize employee performance with goal tracking, feedback systems, and performance evaluations.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>Goal setting and tracking</li>
              <li>Continuous feedback loops</li>
              <li>Performance reviews and appraisals</li>
            </ul>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">HR Consulting</h3>
            <p className="text-gray-600 mb-4">
              Receive expert advice on HR best practices, compliance, and workforce strategies to enhance your business operations.
            </p>
            <ul className="list-inside list-disc text-gray-600">
              <li>HR policy development</li>
              <li>Employee relations guidance</li>
              <li>Compliance auditing</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
