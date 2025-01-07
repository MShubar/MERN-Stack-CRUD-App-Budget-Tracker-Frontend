import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const CategoryForm = ({ categories, setCategories }) => {
  let navigate = useNavigate()
  const initialState = {
    name: ''
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`${BASE_URL}/category`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategories([...categories, response.data])
      setFormValues(initialState)
      navigate('/categorylist')
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <div className="container mt-5">
      <h1>New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.name}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormValues(initialState)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
