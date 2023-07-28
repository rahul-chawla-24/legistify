import { Notifications } from "@mui/icons-material";
import { Stack } from "@mui/system";
import React from "react";
import { textPrimaryColor } from "../libs/constant";

export default function Header() {
  return (
    <Stack
      direction={"row"}
      pl={2}
      pr={5}
      height="80px"
      alignItems={"center"}
      sx={{ border: "1px solid #E7E7E7" }}
      justifyContent="space-between"
    >
      <img
        src={`https://auth.legistify.com/static/media/logo_large_black.fffac083efddcc50e504689d57153634.svg`}
        // srcSet={`https://www.legistify.com/static/media/logo.b8096a55.svg`}
        alt={"Leg"}
        style={{ height: "42px" }}
        loading="lazy"
      />
      <Notifications sx={{ color: textPrimaryColor }} />
    </Stack>
  );
}
