import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { iconStyle } from "../libs/constant";
import BookSlot from "./BookSlot";

export default function ViewSlot({ slots, lawyer }) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <IconButton aria-label="delete" onClick={() => setShowDialog(true)}>
        <RemoveRedEyeOutlined sx={iconStyle} />
      </IconButton>
      {showDialog && (
        <BookSlot
          showDialog={showDialog}
          {...{
            setShowDialog,
            slots,
            lawyer,
          }}
        />
      )}
    </>
  );
}
