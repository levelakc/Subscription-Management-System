# Full-Stack Subscription Management System

## Project Overview

The **Subscription Management System** is a full-stack web application built to manage memberships and movie subscriptions. It allows users to perform CRUD operations on members, movies, and subscriptions. The app features user authentication, a responsive design, and interactive subscription management.

The frontend is built with **React** and **Redux** for state management, while the backend is powered by **Node.js** and **Express.js**, with **MongoDB** as the database. The app demonstrates a full lifecycle of application development, from data handling to UI rendering.

### Features:
- **User Authentication**: Secure login and logout functionality.
- **Movie Management**: Add, edit, delete, and view movie details.
- **Member Management**: Manage members' information including email and city.
- **Subscription Management**: Track members' movie subscriptions with date functionality.
- **RESTful APIs**: Backend APIs built using Node.js and Express.js.
- **Responsive UI**: Mobile-friendly and accessible design using modern CSS.

---

## Tech Stack

### Front-End:
- **React**: JavaScript library for building user interfaces.
- **Redux**: State management for React applications.
- **CSS/Bootstrap**: For styling and responsive design.

### Back-End:
- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Lightweight framework for creating server-side APIs.
- **MongoDB**: NoSQL database for storing user, movie, and subscription data.

### Other Tools:
- **Axios**: For making HTTP requests to the backend.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT (JSON Web Token)**: For secure user authentication.

---

## Installation and Setup

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (for running the server and client)
MongoDB (for the database)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/levelakc/Subscription-Management-System.git
cd Subscription-Management-System
Install server dependencies: Navigate to the server directory and install the required packages:

bash
Copy code
cd server
npm install
Setup your MongoDB Database: Make sure your MongoDB server is running. You can use MongoDB Atlas for cloud hosting or run it locally.

Seed the database (Optional): If you want to populate your database with initial data, there is a seed file included in the project. You can run the seed script with the following command:

bash
Copy code
node seedDatabase.js
This script will populate your database with sample data for movies, members, and subscriptions. Ensure to review and modify the seed data as needed.

Start the server: After installing the dependencies, you can start your Express server:

bash
Copy code
npm start
Navigate to the client directory: Open a new terminal window and navigate back to the main project directory:

bash
Copy code
cd client
Install client dependencies: Run the following command to install the client-side packages:

bash
Copy code
npm install
Start the client: Finally, start the React application:

bash
Copy code
npm start
Accessing the Application
Once both the client and server are running, you can access the application in your web browser at http://localhost:3000 for the client and http://localhost:8000 for the server.

Conclusion
This Subscription Management System provides a comprehensive solution for managing movie subscriptions. Feel free to contribute and enhance the project further!

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/levelakc/Subscription-Management-System.git
   cd Subscription-Management-System
