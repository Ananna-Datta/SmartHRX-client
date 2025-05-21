import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import img from "../../../assets/home/admin.jpg";
import hr from "../../../assets/home/Hr.png";
import manager from "../../../assets/home/manager.png";
// import SectionTitle from './SectionTitle'; // Make sure this is correctly imported

const Team = () => {
  return (
    <>
      <SectionTitle subHeading="Check it out" heading="Featured Employees" />
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded shadow">
              <img src={img} alt="Team Member" className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 font-semibold">Ananna Datta</h3>
              <p className="text-sm text-gray-500">FullStack Developer</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <img src={manager} alt="Team Member" className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 font-semibold">Fahim Rahman</h3>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <img src={hr} alt="Team Member" className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 font-semibold">Nodiya Akter</h3>
              <p className="text-sm text-gray-500">HR Manager</p>
            </div>
            {/* Add more team members here if needed */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
