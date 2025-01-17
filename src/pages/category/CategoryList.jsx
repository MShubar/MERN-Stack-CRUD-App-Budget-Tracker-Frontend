import { useState, useEffect } from 'react';  // Import the hooks
import axios from 'axios';  // Don't forget axios import
import { NavLink } from 'react-router-dom';
import Category from '../../components/Category';
import { BASE_URL } from '../../globals';  // Ensure that this constant is defined in your globals

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // Declare state for categories
  const [error, setError] = useState(''); // Handle errors

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      try {
        const response = await axios.get(`${BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}` // Send the token with the request
          }
        });
        setCategories(response.data); // Update the categories state
      } catch (error) {
        console.error('Error fetching Category:', error);
        setError('Failed to fetch categories.');
      }
    };

    fetchCategory(); // Call the function to fetch categories
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Categories List</h1>
        <NavLink to="/newcategory" className="btn btn-success">
          New Category
        </NavLink>
      </div>

      {error && <p className="text-danger">{error}</p>} {/* Display error if there's an issue */}

      <section className="category-list">
        <div className="row gy-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="col-12" key={category._id}>
                <Category category={category} />
              </div>
            ))
          ) : (
            <p className="text-muted">No categories found.</p> // Display a message if no categories
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
