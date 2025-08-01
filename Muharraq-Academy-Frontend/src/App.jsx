import { Routes, Route } from 'react-router-dom'
import './Styles.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import RiderDashboard from './pages/RiderDashboard'
import AdminDashboard from './pages/AdminDashboard'
import RiderPackage from './pages/RiderPackage'
import RiderProfile from './pages/RiderProfile'
import RiderHorses from './pages/RiderHorses'
import RiderAttendance from './pages/RiderAttendance'
import AddPackage from './pages/AddPackage'
import EditPackage from './pages/EditPackage'

const App = () => {
  return ( 
     
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path= '/Signup' element={<Signup />} />
      <Route path= '/dashboard' element={<Dashboard/>} />
      <Route path= '/rider-dashboard' element={<RiderDashboard />} />
      <Route path= '/admin-dashboard' element={<AdminDashboard />} />
      <Route path= '/rider-package' element={<RiderPackage />} />
      <Route path= '/rider-profile' element={<RiderProfile />} />
      <Route path= '/rider-horses' element={<RiderHorses />} />
      <Route path= '/rider-attendance' element={<RiderAttendance />} />
      <Route path= '/admin/packages/new' element={<AddPackage />} />
      <Route path= '/admin/packages/edit/:id' element={<EditPackage />} />
    </Routes>

  )

}

export default App;
