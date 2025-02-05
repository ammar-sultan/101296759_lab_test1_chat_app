import { Box, Skeleton } from "@mui/material";

const ChatLoader = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <Box className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Skeleton variant="circular" width="100%" height="100%" />
          </Box>

          <Box
            sx={{
              ml: idx % 2 === 0 ? 2 : 0,
              mr: idx % 2 !== 0 ? 2 : 0,
              flex: 1,
            }}
          >
            <Skeleton variant="text" width={100} height={16} />

            <Box sx={{ mt: 1 }}>
              <Skeleton variant="rectangular" width={200} height={64} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChatLoader;
