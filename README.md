# BillSplit Dashboard

## Overview
The **BillSplit Dashboard** is a full-stack web application designed for managing shared expenses among friends and family. Users can create expense groups, track expenses, settle balances, and view recent activities in an intuitive and user-friendly interface built with **React** and **Tailwind CSS**. 

### Key Features
- **User Authentication**: Secure login and logout functionality.
- **Dashboard Overview**: A central place to see group expenses and balances.
- **Group Management**: Create and manage expense groups.
- **Expense Tracking**: Add expenses with options for splitting them equally or manually among group members.
- **Settle Balances**: Easily view and settle up balances with group members.
- **Recent Activities**: Track recent transactions in a dedicated section.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **MongoDB**: You can use MongoDB Atlas for a cloud database or install it locally. [Get MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/AshishGupta18/BillSplit.git

2.	**Navigate to the project directory:**   
```bash
cd BillSplit
	
3.	**Install dependencies for both frontend and backend:**   

```bash
Install dependencies for both frontend and backend:


Running the Application

	1.	Start the backend server:
	•	Navigate to the backend directory and start the server:

 ```
 cd backend
npm start  ``` 

Ensure you have a .env file in the backend directory to configure your MongoDB connection string and JWT secret.

2.	Start the frontend application:
	•	Navigate to the frontend directory and start the React application:
```
cd ../frontend
npm start```

3.	Open your browser and go to http://localhost:5173 to view the application.

Usage

User Authentication

	•	Login: Use the provided credentials to log in. (Set up dummy credentials for testing purposes).
	•	Logout: Click the “Logout” button in the navbar to exit your session.

Dashboard

	•	Upon logging in, you’ll be taken to the Dashboard Overview, which provides a summary of your groups and recent activities.

Managing Groups

	•	Create a New Group: Use the sidebar to create a new expense group.
	•	Select a Group: Click on a group name in the sidebar to view its details and associated expenses.

Adding Expenses

	•	Add Expense Button: Click on the “Add Expense” button to open the form.
	•	Expense Form: Enter a description, amount, and select how to split the expense. You can choose to split it equally or manually select members to contribute.
	•	Submit: Click “Add Expense” to record the expense for the selected group.

Settling Balances

	•	Settle Up: Click the “Settle Up” button to view current balances with other group members.
	•	Settling: Click the “Settle” button next to a member’s name to confirm the transaction.

Recent Activities

	•	View Recent Activities: Toggle the recent activities section to see a history of your transactions.

Contributing

Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.

Issues

If you encounter any issues while using the application, feel free to report them on the GitHub repository.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Author

Ashish Gupta


