// Login.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../redux/store/auth-slice";
import { userActions } from "../redux/store/user-slice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://brahmani-argument-028.onrender.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const users = await response.json();
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        // localStorage.setItem('user', JSON.stringify(foundUser));
        setError("");
        dispatch(authActions.login());
        dispatch(userActions.login(foundUser));
        navigate(`/${foundUser?.id}`);
        // navigate('/');
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>

          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Username
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="email"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
          >
            Login
          </button>

          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded ml-2">
            <Link to={"/signup"}>Sign Up</Link>
          </button>

          {error && <div>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Login;
