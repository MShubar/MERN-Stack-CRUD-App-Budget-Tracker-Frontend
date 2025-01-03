import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const DeleteConfirmCategory = ({ categories, setCategories }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteCategory = async () => {
    const token = localStorage.getItem('token') // Retrieve the token from local storage
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      })
      let index = categories.findIndex((category) => category._id === id)
      setCategories(categories.toSpliced(index, 1))
      navigate('/Category/list')
    } catch (error) {
      console.error('Error updating transaction:', error)
      // Handle error (e.g., show a message to the user)
    }
  }

  return (
    <div>
      <h1>Are you sure you want to delete this transaction?</h1>
      <button onClick={() => navigate(`/Category/list/${id}`)}>No</button>
      <button onClick={deleteCategory}>Yes</button>
    </div>
  )
}

export default DeleteConfirmCategory
