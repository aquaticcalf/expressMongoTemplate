# Express MongoDB Atlas Template

A ready-to-use template for building Express.js applications with MongoDB Atlas integration.

## Features

- Express.js server setup
- MongoDB Atlas connection
- Environment variables configuration
- CORS support
- Basic API structure

## Project Structure

- `app.js` - Express application setup and middleware configuration
- `config.js` - Application configuration including port and MongoDB connection URL
- `index.js` - Server entry point and database connection
- `.env` - Environment variables (not included in git)
- `.gitignore` - Files and directories ignored by git

## Setup Instructions

1. Clone this repository
2. Install dependencies
    ```
    npm install
    ```
3. Create a `.env` file in the root directory with the following content:
    ```
    MONGO_NAME=your_mongo_username
    MONGO_PASSWORD=your_mongo_password
    ```
4. Update the MongoDB connection URL in `config.js` with your cluster and database name:
    ```javascript
    const mongoDBURL = "mongodb+srv://"+process.env.MONGO_NAME+":"+process.env.MONGO_PASSWORD+"@<cluster>/<dbname>?retryWrites=true&w=majority";
    ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

## API Endpoints

- `GET /` - Basic endpoint that returns a working message

## Environment Variables

The application uses the following environment variables that should be stored in a `.env` file:

- `MONGO_NAME` - Your MongoDB Atlas username
- `MONGO_PASSWORD` - Your MongoDB Atlas password

**Important:** Never commit your `.env` file to version control. It contains sensitive information like database credentials.

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- dotenv - Environment variable management
- cors - Cross-Origin Resource Sharing support
- nodemon - Development server with automatic reloading