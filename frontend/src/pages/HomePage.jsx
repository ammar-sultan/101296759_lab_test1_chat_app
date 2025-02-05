import { useChatStore } from "../store/useChatStore";
import { Box, CssBaseline, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import NoConversation from "../components/NoConversation";
import MessageContainer from "../components/MessageContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <Box sx={{ height: "100vh", backgroundColor: "background.default" }}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ pt: 10 }}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            height: "calc(100vh - 8rem)",
            display: "flex",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Sidebar />
          {!selectedUser ? <NoConversation /> : <MessageContainer />}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
