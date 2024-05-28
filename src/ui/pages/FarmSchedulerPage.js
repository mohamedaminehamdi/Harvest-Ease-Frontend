import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Scheduler } from "@aldabil/react-scheduler";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Input,
} from "@mui/material";
import "./Farm.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import the arrow forward icon
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 450,
  bgcolor: "#8cc4bd",
  boxShadow: 24,
  p: 4,
};

function FarmSchedulerPage() {
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const today = new Date();
  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <nav
        className="flex-col h-screen bg-neutral-200 w-1/4 px-5 fixed left-0 top-0"
        style={{ overflow: "auto" }}
      >
        <div className="date">
          <p className="font-normal text-center">{getDate()}</p>
        </div>
        <p className="font-bold text-center">Today's schedule</p>
        {/* Only render today's events */}
        {EVENTS.map((event) => {
          const eventDate = new Date(event.start);
          if (eventDate.toDateString() === today.toDateString()) {
            return (
              <Card
                key={event.event_id}
                className="rounded-3xl"
                sx={{
                  maxWidth: 400,
                  margin: "10px",
                  backgroundColor: "white",
                  overflow: "auto",
                  maxHeight: "300px",
                }}
              >
                <CardActionArea
                  sx={{ backgroundColor: event.color }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.start.toLocaleTimeString()} -{" "}
                      {event.end.toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {event.title}
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="go to event"
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          } else {
            return null;
          }
        })}
      </nav>

      <div className="w-3/4 ml-auto">
        <Button
          className="rounded-3xl"
          sx={{
            minWidth: 150,
            backgroundColor: "#FFD580",
            color: "black",
            fontWeight: "bold",
            margin: "10px",
          }}
          onClick={handleOpen}
        >
          Add event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-3xl">
            <IconButton
              className="close-button"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-center"
            >
              Event details
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="text-center"
            >
              <DateRangePicker
                onChange={(item) => setSelection([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={selection}
                direction="horizontal"
              />
            </Typography>
            <label className="mt-2 text-center font-bold">Add image</label>
            <input
              className="mt-2 border-gray-400 rounded border"
              type="file"
              accept="image/*"
            ></input>
            <div className="mt-2 text-center">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Save{" "}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <Scheduler events={EVENTS} />
    </Stack>
  );
}

export default FarmSchedulerPage;
