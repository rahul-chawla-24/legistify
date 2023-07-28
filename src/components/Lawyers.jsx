import { DragIndicator } from "@mui/icons-material";
import {
  Alert,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import update from "immutability-helper";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { headerStyleObj, iconStyle, tableTextStyleObj } from "../libs/constant";
import { fetchingLawyers, slotBooked } from "../redux/actionCreator";
import TableSkeleton from "./TableSkeleton";
import TextHeading from "./TextHeading";
import ViewSlot from "./viewSlots";

function Lawyers({
  fetchingLawyers,
  lawyers: reduxLawyers,
  loading,
  user,
  slotBooked,
  slot,
}) {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!!search?.length) {
      let searchThis = search?.toLowerCase();
      let list = [...reduxLawyers];
      setLawyers(
        list?.filter((elem) => {
          return (
            elem?.name?.toLowerCase()?.includes(searchThis) ||
            elem?.email?.toLowerCase()?.includes(searchThis) ||
            elem?.speciality?.toLowerCase()?.includes(searchThis) ||
            !!elem?.firms?.filter((item) =>
              item?.toLowerCase()?.includes(searchThis)
            )?.length
          );
        })
      );
    } else {
      setLawyers(reduxLawyers);
    }
  }, [search, reduxLawyers]);

  useEffect(() => {
    fetchingLawyers();
    // eslint-disable-next-line
  }, []);

  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setMsg("");
  };

  useEffect(() => {
    if (slot) {
      setMsg("Booked Successfully !");
      slotBooked(false);
    }
    // eslint-disable-next-line
  }, [slot]);

  useEffect(() => {
    setLawyers(reduxLawyers);
  }, [reduxLawyers]);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = lawyers[dragIndex];
    setLawyers(
      update(lawyers, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };

  const DND_ITEM_TYPE = "Lawyer";

  const TableDragRow = ({ row, index }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);

    const [, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      hover(item, monitor) {
        if (!dropRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = dropRef.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        moveRow(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag({
      type: DND_ITEM_TYPE,
      item: () => ({ index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    preview(drop(dropRef));
    drag(dragRef);

    const opacity = isDragging ? 0 : 1;

    return (
      <TableRow
        ref={dropRef}
        key={row?.name + index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 }, opacity }}
      >
        <TableCell component="th" scope="row" ref={dragRef}>
          <DragIndicator sx={iconStyle} />
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row?.name}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row.email}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row.speciality}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row.firms?.map((elem) => elem)}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row.address}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography sx={tableTextStyleObj} gutterBottom>
            {row.phone}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <ViewSlot
            lawyer={row}
            {...{
              slots: row?.slots,
            }}
          />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <DashboardLayout>
      <DndProvider backend={HTML5Backend}>
        <TextHeading text={"Lawyers"} {...{ search, setSearch }} />
        <TableContainer component={Paper}>
          {loading ? (
            <Stack minWidth={"550px"}>
              <TableSkeleton />
            </Stack>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: "#F9FAFB", border: "none!important" }}
                >
                  <TableCell>
                    <Typography sx={headerStyleObj} gutterBottom>
                      Move
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Speciality
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Firms
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={headerStyleObj} gutterBottom>
                      Slots
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lawyers?.map((row, index) => (
                  <>
                    <TableDragRow {...{ row, index }} />
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </DndProvider>
      {msg && (
        <Snackbar
          open={msg}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      )}
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    lawyers: state.lawyers,
    loading: state.loading,
    user: state.user,
    slot: state.slot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingLawyers: () => {
      dispatch(fetchingLawyers());
    },
    slotBooked: (slot) => {
      dispatch(slotBooked(slot));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lawyers);
