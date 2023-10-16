Here's a simple README for your project:

# Login Authentication Web Application

This is a basic web application for user login and registration with authentication features. It allows users to register, log in, and view their profile page. Users can log out individually or log out from all devices.

## Features

- User registration with password hashing for security.
- User login with authentication using JSON Web Tokens (JWT).
- User profile page for authenticated users.
- User logout and "Log out from all devices" functionality.

## Technologies Used

- **Node.js:** Backend JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database used for storing user information.
- **Mongoose:** ODM library for MongoDB.
- **Bcrypt.js:** Library for hashing and comparing passwords.
- **JSON Web Tokens (JWT):** Used for user authentication.
- **Handlebars (hbs):** Template engine for rendering HTML templates.
- **Bootstrap:** Front-end framework for responsive web design.
- **Cookie-parser:** Middleware for working with cookies.
- **dotenv:** Library for managing environment variables.

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`
4. Create a `.env` file and set the following environment variables:
   - `PORT` (Port number for the web server)
   - `SECRET_KEY` (Secret key for JWT)
   - `MONGODB_URI` (MongoDB connection string)
5. Start the application: `npm start`

## Usage

1. Register a new user account by providing a name, email, and password.
2. Log in with your registered email and password.
3. After logging in, you will be redirected to your profile page.
4. You can log out from the current device or log out from all devices.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

