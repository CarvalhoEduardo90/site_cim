<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1s_wULMqyXpzHivfqkpynBh5QkkF4_MXB

## Run Locally

**Prerequisites:** Node.js

### 1. Backend Setup
The system now includes a backend for authentication and database.

1. Navigate to the backend folder:
   `cd backend`
2. Install dependencies:
   `npm install`
3. Start the server (runs on port 3001):
   `npm start`

### 2. Frontend Setup
1. Return to the root folder:
   `cd ..`
2. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`

### Database
The system uses SQLite. The database file `cim.db` will be automatically created in the `backend` folder upon first run.
Default Login:
- Email: `aluno@cim.com`
- Password: `123`

### 3. Docker Deployment (Production with MySQL)
To simulate the production environment with a MySQL database:

1. Ensure Docker Desktop is running.
2. Run the command:
   `docker-compose up --build`
3. The backend will automatically switch from SQLite to the MySQL container defined in `docker-compose.yml`.

**Note:** The MySQL database will start empty. The system is configured to auto-create tables on first run.
