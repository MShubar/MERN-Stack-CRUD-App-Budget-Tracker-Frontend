import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialFormData = {
  username: '',
  password: '',
  passwordConf: '',
  phoneNumber: ''
}
const Signup = () => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    setFormData(initialFormData)
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.password === formData.passwordConf &&
      formData.phoneNumber
    )
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p style={{ color: 'red' }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="password"
            id="phoneNumber"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <section>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </section>
      </form>
    </main>
  )
}

export default Signup
