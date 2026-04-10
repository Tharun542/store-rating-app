import { useState } from "react";
import { rateStore } from "../services/RatingService";
import { Button, TextField } from "@mui/material";

const RatingForm = ({ storeId, userToken, userRating, refreshStores }) => {
  const [rating, setRating] = useState(userRating || 0);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) return alert("Rating must be 1-5");
    try {
      await rateStore({ store_id: storeId, rating }, userToken);
      alert("Rating submitted!");
      refreshStores();
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <TextField
        type="number"
        label="Your Rating"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        InputProps={{ inputProps: { min: 1, max: 5 } }}
        size="small"
        sx={{ marginRight: 1 }}
      />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default RatingForm;