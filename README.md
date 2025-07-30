📝 MERN Stack ToDo Application



A simple and efficient ToDo web app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates full-stack development skills — including authentication, task management, and modern frontend design.

🚀 Features
🔐 User Authentication (Sign Up & Login) using JWT and bcrypt

✅ Full CRUD Operations: Create, Read, Update, Delete daily tasks

🕹️ Mark Tasks as Complete/Incomplete

💾 Persistent Storage with MongoDB Atlas

🌐 RESTful API built with Express.js & Node.js

⚛️ Frontend with React.js

🎨 Styled using Tailwind CSS

📦 State Management using React's built-in hooks

📁 Project Structure
mern-todo/


├── client/ # React Frontend

│ ├── src/

│ └── ...

├── server/ # Node + Express Backend

│ ├── models/

│ ├── routes/

│ └── ...

├── package.json # Main config

└── README.md # You're here!

Installation & Setup
1. Clone the repository
git clone https://github.com/SanketMishra-7/mern-todo.git
cd mern-todo

2. Backend Setup
cd server
npm install

Then create a .env file inside the server folder and add the following:
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_jwt_secret

To run backend:
npx nodemon server.js

3. Frontend Setup
cd client
npm install
npm start

Author
Made by Sanket Mishra

📃 License
This project is open-source and free to use.
