import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");

  const handle = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      "https://store-rating-app-x0zo.onrender.com/api/auth/update-password",
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Updated");
  };

  return (
    <Container>
      <TextField
        type="password"
        label="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handle}>Update</Button>
    </Container>
  );
}