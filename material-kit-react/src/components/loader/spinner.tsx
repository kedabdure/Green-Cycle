import { Box } from "@mui/material";
import { ClimbingBoxLoader } from "react-spinners";

export default function Spinner() {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100% !important",
    }}>
      <ClimbingBoxLoader
        color="darkblue"
      />
    </Box>
  );
}
