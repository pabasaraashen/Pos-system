import React, { useState } from 'react'// Import React and hooks
import { useMutation } from '@tanstack/react-query'// Import React Query's useMutation for handling async login
import { login } from '../../../https/index'// Import the login API function
import { useDispatch } from 'react-redux'; // Assuming you have a Redux store setup
import { setUser } from '../../../redux/userSlice'; // Import the action to set user data in Redux store
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// Login component for user authentication
const Login = ({ onSwitchToRegister }) => {
  const navigate = useNavigate(); // Use navigate for redirection

  const dispatch = useDispatch(); // Assuming you have a Redux store setup

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  // State to store form input values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  // State to store error messages
  const [error, setError] = useState('')

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit
    setError(''); // Clear previous errors
    // Validate required fields
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }
    // Trigger the login mutation
    loginMutation.mutate(formData);
  }

  // React Query mutation for login API call
  const loginMutation = useMutation({
    // Function to call the login API
    mutationFn: (reqData) => login(reqData),
    // On successful login
    onSuccess: (res) => {
        const { data } = res;
        console.log(data); // You can handle login success here (e.g., redirect, store token)
        const {_id, name, email, phone, role} = data.data; // Destructure user data
        dispatch(setUser({_id, name, email, phone, role})); // Dispatch user data to Redux store
        navigate('/'); // Redirect to home page after successful login
    },
    // On error (network or server error)
    onError: (error) => {
      // AxiosError: error.message, error.response, error.code, etc.
      if (error.code === 'ERR_NETWORK') {
        setError('Network error: Unable to connect to the server. Please check if the backend is running.');
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        // Show alert for invalid login
        if (
          error.response.status === 401 ||
          /invalid|unauthorized|wrong/i.test(error.response.data.message)
        ) {
          alert('Invalid login');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.log(error);
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
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
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login