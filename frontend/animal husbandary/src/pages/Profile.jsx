// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get user info from localStorage
//   useEffect(() => {
//     const userFromStorage = JSON.parse(localStorage.getItem("user"));
//     setUser(userFromStorage);

//     if (userFromStorage) {
//       fetchAppointments(userFromStorage._id);
//     }
//   }, []);

//   const fetchAppointments = async (userId) => {
//     try {
//       const response = await axios.get("/appointment/history", {
//         headers: { id: userId }
//       });
//       setAppointments(response.data.appointments || []);
//     } catch (error) {
//       console.error("Failed to fetch appointments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   if (!user) return <p className="text-center mt-10">Please log in to view your profile.</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>

//       <div className="mb-6 space-y-2">
//         <p><strong>Name:</strong> {user.lastname}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="mb-10 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//       >
//         Logout
//       </button>

//       <h2 className="text-2xl font-semibold mb-4 text-gray-700">Appointment History</h2>

//       {loading ? (
//         <p>Loading appointments...</p>
//       ) : appointments.length === 0 ? (
//         <p className="text-gray-500">No appointment history found.</p>
//       ) : (
//         <div className="space-y-4">
//           {appointments.map((appointment, index) => (
//             <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
//               <p><strong>Date:</strong> {appointment.appointment_date}</p>
//               <p><strong>Reason:</strong> {appointment.reason}</p>
//               <p><strong>Animal Name:</strong> {appointment.animalname}</p>
//               <p><strong>Status:</strong> 
//                 <span className={`ml-2 font-medium ${appointment.status === 'Booked' ? 'text-blue-600' : 'text-green-600'}`}>
//                   {appointment.status}
//                 </span>
//               </p>
//               <p><strong>Location:</strong> {appointment.village}, {appointment.taluka}, {appointment.district}, {appointment.state}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
  const [aptData, setAptData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

  // Get user id and token from localStorage
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
  if (userFromStorage) setUser(userFromStorage);
  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:8080/api/v1/appointment/history/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAptData(response.data.appointments || []);
      console.log("Appointments:", response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAptData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);




  return (
    <div className="profile-container">
 {user && (
    <div className="user-info">
      <img
        src={user.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + user.lastname}
        alt="User Avatar"
        className="avatar"
      />
      <div>
        <h2 className="user-name">{user.lastname}</h2>
        <p className="user-email">{user.email}</p>
        <p className='user-email'>Role:{user.role}</p>
        
      </div>
    </div>
  )}

  <h1 className="profile-heading">Your Appointment History</h1>

  {loading ? (
    <p className="loading-text">Loading appointments...</p>
  ) : aptData.length > 0 ? (
    <div className="overflow-x-auto">
      <div className="appointment-table-header">
        <div>#</div>
        <div>Reason</div>
        <div>Animal Name</div>
        <div>Status</div>
        <div>Date</div>
        <div>Location</div>
      </div>

      {aptData.map((item, index) => (
        <div key={index} className="appointment-row">
          <div>{index + 1}</div>
          <div>{item.reason}</div>
          <div>{item.animalname}</div>
          <div>
            <span
              className={`status-badge ${
                item.status === "Booked" ? "status-booked" : "status-other"
              }`}
            >
              {item.status}
            </span>
          </div>
          <div>{new Date(item.appointment_date).toLocaleDateString()}</div>
          <div className="capitalize">
            {`${item.village}, ${item.taluka}, ${item.district}`}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-data-text">No appointment history found.</p>
  )}
</div>

  );
};

export default Profile;
