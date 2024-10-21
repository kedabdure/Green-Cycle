import { Box } from "@mui/material";
import { ClimbingBoxLoader, ScaleLoader, BeatLoader } from "react-spinners";

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

export function ScaleSpinner() {
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
        height={48}
        width={6}
      />
    </Box>
  );
}

export function ClipSpinner() {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "10vh",
    }}>
      <BeatLoader
        color="darkblue"
      />
    </Box>
  );
}
