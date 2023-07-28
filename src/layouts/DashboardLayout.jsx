import { Stack } from "@mui/system";
import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <Stack>
      <Header />
      <Stack direction={"row"}>
        <Stack width={"18%"} height="87vh" py={3}>
          <Navbar />
        </Stack>
        <Stack width={"82%"} bgcolor="#F9FAFB" px={4} py={3}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}
