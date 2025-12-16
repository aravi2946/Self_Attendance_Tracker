


import React, { useContext, useEffect, useState } from 'react';
import { Search, Trash2, UserCheck, UserX, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { atdContext } from '../Context/AtdContext';

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { url } = useContext(atdContext);
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const allUsers = await axios.get(`${url}/api/admin/usersList`);
      setUsers(allUsers.data);
      
      
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Format time ago from updatedAt
  const getTimeAgo = (updatedAt) => {
    const now = new Date();
    const updated = new Date(updatedAt);
    const diffMs = now - updated;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const handleDeleteClick = (user) => {
    
    
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Add your delete API call here
      
      await axios.delete(`${url}/api/admin/deleteUser/${selectedUser.id}`);
      
      setUsers(users.filter(u => u.email !== selectedUser.email));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return (b.result || 0) - (a.result || 0);
      if (sortBy === 'email') return a.email.localeCompare(b.email);
      return 0;
    });

  // Calculate stats
  const stats = {
    total: users.length,
    avgAttendance: users.length > 0
      ? (users.reduce((sum, u) => sum + (u.result || 0), 0) / users.length).toFixed(1)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Title */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AttendanceTracker</h1>
              <p className="text-sm sm:text-base text-gray-600">Admin Panel - User Management</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.total}</p>
              </div>
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg Attendance</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.avgAttendance}%</p>
              </div>
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="attendance">Sort by Attendance</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-900">
                          {user?.result || 0}%
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full transition-all ${(user?.result || 0) >= 75 ? 'bg-green-500' :
                                (user?.result || 0) >= 60 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                            style={{ width: `${user?.result || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{getTimeAgo(user?.updatedAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete user"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.map((user, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{user?.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0 ml-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-lg font-bold text-gray-900">
                      {user?.result || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${(user?.result || 0) >= 75 ? 'bg-green-500' :
                          (user?.result || 0) >= 60 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${user?.result || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Last Active</span>
                  <span className="text-sm text-gray-900">{getTimeAgo(user?.updatedAt) }</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <UserX className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">Delete User Account</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedUser?.name}</span>? This action cannot be undone and all attendance records will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;