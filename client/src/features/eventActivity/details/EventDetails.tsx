import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  selectedActivity: Activity;
  cancleEvent: () => void;
  openForm: (id: string) => void;
};

export default function EventDetails({
  selectedActivity,
  cancleEvent,
  openForm,
}: Props) {
  const { activities } = useActivities();
  const activity = activities?.find((x) => x.id == selectedActivity.id);
  return (
    <Card>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity!.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity!.title}</Typography>
        <Typography
          sx={{ color: "text.secondary", mb: 1 }}
          fontWeight={"light"}
        >
          {activity!.date}
        </Typography>
        <Typography variant="body2">{activity!.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openForm(activity!.id)} color="primary">
          Edit
        </Button>
        <Button onClick={cancleEvent} color="inherit">
          Cancle
        </Button>
      </CardActions>
    </Card>
  );
}
