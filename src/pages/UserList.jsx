"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser, updateUser } from '../services/api';
import EditUser from './EditUser';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const usersPerPage = 6;

  const setAlertMessageWithTimeout = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000); // Remove alert after 3 seconds
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers(page);
        setUsers(response.data.data || []);
        const totalUsers = response.data.total || response.data.data.length;
        setTotalPages(Math.ceil(totalUsers / usersPerPage));
      } catch (err) {
        setAlertMessageWithTimeout({ type: 'error', text: 'Failed to load users' });
        console.error(err);
      }
    };
    loadUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Call the delete API

      // Remove the user from the current state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== id);

        // Adjust pagination based on the updated users array
        const totalUsers = updatedUsers.length + (page - 1) * usersPerPage; // Estimate total users
        const newTotalPages = Math.max(1, Math.ceil(totalUsers / usersPerPage));
        setTotalPages(newTotalPages);

        // If the current page is empty and not the first page, go to the previous page
        if (updatedUsers.length === 0 && page > 1) {
          setPage((prevPage) => prevPage - 1);
        } else if (page > newTotalPages && newTotalPages > 0) {
          // If the current page exceeds the new total pages, go to the last page
          setPage(newTotalPages);
        }

        return updatedUsers;
      });

      setAlertMessageWithTimeout({ type: 'success', text: 'User deleted successfully!' });
    } catch (err) {
      setAlertMessageWithTimeout({ type: 'error', text: 'Failed to delete user' });
      console.error(err);
    }
  };

  const handleUpdate = async (updatedUserData) => {
    try {
      const originalUser = users.find((u) => u.id === updatedUserData.id);
      const userDataWithAvatar = {
        ...updatedUserData,
        avatar: originalUser.avatar,
      };
      const response = await updateUser(updatedUserData.id, userDataWithAvatar);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === response.data.id ? response.data : user
        )
      );
      setAlertMessageWithTimeout({ type: 'success', text: 'User updated successfully!' });
      return response.data;
    } catch (err) {
      setAlertMessageWithTimeout({ type: 'error', text: 'Failed to update user' });
      console.error(err);
      throw err;
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setAlertMessageWithTimeout({ type: 'success', text: 'Logout successful!' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setAlertMessageWithTimeout({ type: 'error', text: 'Logout failed' });
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const openEditModal = (id) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 sm:p-8">
      {alertMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${
            alertMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          <span>{alertMessage.text}</span>
          <button onClick={handleCloseAlert} className="ml-4 text-sm underline">
            Close
          </button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <EditUser
              user={users.find((u) => u.id === selectedUserId)}
              onClose={closeEditModal}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/simple-line-icon/authentication-16.png"
            alt="Spacer Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 mr-2"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">EmployWise</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">
            User List
          </h2>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 p-2 sm:p-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm sm:text-base bg-gray-50 rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => openEditModal(user.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition w-full text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-100 transition w-full text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition w-full sm:w-auto text-sm sm:text-base disabled:bg-gray-400"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm sm:text-base">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition w-full sm:w-auto text-sm sm:text-base disabled:bg-gray-400"
              disabled={page === totalPages || users.length === 0}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;