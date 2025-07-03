// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Doctordashboard = () => {
// //    const [doctor, setDoctor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchDoctor = async () => {
// //       try {
// //         const doctorId = localStorage.getItem("doctorId");

// //         if (!doctorId) {
// //           setError("Doctor ID not found in localStorage");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await axios.get("http://localhost:8080/api/v1/doctor/get-doctor-information", {
// //           headers: {
// //             id: doctorId,
// //           },
// //         });

// //         setDoctor(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error:", err);
// //         setError("Unable to fetch doctor information");
// //         setLoading(false);
// //       }
// //     };

// //     fetchDoctor();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p style={{ color: "red" }}>{error}</p>;

  
// //   return (
    
// //     <>
// //          <div style={{ padding: "2rem" }}>
// //       <h2>Doctor Profile</h2>
// //       <p><strong>Name:</strong> {doctor.name}</p>
// //       <p><strong>Email:</strong> {doctor.email}</p>
// //       <p><strong>Specialization:</strong> {doctor.specialization}</p>
// //       <p><strong>Experience:</strong> {doctor.experience} years</p>
// //       <p><strong>Phone:</strong> {doctor.phone}</p>
// //       <p><strong>Address:</strong> {doctor.address}</p>
// //     </div>

// //     </>
// //   )
// // }

// // export default Doctordashboard

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./Profile.css";

// const Doctordashboard = () => {
//   const [aptData, setAptData] = useState([]);
//   const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState(null);

//   // Get user id and token from localStorage
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };


//   // ...existing code...
//   useEffect(() => {
//     const userFromStorage = JSON.parse(localStorage.getItem("user"));
//     if (userFromStorage) setUser(userFromStorage);

//     const fetchAppointments = async () => {
//       try {
//         const doctorId = localStorage.getItem("id"); // Use the doctor's id
//         const response = await axios.get(
//           `http://localhost:8080/api/v1/appointment/doctor/${doctorId}`,
//           {
//             headers: {
//               authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setAptData(response.data || []); // response.data is an array
//         console.log("Appointments:", response.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         setAptData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);





//   return (
//     <div className="profile-container">
//  {user && (
//     <div className="user-info">
//       <img
//         src={user.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + user.lastname}
//         alt="User Avatar"
//         className="avatar"
//       />
//       <div>
//         <h2 className="user-name">Dr. {user.lastname} {user.firstname}</h2>
//         <p className="user-email">{user.email}</p>
//         <p className='user-email'>Role:{user.role}</p>
        
//       </div>
//     </div>
//   )}

//   <h1 className="profile-heading"> Appointments</h1>

//   {loading ? (
//     <p className="loading-text">Loading appointments...</p>
//   ) : aptData.length > 0 ? (
//     <div className="overflow-x-auto">
//       <div className="appointment-table-header">
//         <div>#</div>
//         <div>Reason</div>
//         <div>Animal Name</div>
//         <div>Status</div>
//         <div>Date</div>
//         <div>Location</div>
//       </div>

//       {aptData.map((item, index) => (
//         <div key={index} className="appointment-row">
//           <div>{index + 1}</div>
//           <div>{item.reason}</div>
//           <div>{item.animalname}</div>
//           <div>
//             <span
//               className={`status-badge ${
//                 item.status === "Booked" ? "status-booked" : "status-other"
//               }`}
//             >
//               {item.status}
//             </span>
//           </div>
//           <div>{new Date(item.appointment_date).toLocaleDateString()}</div>
//           <div className="capitalize">
//             {`${item.village}, ${item.taluka}, ${item.district}`}
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p className="no-data-text">No appointment history found.</p>
//   )}
// </div>

//   );
// };

// export default Doctordashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Profile.css";

const Doctordashboard = () => {
  const [aptData, setAptData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) setUser(userFromStorage);

    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem("id");

        // Step 1: Get doctor ID using user ID
        const doctorRes = await axios.get(`http://localhost:8080/api/v1/doctor/get-doctor-by-user/${userId}`);
        const doctor = doctorRes.data;
        setDoctorId(doctor._id); // For debug

        // Step 2: Get appointments using doctor._id
        const appointmentRes = await axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctor._id}`);
        setAptData(appointmentRes.data || []);
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
            <h2 className="user-name">Dr. {user.lastname} {user.firstname}</h2>
            <p className="user-email">{user.email}</p>
            <p className='user-email'>Role: {user.id}</p>
          </div>
        </div>
      )}

      <h1 className="profile-heading">Appointments</h1>

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
              <div>{item.status}</div>
              <div>{new Date(item.appointment_date).toLocaleDateString()}</div>
              <div>{item.village}, {item.taluka}, {item.district}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data-text">No appointments found.</p>
      )}
    </div>
  );
};

export default Doctordashboard;
