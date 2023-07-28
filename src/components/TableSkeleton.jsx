import { Skeleton } from "@mui/material";
import React from "react";

export default function TableSkeleton({ rowsNum = 5 }) {
  return [...Array(rowsNum)].map((row, index) => (
    <Skeleton variant="rectangular" sx={{ my: 2, mx: 5 }} />
  ));
}
