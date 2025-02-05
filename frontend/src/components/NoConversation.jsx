import { Box, Typography } from "@mui/material";

const NoConversation = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        backgroundColor: "background.default",
        opacity: 0.5,
      }}
    >
      <Box sx={{ maxWidth: 400, textAlign: "center", spacing: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Start a conversation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a room from the sidebar to begin messaging.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoConversation;
