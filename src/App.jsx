import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const handleSetUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.username}!</h2>
          <button onClick={() => setCurrentUser(null)}>Logout</button>
        </div>
      ) : (
        <div>
          <Login setUser={handleSetUser} />
          <SignUp setUsers={setUsers} />
        </div>
      )}
    </div>
  );
};

export default App;
