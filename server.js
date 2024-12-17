const express = require('express');
const app = express();
const port = 3000;

// Body parser middleware
app.use(express.json());

// In-memory storage for events and users
let events = [];
let users = [];

// Route to get all events
app.get('/api/events', (req, res) => {
  const publicEvents = events.filter(event => event.public);
  res.json(publicEvents);
});

// Route to get a specific event by ID
app.get('/api/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const event = events.find(e => e.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
});

// Route to create a new event
app.post('/api/events', (req, res) => {
  const { name, description, public } = req.body;

  // Create a new event with a unique ID
  const newEvent = {
    id: (events.length + 1).toString(),
    name,
    description,
    public,
    users: [],
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Route to update an event
app.put('/api/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const { name, description, public } = req.body;

  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).json({ error: "Event not found" });
  }

  const updatedEvent = {
    id: eventId,
    name: name || events[eventIndex].name,
    description: description || events[eventIndex].description,
    public: public !== undefined ? public : events[eventIndex].public,
    users: events[eventIndex].users,
  };

  events[eventIndex] = updatedEvent;
  res.json(updatedEvent);
});

// Route to register a user to an event
app.post('/api/events/:eventId/register', (req, res) => {
  const eventId = req.params.eventId;
  const { userId } = req.body;

  const event = events.find(e => e.id === eventId);
  const user = users.find(u => u.id === userId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (event.users.some(u => u.id === userId)) {
    return res.status(400).json({ error: "User already registered" });
  }

  event.users.push(user);
  res.status(200).json({ message: `User ${user.name} successfully registered for event "${event.name}".` });
});

// Route to unregister a user from an event
app.post('/api/events/:eventId/unregister', (req, res) => {
  const eventId = req.params.eventId;
  const { userId } = req.body;

  const event = events.find(e => e.id === eventId);
  const user = users.find(u => u.id === userId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userIndex = event.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(400).json({ error: "User not registered for this event" });
  }

  event.users.splice(userIndex, 1);
  res.status(200).json({ message: `User ${user.name} successfully unregistered from event "${event.name}".` });
});

// Route to create a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  
  // Create a new user with a unique ID
  const newUser = {
    id: (users.length + 1).toString(),
    name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to get a list of users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
