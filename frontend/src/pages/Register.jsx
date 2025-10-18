import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Alert,
} from "@mui/material";
import useAuth from "../auth/UseAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    designation: "",
    email: "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Submitting form:", form);
      await register(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5">Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2, mt: 2 }}
        >
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          {/* ✅ Date of Birth field */}
          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            required
          />

          {/* ✅ Designation field */}
          <TextField
            label="Designation"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            required
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <TextField
            select
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
          </TextField>

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
