

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Chat from "./page/Chat";
import NotFound from "./page/NotFound";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";


function App() {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="/chat/:id" element={user ?<Chat /> : <Navigate to="/login" replace />  } />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
