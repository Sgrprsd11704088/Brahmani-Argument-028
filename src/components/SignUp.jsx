import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (username && password) {
        const response = await fetch(
          "https://brahmani-argument-028.onrender.com/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setUsername("");
        setPassword("");
        setShowAlert(true);
        navigate("/");
      } else {
        setError("Username and password are required");
      }
    } catch (error) {
      console.log(error);
      setError("Error signing up");
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Sign Up
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
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSignUp}
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
          >
            Sign Up
          </button>

          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded ml-4">
            <Link to={"/login"}>Login</Link>
          </button>

          {error && <div>{error}</div>}
          {showAlert && (
            <div>
              <p>Account created successfully!</p>
              <button onClick={() => setShowAlert(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
