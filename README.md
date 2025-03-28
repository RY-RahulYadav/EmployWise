# EmployWise - User Management Application

EmployWise is a React-based user management application that integrates with the [Reqres API](https://reqres.in/) to perform basic user management functions. The application is designed to be user-friendly, responsive, and feature-rich, making it ideal for managing users efficiently.

## 🌟 Features

### Level 1: Authentication
- **Login Screen**: Users can log in using their credentials.
- **API Integration**: Uses the `/api/login` endpoint for authentication.
- **Token Storage**: Stores the token in local storage for session persistence.
- **Redirect**: Navigates to the User List page upon successful login.

### Level 2: User List
- **Paginated User List**: Displays a paginated list of users fetched from the `/api/users` endpoint.
- **User Details**: Shows the user's first name, last name, and avatar in a card layout.
- **Pagination**: Allows navigation through different pages of users.

### Level 3: Edit, Delete, and Update Users
- **Edit User**: 
  - Opens a pre-filled form to update user details (first name, last name, and email).
  - Updates user data using the `/api/users/{id}` endpoint.
- **Delete User**: 
  - Removes a user from the list using the `/api/users/{id}` endpoint.
  - Adjusts pagination dynamically after deletion.
- **Success/Error Messages**: Displays appropriate messages for each operation.

### Bonus Features
- **Search and Filter**: Allows client-side search and filtering of users.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **React Router**: Enables smooth navigation between pages (Login, User List, Edit User).

---

## 🚀 Deployment

The application is deployed on **Vercel**. You can access it here: [EmployWise Live Demo](https://employ-wise-lake.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Build Tool**: Vite
- **Deployment**: Vercel

---

## 📦 Installation and Setup

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RY-RahulYadav/EmployWise.git
   cd employwise
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the Application**:
   Visit `https://employ-wise-lake.vercel.app/` in your browser.

---

## 📖 API Endpoints

### Authentication
- **POST** `/api/login`
  - **Body**: `{ email: "eve.holt@reqres.in", password: "cityslicka" }`
  - **Response**: `{ token: "QpwL5tke4Pnpja7X4" }`

### User Management
- **GET** `/api/users?page=1`: Fetch paginated user data.
- **PUT** `/api/users/{id}`: Update user details.
- **DELETE** `/api/users/{id}`: Delete a user.

---

## 📋 Rules and Guidelines

1. **Framework**: React is used as the frontend framework.
2. **UI**: Tailwind CSS ensures a responsive and modern design.
3. **Error Handling**: Graceful handling of API errors with user-friendly messages.
4. **Persistence**: Login token is stored in local storage for session management.
5. **Code Quality**: Clean, modular, and well-documented code.

---

## 🏆 Bonus Points

- **Search and Filter**: Implemented client-side search functionality.
- **Hosting**: Deployed on Vercel for easy access.
- **React Router**: Used for navigation between pages.

---

## 📂 Project Structure

```
User Management/
├── src/
│   ├── pages/          # React components for pages (Login, UserList, EditUser)
│   ├── services/       # API service functions
│   ├── context/        # Context API for authentication
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   ├── index.css       # Tailwind CSS setup
├── public/             # Static assets
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

---

## 📜 Assumptions and Considerations

- The application assumes the API endpoints provided by Reqres are functional and return valid responses.
- The token is stored in local storage for simplicity; additional security measures can be implemented for production use.



## 🤝 Contribution

Feel free to fork the repository and submit pull requests for improvements or bug fixes.

---

## 📧 Contact

For any queries, reach out to [ry.rahul036@gmail.com](mailto:ry.rahul036@gmail.com).
