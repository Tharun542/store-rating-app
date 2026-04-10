import { useEffect, useState, useContext } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import {
  getAdminDashboard,
  getUsers,
  createUser,
  getStoresAdmin
} from "../services/StoreService";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: ""
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  });

  useEffect(() => {
    getAdminDashboard(user.token).then((res) => setData(res.data));
    fetchUsers();
    fetchStores();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers(user.token, filters);
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await getStoresAdmin(user.token);
    setStores(res.data);
  };

  const handleCreateUser = async () => {
    await createUser(newUser, user.token);
    alert("User created");
  };

  return (
    <Container>
      <Navbar />
      <Typography variant="h4">Admin Dashboard</Typography>

      <Typography>Total Users: {data.totalUsers}</Typography>
      <Typography>Total Stores: {data.totalStores}</Typography>
      <Typography>Total Ratings: {data.totalRating}</Typography>

      {/* CREATE USER */}
      <Typography variant="h6">Create User</Typography>
      {Object.keys(newUser).map((key) => (
        <TextField
          key={key}
          label={key}
          onChange={(e) =>
            setNewUser({ ...newUser, [key]: e.target.value })
          }
        />
      ))}
      <Button onClick={handleCreateUser}>Create</Button>

      {/* FILTER */}
      <Typography variant="h6">Filter Users</Typography>
      {Object.keys(filters).map((key) => (
        <TextField
          key={key}
          label={key}
          onChange={(e) =>
            setFilters({ ...filters, [key]: e.target.value })
          }
        />
      ))}
      <Button onClick={fetchUsers}>Apply</Button>

      {/* USERS */}
      {users.map((u) => (
        <Typography key={u.id}>
          {u.name} - {u.email} - {u.role}
        </Typography>
      ))}

      {/* STORES */}
      <Typography variant="h6">Stores</Typography>
      {stores.map((s) => (
        <Typography key={s.id}>
          {s.name} - {s.address} - ⭐ {s.rating}
        </Typography>
      ))}
    </Container>
  );
}