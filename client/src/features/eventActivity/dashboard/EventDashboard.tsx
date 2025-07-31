import { Grid2 } from "@mui/material";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

type Props = {
  activities: Activity[];
  cancleEvent: () => void;
  viewEvent: (id: string) => void;
  selectedActivity?: Activity;
  editMode : boolean;
  openForm : (id : string) => void
  closeForm : () => void
};

export default function EventDashboard({
  activities,
  cancleEvent,
  viewEvent,
  selectedActivity,
  editMode,
  openForm,
  closeForm,
}: Props) {
  return (
    <Grid2 container spacing={3} sx={{ mt: 3 }}>
      <Grid2 size={7}>
        <EventList activities={activities} viewEvent={viewEvent} />
      </Grid2>
      <Grid2 size={5} display="flex" gap={3} flexDirection="column">
        {selectedActivity && !editMode && (
          <EventDetails selectedActivity={selectedActivity} cancleEvent={cancleEvent} openForm={openForm}  />
        )}
        {editMode &&
         <EventForm selectedActivity ={selectedActivity} closeForm={closeForm} />}
      </Grid2>
    </Grid2>
  );
}
