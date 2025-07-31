import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import EventDashboard from "../../features/eventActivity/dashboard/EventDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  //  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();

  const handleSelectedactivity = (id: string) => {
    setSelectedActivity(activities!.find((X) => X.id === id));
    //console.log(id);
  };

  const handelCancleSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedactivity(id);
    else handelCancleSelectedActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#eeeeee" }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ mt: "3" }}>
          {!activities || isPending ? (
            <Typography>...Loading</Typography>
          ) : (
            <EventDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              cancleEvent={handelCancleSelectedActivity}
              viewEvent={handleSelectedactivity}
              openForm={handleOpenForm}
              editMode={editMode}
              closeForm={handleCloseForm}
            />
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;
