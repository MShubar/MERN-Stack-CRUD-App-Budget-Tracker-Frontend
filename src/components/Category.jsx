import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
    <Link to={`/categorylist/${category._id}`} className="text-decoration-none">
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary fw-bold mb-0">
            {category.name}
          </h5>
        </div>
      </div>
    </Link>
  )
}

export default Category
