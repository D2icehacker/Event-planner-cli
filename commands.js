const inquirer = require('inquirer');

// Arrays to hold event and user data
let events = [];
let users = [];

// List all public events
async function listEvents() {
  console.log("\nListing Public Events:");
  const publicEvents = events.filter(event => event.public);
  if (publicEvents.length === 0) {
    console.log("No public events available.");
  } else {
    publicEvents.forEach(event => {
      console.log(`- ${event.name} (ID: ${event.id})`);
    });
  }
}

// View details of a specific event
async function viewEvent(eventId) {
  const event = events.find(event => event.id === eventId);
  if (!event) {
    console.log("Event not found!");
    return;
  }

  console.log("\nEvent Details:");
  console.log(`ID: ${event.id}`);
  console.log(`Name: ${event.name}`);
  console.log(`Description: ${event.description}`);
  console.log(`Public: ${event.public ? 'Yes' : 'No'}`);

  // Display users assigned to the event
  console.log("\nUsers Assigned:");
  if (event.users.length > 0) {
    event.users.forEach(user => {
      console.log(`- ${user.name} (ID: ${user.id})`);
    });
  } else {
    console.log("No users have registered for this event yet.");
  }
}

// Create a new event
async function createEvent() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the event name:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter the event description:',
    },
    {
      type: 'confirm',
      name: 'public',
      message: 'Should the event be public?',
      default: true,
    },
  ]);

  // Generate a new event ID (simple approach using length)
  const newEventId = (events.length + 1).toString();
  const newEvent = {
    id: newEventId,
    name: answers.name,
    description: answers.description,
    public: answers.public,
    users: [],
  };

  events.push(newEvent);
  console.log(`\nEvent "${newEvent.name}" created successfully.`);
}

// Register a user to an event
async function registerUser() {
  if (users.length === 0 || events.length === 0) {
    console.log("\nPlease add users or events first.");
    return;
  }

  const eventChoices = events.map(event => ({
    name: event.name,
    value: event.id,
  }));

  const userChoices = users.map(user => ({
    name: user.name,
    value: user.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'eventId',
      message: 'Select an event to register a user:',
      choices: eventChoices,
    },
    {
      type: 'list',
      name: 'userId',
      message: 'Select a user to register:',
      choices: userChoices,
    },
  ]);

  const event = events.find(event => event.id === answers.eventId);
  const user = users.find(user => user.id === answers.userId);

  if (!event || !user) {
    console.log("Event or User not found!");
    return;
  }

  // Check if the user is already registered for the event
  if (event.users.find(u => u.id === user.id)) {
    console.log(`${user.name} is already registered for the event "${event.name}".`);
    return;
  }

  // Register the user to the event
  event.users.push(user);
  console.log(`${user.name} has been successfully registered for the event "${event.name}".`);
}

// Unregister a user from an event
async function unregisterUser() {
  if (users.length === 0 || events.length === 0) {
    console.log("\nPlease add users or events first.");
    return;
  }

  const eventChoices = events.map(event => ({
    name: event.name,
    value: event.id,
  }));

  const userChoices = users.map(user => ({
    name: user.name,
    value: user.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'eventId',
      message: 'Select an event to unregister a user from:',
      choices: eventChoices,
    },
    {
      type: 'list',
      name: 'userId',
      message: 'Select a user to unregister:',
      choices: userChoices,
    },
  ]);

  const event = events.find(event => event.id === answers.eventId);
  const user = users.find(user => user.id === answers.userId);

  if (!event || !user) {
    console.log("Event or User not found!");
    return;
  }

  // Check if the user is registered
  const userIndex = event.users.findIndex(u => u.id === user.id);
  if (userIndex === -1) {
    console.log(`${user.name} is not registered for the event "${event.name}".`);
    return;
  }

  // Unregister the user from the event
  event.users.splice(userIndex, 1);
  console.log(`${user.name} has been successfully unregistered from the event "${event.name}".`);
}

// Add a new user
async function addUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the user name:',
    },
  ]);

  const newUserId = (users.length + 1).toString();
  const newUser = {
    id: newUserId,
    name: answers.name,
  };

  users.push(newUser);
  console.log(`\nUser "${newUser.name}" added successfully.`);
}

// Export the functions
module.exports = {
  listEvents,
  viewEvent,
  createEvent,
  registerUser,
  unregisterUser,
  addUser
};
