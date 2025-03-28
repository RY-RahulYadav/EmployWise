import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState(null); // Custom alert state

  const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      authenticate(response.token);
      setAlert({ type: "success", message: "Login successful!" }); // Success alert
      setTimeout(() => {
        setAlert(null);
        navigate('/users');
      }, 2000);
    } catch {
      setAlert({ type: "error", message: "Invalid credentials" }); // Error alert
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-blue-400/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <img src="https://icons.veryicon.com/png/o/miscellaneous/simple-line-icon/authentication-16.png" alt="" srcset="" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">EmployWise</h1>
          </div>
          <p className="text-lg max-w-md text-center text-white/90">
            Empower your workforce with smart solutions for modern businesses
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {alert && (
            <div
              className={`mb-6 p-3 rounded-lg text-sm ${
                alert.type === "success"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {alert.message}
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your EmployWise account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-7">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
             
            </div>

            <button  style={{marginBottom:"1rem"}}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}