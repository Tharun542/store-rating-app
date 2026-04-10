import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { signup as signupService } from "../services/AuthService";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupService(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5">Signup</Typography>

        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Name" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <TextField name="email" label="Email" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <TextField name="address" label="Address" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth>Signup</Button>
        </form>

        <Typography mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;