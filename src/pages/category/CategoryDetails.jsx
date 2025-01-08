import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const CategoryDetails = ({ categories }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState({})
  useEffect(() => {
    const getCategory = () => {
      const singleCategory = categories.find((category) => {
        return category._id === id
      })
      setCategory(singleCategory)
    }
    getCategory()
  }, [categories])
  return (
    <div>
      {category ? (
        <>
          <h1>category Details</h1>
          <section className="transaction-details">
            <h2>category Name: {category.name}</h2>

            <button onClick={() => navigate(`/categoryupdate/${category._id}`)}>
              Update Category
            </button>
            <button onClick={() => navigate(`/categorydelete/${category._id}`)}>
              Delete Category
            </button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
export default CategoryDetails
