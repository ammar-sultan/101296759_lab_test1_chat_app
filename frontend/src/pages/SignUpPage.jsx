import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const FormInput = ({ label, type, value, onChange, icon, endAdornment }) => (
  <TextField
    fullWidth
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      endAdornment,
    }}
    sx={{ mb: 2 }}
  />
);

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <Box className="min-h-screen flex justify-center items-center">
      <Box className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <Box textAlign="center" mb={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Box className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors">
              <Mail className="size-6 text-primary" />
            </Box>
            <Typography variant="h4" fontWeight="bold" mt={2}>
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Get started with your free account
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            icon={<User />}
            name="fullName"
          />

          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={<Mail />}
            name="email"
          />

          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            icon={<Lock />}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSigningUp}
            sx={{ mt: 2 }}
          >
            {isSigningUp ? (
              <>
                <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
