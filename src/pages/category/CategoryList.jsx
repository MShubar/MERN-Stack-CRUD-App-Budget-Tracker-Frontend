import { useState, useEffect } from 'react';  
import axios from 'axios';  
import { NavLink } from 'react-router-dom';
import Category from '../../components/Category';
import { BASE_URL } from '../../globals';  

const CategoryList = () => {
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const response = await axios.get(`${BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching Category:', error);
        setError('Failed to fetch categories.');
      }
    };

    fetchCategory(); 
  }, []); 

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Categories List</h1>
        <NavLink to="/newcategory" className="btn btn-success">
          New Category
        </NavLink>
      </div>

      {error && <p className="text-danger">{error}</p>} 

      <section className="category-list">
        <div className="row gy-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="col-12" key={category._id}>
                <Category category={category} />
              </div>
            ))
          ) : (
            <p className="text-muted">No categories found.</p> 
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
