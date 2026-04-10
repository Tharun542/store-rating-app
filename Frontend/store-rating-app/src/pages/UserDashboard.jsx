import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { getAllStores } from "../services/StoreService";
import StoreCard from "../components/StoreCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");

  const fetchStores = useCallback(async () => {
    if (!user) return;
    const res = await getAllStores(user.token, search, order);
    setStores(res.data);
  }, [user, search, order]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchStores();
  }, [user, fetchStores, navigate]);

  return (
    <Container>
      <Navbar />
      <Typography variant="h4">User Dashboard</Typography>

      <TextField
        label="Search"
        fullWidth
        sx={{ my: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button onClick={() => setOrder("ASC")}>ASC</Button>
      <Button onClick={() => setOrder("DESC")}>DESC</Button>
      <Button variant="contained" onClick={fetchStores}>
        Apply
      </Button>

      {stores.map((s) => (
        <StoreCard key={s.id} store={s} userToken={user?.token} />
      ))}
    </Container>
  );
}