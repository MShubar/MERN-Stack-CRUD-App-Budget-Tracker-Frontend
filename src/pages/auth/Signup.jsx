import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialFormData = {
  username: '',
  password: '',
  passwordConf: '',
  fullname: ''
}

const Signup = () => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add your signup logic here
    setFormData(initialFormData)
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.password === formData.passwordConf &&
      formData.fullname
    )
  }

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Sign Up</h1>
      {message && <p className="text-danger text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="mx-auto w-50">
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            name="fullname"
            onChange={handleChange}
            className="form-control border border-success rounded-3 shadow-sm"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="passwordConf" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="passwordConf"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="form-control border border-success rounded-3 shadow-sm"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  )
}

export default Signup
