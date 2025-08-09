import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../Styles.css'
import '../Footer.css'
import axios from 'axios' 
import Footer from '../components/Footer'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('')
    console.log({ email, password})

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password,
      })

      const { token, role, user } = response.data


      localStorage.setItem('token', token)
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user))


      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'rider') {
        navigate('/rider-dashboard');
      } else {
        navigate('/dashboard');
      }
    
} catch (err)  {
        console.error(err.response?.data || err.message)

        setError(err.response.data.message || 'An error occurred. Please try again.')

    }
}

  return (
    <div className="login-container">

        <div className='login-logo-container'>
          <img src='/images/Logo.jpg' alt='Academy Logo' className='login-logo'/>
          <p className='login-logo-name'>Muharraq Equestrian Academy</p>

        </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <Footer/>
    </div>
  );
};


export default Login;
