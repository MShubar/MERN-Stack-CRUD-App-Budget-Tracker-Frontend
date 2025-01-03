import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const DeleteConfirmCategory = ({ categories, setCategories }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteCategory = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let index = categories.findIndex((category) => category._id === id)
      setCategories(categories.toSpliced(index, 1))
      navigate('/Category/list')
    } catch (error) {
      console.error('Error updating transaction:', error)
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
