import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    
    return (
        <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Employee Performance</h2>
        <p className="text-lg text-gray-600 mb-12">
          A summary of performance metrics, achievements, and ongoing projects.
        </p>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            {employee.name}'s Performance Overview
          </h3>

          <div className="flex justify-between mb-6">
            <div className="w-1/3">
              <p className="text-gray-600">Performance Rating:</p>
              <div className="font-bold text-xl">{employee.performanceRating} / 5</div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-600">Projects Completed:</p>
              <div className="font-bold text-xl">{employee.projectsCompleted}</div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-600">Years at Company:</p>
              <div className="font-bold text-xl">{employee.yearsAtCompany}</div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Recent Achievements:</p>
            <ul className="list-disc list-inside text-gray-800">
              {employee.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            View Detailed Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;