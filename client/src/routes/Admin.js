import React, { useEffect, useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { makeAuthenticatedGETRequest, makeAuthenticatedDELETERequest } from '../utils/serverHelpers';
import HomeContainer from '../containers/HomeContainer'; // Import HomeContainer
import '../styles/admin.css'; // Import the CSS file
import { Navigate } from 'react-router-dom';
import globalContext from '../contexts/globalContext';

const Admin = () => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(['token']);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userData} = useContext(globalContext);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await makeAuthenticatedGETRequest('/api/admin/users', cookie.token);
        
        if (usersResponse) {
          setUsersData(usersResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookie.token]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await makeAuthenticatedDELETERequest(`/api/admin/users/${userId}`);
      if (response.success) {
        // Optionally, update the UI to reflect the deletion
        setUsersData(usersData.filter(user => user.user._id !== userId));
        alert('User deleted successfully');
      } else {
        console.error('Failed to delete user:', response.error);
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  // const logout = () => {
  //   removeCookie('token');
  //   navigate('/login');
  // };
  const isAdmin = userData.firstName === 'admin';
  console.log(isAdmin);

  // If user is not admin, redirect to another page
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <HomeContainer currActiveScreen="admin"> {/* Wrap with HomeContainer and pass currActiveScreen as "admin" */}
      <div className="admin-container">
        <h1 className="admin-heading">Admin Dashboard</h1>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Net Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(userData => (
                <tr key={userData.user._id}>
                  <td>{userData.user.firstName} {userData.user.lastName}</td>
                  <td>{userData.income.reduce((total, income) => total + income.amount, 0)}</td>
                  <td>{userData.expense.reduce((total, expense) => total + expense.amount, 0)}</td>
                  <td>{userData.income.reduce((total, income) => total + income.amount, 0) - userData.expense.reduce((total, expense) => total + expense.amount, 0)}</td>
                  <td>
                    {userData.user.firstName !== "admin" && (
                      <button onClick={() => handleDeleteUser(userData.user._id)}>Delete User</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </HomeContainer>
  );
};

export default Admin;
