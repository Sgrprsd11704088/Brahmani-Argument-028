import { useState } from "react";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSetUser = (user) => {
    setCurrentUser(user);
  };

  {
    /* <div>
            <h2>Welcome, {currentUser.username}!</h2>
            <button onClick={() => setCurrentUser(null)}>Logout</button>
          </div> */
  }
  return (
    <>
      <div>
        {currentUser ? (
          <Navigate to="/" />
        ) : (
          <div>
            <Login setUser={handleSetUser} />
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
