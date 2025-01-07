import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const CategoryUpdateForm = ({ categories, setCategories }) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const initialState = {
    name: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/${id}`)
        setFormValues(response.data)
      } catch (error) {
        console.error('Error fetching transaction:', error)
      }
    }

    fetchCategory()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(
        `${BASE_URL}/categories/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setCategories(
        categories.map((category) =>
          category._id === id ? response.data : category
        )
      )
      navigate('/categorylist')
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <div className="container">
      <h1>Update Category</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/categorylist')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategoryUpdateForm
