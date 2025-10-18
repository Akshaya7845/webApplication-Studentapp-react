/*import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../auth/UseAuth";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from "@mui/material";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/User");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      {user?.role === "Teacher" && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add User
        </Button>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}*/
/*import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../auth/UseAuth";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ Correct endpoint name: "Users" (plural)
        const res = await axios.get("/api/Users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please check your backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {user?.role === "Teacher" && (
        <Button variant="contained" sx={{ mb: 2 }}>
          Add User
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}*/
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../auth/UseAuth";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dob: "",
    designation: "",
    password: "",
  });

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/Users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Open Add/Edit dialog
  const handleOpenDialog = (user = null) => {
    setEditUser(user);
    setFormData(
      user || {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        dob: "",
        designation: "",
        password: "",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditUser(null);
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save new or edited user
  const handleSave = async () => {
    try {
      if (editUser) {
        // UPDATE user
        await axios.put(`/api/Users/${editUser.id}`, formData);
      } else {
        // ADD user
        await axios.post("/api/Auth/register", formData);
      }
      await fetchUsers();
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user. Check backend logs.");
    }
  };

  // 🔹 Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/Users/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Check backend logs.");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {user?.role === "Teacher" && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            {user?.role === "Teacher" && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              {user?.role === "Teacher" && (
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenDialog(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 🔹 Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editUser ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
          />
          <TextField
            name="dob"
            label="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
          <TextField
            name="designation"
            label="Designation"
            value={formData.designation}
            onChange={handleChange}
          />
          {!editUser && (
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editUser ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

