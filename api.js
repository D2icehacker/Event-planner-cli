const axios = require('axios');

const apiUrl = 'http://localhost:3000/api'; // URL for the local server

// Function to fetch all public events
const getPublicEvents = async () => {
  try {
    const response = await axios.get(`${apiUrl}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    return [];
  }
};

// Function to get event details by event ID
const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${apiUrl}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error.message);
    return null;
  }
};

// Function to create a new event
const createEvent = async (name, description, public) => {
  try {
    const response = await axios.post(`${apiUrl}/events`, { name, description, public });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.message);
    return null;
  }
};

// Function to update an existing event
const updateEvent = async (eventId, name, description, public) => {
  try {
    const response = await axios.put(`${apiUrl}/events/${eventId}`, { name, description, public });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.message);
    return null;
  }
};

// Function to register a user to an event
const registerUserToEvent = async (eventId, userId) => {
  try {
    const response = await axios.post(`${apiUrl}/events/${eventId}/register`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error registering user to event:', error.message);
    return null;
  }
};

// Function to unregister a user from an event
const unregisterUserFromEvent = async (eventId, userId) => {
  try {
    const response = await axios.post(`${apiUrl}/events/${eventId}/unregister`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error unregistering user from event:', error.message);
    return null;
  }
};

// Function to create a new user
const createUser = async (name) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.message);
    return null;
  }
};

// Function to get all users
const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
};

module.exports = {
  getPublicEvents,
  getEventDetails,
  createEvent,
  updateEvent,
  registerUserToEvent,
  unregisterUserFromEvent,
  createUser,
  getUsers,
};
