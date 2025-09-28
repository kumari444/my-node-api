const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" }
];
let nextId = 3;

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET one user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST create a new user
app.post('/users', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: "Missing name or role" });
  }
  const newUser = { id: nextId++, name, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PATCH update an existing user
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, role } = req.body;
  if (name !== undefined) user.name = name;
  if (role !== undefined) user.role = role;

  res.json(user);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

