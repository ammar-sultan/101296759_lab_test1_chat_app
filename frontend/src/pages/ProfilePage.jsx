import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: 6 }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
        <Box
          sx={{ bgcolor: "background.paper", borderRadius: 2, p: 4, spaceY: 4 }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Profile
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Your profile information
            </Typography>
          </Box>

          <Box sx={{ mb: 4, textAlign: "right" }}>
            <IconButton onClick={() => navigate("/")} color="primary">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Go Back
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ position: "relative" }}>
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                style={{
                  width: "128px",
                  height: "128px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #E5E7EB",
                }}
              />
              <label
                htmlFor="avatar-upload"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#000",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
              >
                <Camera style={{ color: "#E5E7EB", fontSize: "20px" }} />
                <input
                  type="file"
                  id="avatar-upload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <User style={{ color: "#9CA3AF", fontSize: "20px" }} />
                  <Typography variant="h6">{authUser?.fullName}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail style={{ color: "#9CA3AF", fontSize: "20px" }} />
                  <Typography variant="body2" color="textSecondary">
                    {authUser?.email}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {isUpdatingProfile ? (
                  <>
                    <CircularProgress size={24} sx={{ marginRight: 1 }} />
                    Uploading...
                  </>
                ) : (
                  "Click the camera icon to update your photo"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
