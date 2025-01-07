import { Link } from 'react-router-dom'
const Category = ({ category }) => {
  return (
    <Link to={`/categorylist/${category._id}`}>
      <div className="transaction-card" key={category._id}>
        <h2>{category.name}</h2>
      </div>
    </Link>
  )
}
export default Category
