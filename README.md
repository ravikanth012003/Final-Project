# Cricket Team Management System

A full-stack web application for managing cricket team players. This application allows you to perform CRUD operations (Create, Read, Update, Delete) on player records, including their personal information and performance statistics.

## Features

- Add new players with details like name, role, batting average, bowling average, matches played, and age
- View all players in a tabular format
- Edit existing player information
- Delete players from the roster
- Responsive design for various screen sizes

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (for database)

## Project Structure

```
├── backend/         # Backend server files
├── frontend/        # React frontend application
└── README.md       # Project documentation
```

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5001
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

   The server will start running on http://localhost:5001

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The application will open in your default browser at http://localhost:3000

## Usage

### Adding a Player
1. Click the "+ Add Player" button
2. Fill in the player details in the modal form:
   - Name (required)
   - Role (required)
   - Batting Average (optional)
   - Bowling Average (optional)
   - Matches Played (required)
   - Age (required)
3. Click "Add Player" to save

### Editing a Player
1. Click the pencil (✏️) icon next to the player you want to edit
2. Modify the details in the modal form
3. Click "Update Player" to save changes

### Deleting a Player
1. Click the trash (🗑️) icon next to the player you want to remove
2. The player will be removed from the roster immediately

## API Endpoints

- `GET /api/players` - Get all players
- `POST /api/players` - Add a new player
- `PUT /api/players/:id` - Update a player
- `DELETE /api/players/:id` - Delete a player

## Technologies Used

### Frontend
- React.js
- CSS3 for styling
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin resource sharing

## Error Handling

The application includes error handling for:
- Failed API requests
- Invalid form submissions
- Database connection issues

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is licensed under the ISC License.