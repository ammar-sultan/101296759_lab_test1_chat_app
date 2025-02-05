import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ element }) => {
  const { authUser } = useAuthStore();
  return authUser ? element : <Navigate to="/login" />;
};

const AuthRoute = ({ element }) => {
  const { authUser } = useAuthStore();
  return authUser ? <Navigate to="/" /> : element;
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin" />
  </div>
);

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <LoadingScreen />;

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route
            path="/signup"
            element={<AuthRoute element={<SignUpPage />} />}
          />
          <Route
            path="/login"
            element={<AuthRoute element={<LoginPage />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
