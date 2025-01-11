import Category from '../../components/category'
import { NavLink } from 'react-router-dom'

const CategoryList = ({ categories }) => {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Categories List</h1>
        <NavLink to="/newcategory" className="btn btn-success">
          New Category
        </NavLink>
      </div>
      <section className="category-list">
        <div className="row gy-3">
          {categories?.map((category) => (
            <div className="col-12" key={category._id}>
              <Category category={category} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CategoryList
