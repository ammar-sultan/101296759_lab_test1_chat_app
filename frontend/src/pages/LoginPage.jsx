import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Box className="min-h-screen flex items-center justify-center">
      <Box className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <Typography variant="h4" fontWeight="bold" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          Welcome back, please log in to your account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Email"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Typography variant="body2" align="center" className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1976d2" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
