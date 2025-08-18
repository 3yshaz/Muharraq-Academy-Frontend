import { useEffect, useState } from 'react';
import axios from 'axios' 


const Dashboard = ({ user }) => {

    const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/${user.role}/dashboard`, {
                headers: {
                    Authorization: `Berarer ${token}`
                }
            })
            setData(res.data)
        } catch (error) {
            console.error('Error Fetching dashboard data:', err)
            
        }
    }
    if (user?.role) fetchData()
}, [user])
if (!user) return <div className="dashboard">Loading user...</div>
if (!data) return <div className ="dashboard">Loading dashboard</div>


return (
    <div className="dashboard">
      <h2>Welcome, {user.fullName}</h2>
      <h3>Role: {user.role}</h3>

      {user.role === 'admin' ? (
        <div className="admin-section">
          <h4>Admin Dashboard</h4>
          {/* Admin-specific content */}
          <p>Total Riders: {data.totalRiders}</p>
          <p>Recent Registrations: {data.recentRegistrations}</p>
          {/*  more admin features */}
        </div>
      ) : (
        <div className="rider-section">
          <h4>Rider Dashboard</h4>
          {/*  content */}
          <p>Age: {data.age}</p>
          <p>Weight: {data.weight}</p>
          <p>Upcoming Sessions: {data.sessions?.length}</p>
          {/*  more rider  */}
        </div>
      )}
    </div>
  );
};


export default Dashboard;
