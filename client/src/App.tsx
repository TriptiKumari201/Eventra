import { List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:7129/api/Activities")
      .then((response) => setActivities(response.data));

    return () => {};
  }, []);

  return (
    <>
      <Typography variant="h3">Eventra</Typography>
      <List>
        {activities.map((a) => (
          <ListItem key={a.id}>{a.title}</ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
