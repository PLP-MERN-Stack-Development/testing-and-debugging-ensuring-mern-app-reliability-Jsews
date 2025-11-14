# MERN Bug Tracker — Week 6 Testing & Debugging Assignment

This project implements a complete **MERN application** with:

- Unit testing  
- Integration testing  
- End-to-end testing  
- Debugging tools  
- Error handling  
- React Error Boundaries  
- MongoDB Memory Server  

---

# 🚀 Features

### Users can:
- Report new bugs  
- View all bugs  
- Update bug status  
- Delete bugs  

---

# 🗂 Project Structure


```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```


---

# ⚙️ Installation

### 1. Clone repository  
bash
git clone <https://github.com/PLP-MERN-Stack-Development/testing-and-debugging-ensuring-mern-app-reliability-Jsews.git>
cd mern-bug-tracker

2. Install backend
cd server
npm install

3. Install frontend
cd ../client
npm install

▶️ Running the Application
Start server
cd server
npm run dev

Start client
cd client
npm start

🧪 Running Tests
Server Tests

Uses Jest + Supertest + MongoMemoryServer:

cd server
npm test

Client Tests

Uses Jest + React Testing Library:

cd client
npm test

End-to-End Tests 
cd client
npx cypress open

🐞 Debugging Tools
Frontend:

Chrome DevTools

React DevTools

Console logging

React Error Boundary (included)

Backend:

Node.js Inspector

node --inspect src/server.js


VS Code debugger

Console logs in controllers

Express error handler

🛡 Error Handling
Backend:

Located in:

server/src/middleware/errorHandler.js

Frontend:

Global React Error Boundary:

client/src/components/ErrorBoundary.jsx

📝 Testing Coverage

You must include:

Backend: Unit + integration tests

Frontend: Unit + integration tests

Minimum 70% coverage

Generate coverage:

Server:
npm test -- --coverage

Client:
npm test -- --coverage

📸 Include Screenshots

Add screenshots of:

Passing test cases

Debugging in DevTools or inspector

✅ Submission

Commit and push everything:

git add .
git commit -m "Completed Week 6: Testing and Debugging MERN Application"
git push

Author

Janice Tusiime Sewava