import {
  Button,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  primaryColor,
  textPrimaryColor,
  textSecondaryColor,
} from "../libs/constant";
import { bookAndUpdateSlot } from "../redux/actionCreator";
import TextHeading from "./TextHeading";

function BookSlot({
  showDialog,
  slots,
  setShowDialog,
  lawyer,
  user,
  bookAndUpdateSlot,
  loading,
}) {
  const [selectedSlot, setSelectedSlotIndex] = useState(null);

  const handleSubmit = () => {
    let lawyerCopy = { ...lawyer };
    lawyerCopy.slots[selectedSlot] = {
      ...lawyerCopy?.slots?.[selectedSlot],
      booked: true,
      user,
    };
    bookAndUpdateSlot(lawyerCopy, lawyer?.id);
  };

  return (
    <Dialog
      open={showDialog}
      classes={{
        paper: {
          position: "relative",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <Stack sx={{ width: "500px", maxHeight: "70vh" }} position="relative">
        <TextHeading
          text={"Book a slot"}
          onClose={() => setShowDialog(false)}
          py={2}
        />
        <Stack py={2} px={2}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "26px",
              color: textSecondaryColor,
            }}
          >
            {slots?.length ? "Select a slot" : "No slot available"}
          </Typography>
          {slots?.map((item, index) => (
            <Stack
              key={item?.time}
              h="60px"
              justifyContent={"center"}
              py={2}
              sx={{
                border: `1px solid ${
                  selectedSlot === index ? primaryColor : "#E7E7E7"
                }`,
                borderRadius: "2px",
                cursor: item?.booked ? "not-allowed" : "pointer",
              }}
              onClick={
                item?.booked
                  ? undefined
                  : () =>
                      setSelectedSlotIndex(
                        selectedSlot === index ? undefined : index
                      )
              }
              mt={2}
            >
              <Stack direction={"row"} px={2} width="100%">
                <Stack
                  direction={"row"}
                  sx={{ borderRight: "1px solid #E7E7E7", width: "10%" }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      lineHeight: "30px",
                      color: textSecondaryColor,
                    }}
                  >
                    {index + 1 || "1"}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  width="80%"
                  ml={2}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: textPrimaryColor,
                    }}
                  >
                    {item?.time || "11:30 AM"}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: item?.booked ? "#D11818" : "#139E58",
                    }}
                  >
                    {item?.booked ? "Booked" : "Available"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      {selectedSlot !== null && (
        <Stack
          direction={"row"}
          height="80px"
          width={"500px"}
          bgcolor={"white"}
          position={"fixed"}
          justifyContent="center"
          bottom={"105px"}
        >
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: primaryColor,
              width: "150px",
            }}
            onClick={() => handleSubmit()}
            disabled={loading}
            endIcon={
              loading ? (
                <CircularProgress color="inherit" size={"1.5rem"} />
              ) : undefined
            }
          >
            Book
          </Button>
        </Stack>
      )}
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookAndUpdateSlot: (body, id) => {
      dispatch(bookAndUpdateSlot(body, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSlot);
