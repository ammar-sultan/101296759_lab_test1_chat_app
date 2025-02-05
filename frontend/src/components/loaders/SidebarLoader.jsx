import { Box, Skeleton, Typography } from "@mui/material";
import { Users } from "lucide-react";

const SidebarLoader = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <Box className="border-b border-base-300 w-full p-5">
        <Box display="flex" alignItems="center" gap={1}>
          <Users className="w-6 h-6" />
          <Typography variant="body1" className="hidden lg:block">
            Contacts
          </Typography>
        </Box>
      </Box>

      <Box className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <Box
            key={idx}
            className="w-full p-3 flex items-center gap-3"
            display="flex"
            alignItems="center"
          >
            <Box className="relative mx-auto lg:mx-0">
              <Skeleton variant="circular" width={48} height={48} />
            </Box>

            <Box
              className="hidden lg:block text-left min-w-0 flex-1"
              display="flex"
              flexDirection="column"
            >
              <Skeleton variant="text" width={128} height={16} />
              <Skeleton variant="text" width={64} height={14} />
            </Box>
          </Box>
        ))}
      </Box>
    </aside>
  );
};

export default SidebarLoader;
