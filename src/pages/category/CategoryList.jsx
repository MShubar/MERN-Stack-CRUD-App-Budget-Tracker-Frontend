import Category from '../../components/category'
import { NavLink } from 'react-router-dom'
const CategoryList = ({ categories }) => {
  return (
    <div>
      <h1>Categories List</h1>
      <NavLink className="addLink" to="/newcategory">
        New Category
      </NavLink>
      <section className="transaction-list">
        {categories?.map((category) => (
          <Category category={category} key={category._id} />
        ))}
      </section>
    </div>
  )
}

export default CategoryList
