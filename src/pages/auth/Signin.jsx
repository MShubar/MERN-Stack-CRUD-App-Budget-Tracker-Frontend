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
      localStorage.setItem('userId', response.data.user._id)
      onLogin()
      navigate('/transactionlist')

      setFormData(initialFormData)
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Log In</h1>
      {message && <p className="text-danger text-center">{message}</p>}
      <form autoComplete="off" onSubmit={handleSubmit} className="mx-auto w-50">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="form-control border border-success rounded-3 shadow-sm"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="form-control border border-success rounded-3 shadow-sm"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">
            Log In
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signin
