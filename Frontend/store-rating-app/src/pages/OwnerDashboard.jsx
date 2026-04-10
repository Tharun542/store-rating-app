import { useEffect, useState, useContext } from "react";
import { Container, Typography } from "@mui/material";
import { getOwnerDashboard } from "../services/StoreService";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});

  useEffect(() => {
    getOwnerDashboard(user.token).then((res) =>
      setData(res.data)
    );
  }, []);

  return (
    <Container>
      <Navbar />
      <Typography variant="h4">Owner Dashboard</Typography>

      <Typography>
        Avg Rating: {data.avgRating}
      </Typography>

      {data.ratings?.map((r) => (
        <Typography key={r.id}>
          {r.user?.name} - {r.rating}
        </Typography>
      ))}
    </Container>
  );
}