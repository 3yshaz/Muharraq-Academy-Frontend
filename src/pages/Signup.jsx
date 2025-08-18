import '../css/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer'
import axios from 'axios';

const Signup = () => {
    
  const navigate = useNavigate()


  const [name, setFullName ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [role, setRole] = useState('rider')



  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')



  try {
    const requestDate = {
        name,
        email,
        password,
        role,
        ...(role === 'rider' && { age, weight, contactNumber}),
    }

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, requestDate)

    setSuccess(res.data.message)

    setTimeout(() => navigate('/'), 1500)
  } catch (error) {
    setError(error.response?.data?.error || 'Something went wrong :( !!!!')
  }

  }





  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="rider">Rider</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </label>

        {role === 'rider' && (
          <>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
      <Footer/>
    </div>
  );
};

export default Signup;
