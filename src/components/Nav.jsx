import { NavLink } from 'react-router-dom'
const Nav = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/transactionlist">Transaction List</NavLink>

      <NavLink to="/auth/signin">Signin</NavLink>
      <NavLink to="/auth/signup">Signup</NavLink>

      <NavLink to="/" onClick={onLogout}>
        Log out
      </NavLink>
    </nav>
  )
}
export default Nav
