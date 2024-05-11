import { useState } from "react";
import SignUp from "../components/SignUp";
import { Navigate } from "react-router-dom";

const SignUpPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

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
            <SignUp setUsers={setUsers} />
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
