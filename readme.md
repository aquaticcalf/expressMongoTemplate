# Express MongoDB Atlas Template

A ready-to-use template for building Express.js applications with MongoDB Atlas integration.

## Features

- Express.js server setup
- MongoDB Atlas connection
- Environment variables configuration
- CORS support
- Basic API structure
- Session management with iron-session
- Basic authentication
- CRUD operations for `User` and `Post` models

## Project Structure

- `app.js` - Express application setup and middleware configuration
- `config.js` - Application configuration including port and MongoDB connection URL
- `index.js` - Server entry point and database connection
- `.env` - Environment variables (not included in git)
- `.gitignore` - Files and directories ignored by git
- `models/user.js` - User model for authentication
- `models/post.js` - Post model for blog posts
- `api/` - Directory containing API route handlers

## Setup Instructions

1. Clone this repository
2. Install dependencies
    ```
    npm install
    ```
3. Create a `.env` file in the root directory with the following content:
    ```
    PORT=5000
    MONGODB_URL=mongodb://localhost:27017/your_database_name
    SESSION_SECRET=your_session_secret
    FRONTEND_URL=http://localhost:3000
    NODE_ENV=development
    API_ROUTES_DIR=api
    ```
4. Start the application:
    - Development Mode:
        ```
        npm run dev
        ```
    - Production Mode:
        ```
        npm start
        ```

## API Endpoints

### Authentication
- **POST `/auth/register`** - Register a new user
- **POST `/auth/login`** - Log in a user
- **POST `/auth/logout`** - Log out the current user

### Users
- **GET `/users`** - Fetch all users
- **GET `/users/:userId`** - Fetch a specific user by ID
- **POST `/users/:userId`** - Update a specific user's details (requires authentication)

### Posts
- **POST `/posts/new`** - Create a new post (requires authentication)
- **GET `/posts/:postId`** - Fetch a specific post by ID
- **PUT `/posts/:postId`** - Update a specific post (requires authentication and ownership)
- **DELETE `/posts/:postId`** - Delete a specific post (requires authentication and ownership)

### Health Check
- **GET `/health`** - Check if the server is running

## Environment Variables

The application uses the following environment variables that should be stored in a `.env` file:

- `PORT` - Port number for the server
- `MONGODB_URL` - MongoDB connection URL
- `SESSION_SECRET` - Secret key for session management
- `FRONTEND_URL` - URL of the frontend application
- `NODE_ENV` - Environment mode (`development` or `production`)
- `API_ROUTES_DIR` - Directory containing API route handlers

**Important:** Never commit your `.env` file to version control. It contains sensitive information like database credentials.

## Session Management and Basic Authentication

The application uses `iron-session` for session management and includes basic authentication middleware.

Basic authentication is implemented as middleware in `app.js`.

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- dotenv - Environment variable management
- cors - Cross-Origin Resource Sharing support
- nodemon - Development server with automatic reloading
- iron-session - Session management
- bcrypt - Password hashing
- file-system-api-router - File based api wrapper for express