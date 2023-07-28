import { Close, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { iconStyle, primaryColor } from "../libs/constant";

export default function TextHeading({
  text,
  color,
  onClose,
  search,
  setSearch,
}) {
  return (
    <Stack
      bgcolor={"white"}
      height="70px"
      direction={"row"}
      sx={{
        borderBottom: "1px solid #E7E7E7",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      px={2}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "22px",
          lineHeight: "16px",
          color: color || primaryColor,
        }}
      >
        {text || "Lawyers"}
      </Typography>
      {setSearch && (
        <Box sx={{ width: "300px" }}>
          <Input
            fullWidth
            id="input-with-icon-adornment"
            placeholder="Search by name,email,speciality etc"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Search sx={iconStyle} />
              </InputAdornment>
            }
          />
        </Box>
      )}
      {onClose && (
        <IconButton aria-label="delete" onClick={() => onClose()}>
          <Close sx={iconStyle} />
        </IconButton>
      )}
    </Stack>
  );
}
