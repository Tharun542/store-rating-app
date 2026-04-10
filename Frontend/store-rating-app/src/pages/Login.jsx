import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService(form);
      const token = res.data.token;

      const decoded = JSON.parse(atob(token.split(".")[1]));

      // ✅ store token properly
      login(decoded, token);

      if (decoded.role === "ADMIN") navigate("/admin");
      else if (decoded.role === "OWNER") navigate("/owner");
      else navigate("/user");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5">Login</Typography>

        <form onSubmit={handleSubmit}>
          <TextField name="email" label="Email" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </form>

        <Typography mt={2}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;