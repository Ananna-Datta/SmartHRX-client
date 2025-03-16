
import useAuth from '../../../hooks/useAuth'
import admin from '../../../assets/home/admin.jpg'

const AdminHome = () => {
    const { user } = useAuth();
    console.log(user);
  
    return (
        <div className="min-h-screen bg-gray-50 p-8">
          {/* Image & Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6 mb-8">
            {/* Image */}
            <img
              src={user?.photoURL || admin}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
    
            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.displayName || "Ananna Datta"}</h2>
              <p className="text-lg text-gray-600">{user?.email || "admin@example.com"}</p>
              <p className="text-md text-gray-500 mt-2">
                {user?.bio || "I am a web developer, focusing on creating secure, user-friendly systems."}
              </p>
            </div>
          </div>
    
          {/* Admin Dashboard Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">
              Welcome to the Admin dashboard, where you can manage all users and monitor key activities.
            </p>
          </div>
    
          {/* Quick Stats Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl font-bold text-indigo-600">250</div>
              <div className="text-xl text-gray-700">Total Employees</div>
            </div>
    
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl font-bold text-indigo-600">45</div>
              <div className="text-xl text-gray-700">Active Employees</div>
            </div>
    
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl font-bold text-indigo-600">5</div>
              <div className="text-xl text-gray-700">Pending Approvals</div>
            </div>
          </div>
    
          {/* Latest Activities Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Activities</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                <span className="text-gray-700">John Doe added a new employee</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                <span className="text-gray-700">Jane Smith updated her profile</span>
                <span className="text-gray-500 text-sm">5 hours ago</span>
              </li>
              <li className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                <span className="text-gray-700">David Lee requested a leave</span>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </li>
            </ul>
          </div>
        </div>
      );
    };
    
    export default AdminHome;