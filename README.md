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

### Prerequisites
Before you begin, ensure you have the following installed on your machine:

- **Node.js** (for running the server and client)
- **MongoDB** (for the database)

### Steps

1. **Clone the repository and run npm start**:
   ```bash
   git clone https://github.com/levelakc/Subscription-Management-System.git
   cd Subscription-Management-System
   # in client folder
   cd client
   npm start
   # in server folder
   cd server
   node index.js
