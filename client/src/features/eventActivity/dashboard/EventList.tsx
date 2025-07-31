import { Box } from "@mui/material";
import EventCard from "./EventCard";

type Props = {
  activities: Activity[];
  viewEvent:(id : string)=> void;
};

export default function EventList({ activities, viewEvent}: Props) {
  return (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      {activities.map((a) => (
        <EventCard key={a.id} activity={a} viewEvent={viewEvent}></EventCard>
      ))}
    </Box>
  );
}
