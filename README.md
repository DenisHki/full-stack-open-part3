# Full Stack Open — Part 3: Phonebook Backend

This repository contains my implementation of **Part 3** of the University of Helsinki’s **Full Stack Open** course.  
Part 3 focuses on building and deploying a backend service using Node.js and Express, integrating it with a MongoDB database, and connecting it to the frontend Phonebook application.

This backend is deployed and publicly accessible.

---

## 🌐 Live Application

**Phonebook App (Frontend + Backend):**  
https://full-stack-open-part3-u6p2.onrender.com/

---

## 📚 Part Overview

Part 3 covers the fundamentals of backend development:

- Building a REST API with Express  
- Structuring a Node.js server  
- Connecting to MongoDB using Mongoose  
- Handling environment variables  
- Implementing CRUD operations  
- Error handling and middleware  
- Deploying a full‑stack application  
- Working with production builds  

This repository contains the backend code that powers the Phonebook application.

---

## 📂 Project Structure

- **index.js** – main server file  
- **package.json** – project metadata and dependencies  
- **.env** – environment variables  
- **build/** – production frontend build  
- **models/person.js** – Mongoose model  


---

## 🚀 Running the Project Locally

### 1. Install dependencies
npm install


### 2. Set up environment variables

Create a `.env` file:
MONGODB_URI=your_mongodb_connection_string
PORT=3001


### 3. Start the server
npm start

The server will run at:
http://localhost:3001


---

## 🔌 API Endpoints

### Get a single person
GET /api/persons/:id

### Get all persons
GET /api/persons

### Add a new person
POST /api/persons

### Delete a person
DELETE /api/persons/:id


---

## 🧰 Technologies Used

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- dotenv  
- Render (deployment)  

---

## 📝 Notes

- This backend is designed to work with the Phonebook frontend from **Part 2**.  
- The `build/` folder contains the production build of the frontend.  
- The project is deployed on Render, and the API is publicly accessible.

---

## 📜 Course

This project is part of the **Full Stack Open** course by the University of Helsinki.


