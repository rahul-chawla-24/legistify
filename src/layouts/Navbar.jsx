import {
  AddModeratorOutlined,
  PeopleOutline,
  Settings,
  WorkOutline,
} from "@mui/icons-material";

import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { iconStyle, primaryColor, textPrimaryColor } from "../libs/constant";

export default function Navbar() {
  const list = [
    {
      name: "Lawyers",
      icon: <PeopleOutline sx={iconStyle} />,
    },
    {
      name: "Consultations",
      icon: <AddModeratorOutlined sx={iconStyle} />,
    },
    {
      name: "Cases",
      icon: <WorkOutline sx={iconStyle} />,
    },
    {
      name: "Settings",
      icon: <Settings sx={iconStyle} />,
    },
  ];
  const [selected, setSelected] = useState("Lawyers");
  return (
    <Stack>
      {list?.map((elem) => (
        <Stack
          direction={"row"}
          height="50px"
          px={2}
          color={primaryColor}
          sx={{
            borderRadius: "2px",
            backgroundColor: elem?.name === selected ? "#F9FAFB" : undefined,
            cursor: "pointer",

            // border: elem?.name === selected ? "0.2px solid #D0D5DD" : undefined,
          }}
          alignItems="center"
          onClick={() => setSelected(elem?.name)}
        >
          {elem?.icon}
          <Typography
            ml={2}
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "19px",
              color: textPrimaryColor,
              marginTop: "2px",
            }}
            gutterBottom
          >
            {elem?.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
