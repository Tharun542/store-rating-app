import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { addOrUpdateRating } from "../services/StoreService";

export default function StoreCard({ store, userToken }) {
  const [rating, setRating] = useState(store.userRating || "");

  const handleSubmit = async () => {
    try {
      await addOrUpdateRating(
        { store_id: store.id, rating },
        userToken
      );
      alert("Rating submitted");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">{store.name}</Typography>
        <Typography>{store.address}</Typography>

        <Typography>
          ⭐ Avg Rating: {store.avgRating || "No ratings"}
        </Typography>

        <Typography>
          Your Rating: {store.userRating || "Not rated"}
        </Typography>

        <TextField
          type="number"
          label="Rate (1-5)"
          inputProps={{ min: 1, max: 5 }}
          value={rating}
          onChange={(e) => {
            let value = Number(e.target.value);

            if (value >= 1 && value <= 5) {
              setRating(value);
            } else {
              setRating(0);
            }
          }}
        />

        <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}