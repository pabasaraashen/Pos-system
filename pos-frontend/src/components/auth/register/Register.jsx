// Import React and useState hook
import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
// Import axios for HTTP requests

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


// Register component for user sign up
const Register = ({ onSwitchToLogin }) => {
  const { enqueueSnackbar } = useSnackbar();
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  // State to store form input values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: '', // Default role
  })
  // State to store error messages
  const [error, setError] = useState('')

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  // React Query mutation for register API call
  const registerMutation = useMutation({
    mutationFn: (reqData) => axios.post('http://localhost:8000/api/user/register', reqData),
    onSuccess: (res) => {
      enqueueSnackbar('Account created!', { variant: 'success' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: '',
      });
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      enqueueSnackbar(msg, { variant: 'error' });
    }
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Register form data:', formData);
    registerMutation.mutate(formData);
  }

  // Render the registration form UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us today</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            {/* Phone field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Role field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                >
                  <option value="waiter">Waiter</option>
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
            </div>
          </div>
          {/* Error message */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Create Account
            </button>
          </div>
          {/* Switch to login button */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register