# 👣 Footprint Logger Platform

**ECO-TRACK** is a web application designed to help individuals track their daily carbon footprint and make informed decisions to reduce their environmental impact. By logging everyday activities such as transport, diet, and energy consumption, users can visualize their contribution to climate change and receive personalized tips for a more sustainable lifestyle.

## 🚀 Features

- **User Authentication**: Secure registration and login system.
- **Activity Logging**: Track daily activities across multiple categories (Transport, Diet, Energy).
- **Data Visualization**: View your carbon footprint with interactive charts and summaries.
- **Personalized Tips**: Receive actionable advice to reduce your environmental impact.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React
- **Styling**: Bootstrap
- **Icons**: Font-Awesome, Bootsrap icons
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## 📂 Project Structure

```
footprint-logger/
├── back-end/             # Node.js & Express API
│   ├── models/           # Mongoose Schemas (User, FootprintLog)
│   ├── routes/           # API Routes (Auth, Logs)
│   ├── app.js            # Express Application Entry Point
│   └── package.json      # Backend Dependencies
│
├── front-end/            # React Application
│   ├── src/
│   │   ├── components/   # Reusable UI Components
│   │   ├── pages/        # Page Components (Landing)
│   │   ├── services/     # API Service Layer
│   │   ├── App.js       # Main App Component
│   │   └── index.css     # Global Styles
│   └── package.json      # Frontend Dependencies
│
└── README.md             # Project Documentation
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd footprint-logger
    ```

2.  **Backend Setup**
    ```bash
    cd back-end
    npm install
    ```

3.  **Frontend Setup**
    ```bash
    cd ../front-end
    npm install
    ```

### Running the Application

1.  **Start the Backend**
    Open a terminal, navigate to `back-end`, and run:
    ```bash
    node app.js
    ```
    The server will start on `http://localhost:3060`.

2.  **Start the Frontend**
    Open a **new** terminal, navigate to `front-end`, and run:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT token

#### Landing page
<img width="1695" height="907" alt="image" src="https://github.com/user-attachments/assets/2591d371-e921-42f8-a68b-bdcedc2d47d0" />

#### Login Page
<img width="1695" height="907" alt="image" src="https://github.com/user-attachments/assets/00ee29be-28d6-44f8-9e4f-f8e589f51207" />


