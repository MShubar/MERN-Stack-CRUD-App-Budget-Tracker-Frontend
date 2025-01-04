import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const initialFormData = {
  username: '',
  password: ''
}
const Signin = ({ onLogin }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //console.log(`${BASE_URL}/users/signin`)
      const response = await axios.post(`${BASE_URL}/users/signin`, formData)
      const token = response.data.token
      localStorage.setItem('token', token)
      onLogin()
      navigate('/transactionlist')
      setFormData(initialFormData)
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <main>
      <h1>Log In</h1>
      <p style={{ color: 'red' }}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <section>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </section>
      </form>
    </main>
  )
}

export default Signin
