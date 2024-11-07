# 📓 Pocket Notes App
A mobile-responsive, full-stack notes application built with React, Node.js, Express.js, and MongoDB. The Pocket Notes App offers a secure and organized way for users to manage their notes on the go with a robust authentication system and RESTful API practices. The app is deployed on Render, with the frontend and backend services hosted separately.

# 🚀 Live Demo
Check out the live demo here: Pocket Notes App on Render

# 📸 Screenshots
**Login Screen:**


**Main Screen**


# 🌟 Features
**Mobile-Responsive Design:** A seamless experience across devices, with a focus on mobile usability.

**Authentication:** Implements secure login with an access and refresh token system for optimal session management.

**Data Persistence:** Uses MongoDB to store and manage user notes efficiently.

**RESTful API:** Backend structured for reusability, allowing easy integration with other authentication-based applications.

**MongoDB Aggregation Pipelines:** Efficiently filters and processes data, enhancing performance.

# 🛠️ Technologies Used
**Frontend:** React.js for a responsive and dynamic user interface.

**Backend:** Node.js, Express.js for building a RESTful API with reusable authentication.

**Database:** MongoDB with aggregation pipelines for efficient data filtering.

**Authentication:** Access and refresh tokens for secure, persistent sessions.

**Deployment:** Hosted separately on Render.com for both frontend and backend.

# 🧠 What I Learned
This project enhanced my understanding of:

**Token-Based Authentication:** Secure session handling with access and refresh tokens for a smooth user experience.

**MongoDB Aggregation Pipelines:** Leveraging MongoDB’s powerful aggregation framework for efficient data queries and filtering.

**RESTful API Design:** Crafting modular backend services that are easily reusable in various applications.

**Full-Stack Deployment:** Separately deploying frontend and backend services and managing inter-service communication on Render.com.

# 🚀 Getting Started
Clone the Repository:

bash
Copy code
git clone https://github.com/Sushanth-Personal/Pocket-Notes-App.git
Install Dependencies:

bash
Copy code
cd Pocket-Notes-App

Start the Server:

bash
Copy code
# Start Backend
cd backend
npm run start
Launch Frontend:

bash
Copy code
# Start Frontend
cd frontend
npm start
Open your browser to http://localhost:3000 and start using Pocket Notes App!

💡 Challenges and Solutions
Token Expiry Management: Ensured seamless reauthentication by implementing a refresh token system, allowing users to stay logged in without frequent logins.

Efficient Data Querying: Used MongoDB aggregation pipelines to filter and retrieve notes quickly, handling large data volumes effectively.
