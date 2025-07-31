import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  selectedActivity?: Activity;
  closeForm: () => void;
};

export default function EventForm({ selectedActivity, closeForm }: Props) {
  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (selectedActivity) {
      data.id = selectedActivity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
    }
    closeForm();
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          name="title"
          label="Title"
          defaultValue={selectedActivity?.title}
        ></TextField>
        <TextField
          name="description"
          label="Description"
          defaultValue={selectedActivity?.description}
          multiline
          rows={3}
        ></TextField>
        <TextField
          name="category"
          label="Category"
          defaultValue={selectedActivity?.category}
        ></TextField>
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            selectedActivity?.date
              ? new Date(selectedActivity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        ></TextField>
        <TextField
          name="city"
          label="City"
          defaultValue={selectedActivity?.city}
        ></TextField>
        <TextField
          name="venue"
          label="Venue"
          defaultValue={selectedActivity?.venue}
        ></TextField>

        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={() => closeForm()} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
