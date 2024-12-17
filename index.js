#!/usr/bin/env node

const { Command } = require('commander');
const {
  getPublicEvents,
  getEventDetails,
  registerUserToEvent,
  unregisterUserFromEvent,
  createEvent,
  updateEvent,
  createUser,
  getUsers,
} = require('./api'); // Import functions from api.js

const program = new Command();

program.version('1.0.0').description('Event Management CLI');

// Command to list all public events
program
  .command('list')
  .description('List all public events')
  .action(async () => {
    const events = await getPublicEvents();
    if (events.length === 0) {
      console.log('No public events available.');
    } else {
      events.forEach((event) => {
        console.log(`ID: ${event.id}`);
        console.log(`Name: ${event.name}`);
        console.log(`Description: ${event.description}`);
        console.log(`Public: ${event.public ? 'Yes' : 'No'}`);
        console.log('---');
      });
    }
  });

// Command to view details of a specific event
program
  .command('view <eventId>')
  .description('View details of a specific event')
  .action(async (eventId) => {
    const event = await getEventDetails(eventId);
    if (event) {
      console.log('Event Details:');
      console.log(`ID: ${event.id}`);
      console.log(`Name: ${event.name}`);
      console.log(`Description: ${event.description}`);
      console.log(`Public: ${event.public ? 'Yes' : 'No'}`);

      // Display users assigned to this event
      console.log('\nUsers:');
      if (event.users && event.users.length > 0) {
        event.users.forEach((user) => {
          console.log(`- ${user.name} (ID: ${user.id})`);
        });
      } else {
        console.log('No users have registered for this event yet.');
      }
    } else {
      console.log('Event not found.');
    }
  });

// Command to register a user to an event
program
  .command('register <eventId> <userId>')
  .description('Register a user for an event')
  .action(async (eventId, userId) => {
    const result = await registerUserToEvent(eventId, userId);
    if (result) {
      console.log(result.message);
    } else {
      console.log('Failed to register user.');
    }
  });

// Command to unregister a user from an event
program
  .command('unregister <eventId> <userId>')
  .description('Unregister a user from an event')
  .action(async (eventId, userId) => {
    const result = await unregisterUserFromEvent(eventId, userId);
    if (result) {
      console.log(result.message);
    } else {
      console.log('Failed to unregister user.');
    }
  });

// Command to create a new event
program
  .command('create <name> <description> <public>')
  .description('Create a new event')
  .action(async (name, description, public) => {
    const event = await createEvent(name, description, public === 'true');
    if (event) {
      console.log('Event created successfully.');
      console.log(`ID: ${event.id}`);
      console.log(`Name: ${event.name}`);
    } else {
      console.log('Failed to create event.');
    }
  });

// Command to update an event
program
  .command('update <eventId> <name> <description> <public>')
  .description('Update an existing event')
  .action(async (eventId, name, description, public) => {
    const event = await updateEvent(eventId, name, description, public === 'true');
    if (event) {
      console.log('Event updated successfully.');
      console.log(`ID: ${event.id}`);
      console.log(`Name: ${event.name}`);
    } else {
      console.log('Failed to update event.');
    }
  });

// Command to create a new user
program
  .command('create-user <name>')
  .description('Create a new user')
  .action(async (name) => {
    const user = await createUser(name);
    if (user) {
      console.log('User created successfully.');
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.name}`);
    } else {
      console.log('Failed to create user.');
    }
  });

// Command to list all users
program
  .command('list-users')
  .description('List all users')
  .action(async () => {
    const users = await getUsers();
    if (users.length === 0) {
      console.log('No users found.');
    } else {
      users.forEach((user) => {
        console.log(`ID: ${user.id}`);
        console.log(`Name: ${user.name}`);
        console.log('---');
      });
    }
  });

// Parse the CLI arguments
program.parse(process.argv);
