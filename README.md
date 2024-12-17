# Event Management CLI

A Node.js Command Line Interface (CLI) tool for managing events, including listing, viewing, registering, and unregistering users to/from events. The tool interacts with a REST API to manage event data dynamically through terminal commands.

## Features

- **List all public events**
- **View details for a specific event**
- **Register or unregister a user to/from an event**
- **Error handling for failed API calls**

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js (v12 or above)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/D2icehacker/Event-planner-cli.git

## Usage

Start the server
The application requires a running API server. To start the server, navigate to the server.js file and run the following command:

node server.js
Make sure that the server is running before you interact with the CLI.

Available CLI commands
Once the server is running, you can use the CLI to interact with the system. The commands are as follows:

1. List all public events
This command will list all events marked as public.
node index.js list

2. View details for a specific event
To view the details of a specific event (replace <eventId> with the actual event ID):
node index.js view <eventId>
Example: node index.js view 1

3. Register a user for an event
To register a user for a specific event (replace <eventId> and <userId> with the actual event and user IDs):
node index.js register <eventId> <userId>
Example: node index.js register 1 1
This will add the user with ID 1 to the event with ID 1.

4. Unregister a user from an event
To unregister a user from a specific event (replace <eventId> and <userId> with the actual event and user IDs):
node index.js unregister <eventId> <userId>
Example:node index.js unregister 1 1

Explanation of index.js:
Command Setup: We use the commander package to define different commands for listing events, viewing event details, registering/unregistering users, creating/updating events, and managing users.

list Command: Lists all public events.

view <eventId> Command: Displays details of a specific event, including the users assigned to it.

register <eventId> <userId> Command: Registers a user for an event by their ID.

unregister <eventId> <userId> Command: Unregisters a user from an event by their ID.

create <name> <description> <public> Command: Creates a new event with the provided name, description, and public status.

update <eventId> <name> <description> <public> Command: Updates an existing event with new details.

create-user <name> Command: Creates a new user with the provided name.

list-users Command: Lists all users.

How to Run:
Start your server: Run node server.js to start the API server.

Run your CLI: Use the following commands to interact with the events and users:

List all public events: node index.js list

View details of a specific event: node index.js view 1

Register a user to an event: node index.js register 1 1

Unregister a user from an event: node index.js unregister 1 1

Create a new event: node index.js create "Node.js Workshop" "Learn Node.js" true

Update an event: node index.js update 1 "Updated Event Name" "Updated description" false

Create a new user: node index.js create-user "John Doe"

List all users: node index.js list-users

This will allow you to interact with your event planning system entirely from the command line!
