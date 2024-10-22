// loading.tsx
import { Box } from "@mui/material";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50vh",
    }}>
      <ScaleLoader
        color="darkblue"
        height={48}
        width={6}
      />
    </Box>
  );
}
