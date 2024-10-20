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
      height: "100% !important",
    }}>
      <ScaleLoader
        color="darkblue"
        height={40}
        width={5}
      />
    </Box>
  );
}
