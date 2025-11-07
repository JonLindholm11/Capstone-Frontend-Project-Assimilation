// import { createContext, useContext, useState, useEffect } from 'react';

// creating context to share user data across components

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   // load users from localStorage or use defaults
//   // this way users persist even after page refresh
//   const [allUsers, setAllUsers] = useState(() => {
//     const savedUsers = localStorage.getItem('allUsers');
//     if (savedUsers) {
//       return JSON.parse(savedUsers);
//     }
//     // default users if nothing in localStorage
//     return [
//       { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', password: 'password123' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', password: 'password123' },
//       { id: 3, name: 'Jodson Cadet', email: 'jodson@example.com', role: 'manager', password: 'password123' },
//       { id: 4, name: 'Jon Linholm', email: 'jon@example.com', role: 'admin', password: 'password123' },
//       { id: 5, name: 'Jacob Sonsini', email: 'jacob@example.com', role: 'salesman', password: 'password123' },
//       { id: 6, name: 'Jose Pando', email: 'jose@example.com', role: 'salesman', password: 'password123' },
//       { id: 7, name: 'Daniel Bistel', email: 'daniel@example.com', role: 'salesman', password: 'password123' }
//     ];
//   });

//   // save to localStorage whenever users change
  
//   useEffect(() => {
//     localStorage.setItem('allUsers', JSON.stringify(allUsers));
//     console.log('users saved to localStorage');
//   }, [allUsers]);

//   // function to add new user (for registration)
//   const addUser = (newUser) => {
//     setAllUsers([...allUsers, newUser]);
//     console.log('new user added:', newUser);
//   };

//   // function to update users (for admin panel)
//   const updateUsers = (updatedUsers) => {
//     setAllUsers(updatedUsers);
//   };

//   // find user by email (for login)
//   const findUserByEmail = (email) => {
//     return allUsers.find(u => u.email === email);
//   };

//   // check if email already exists (for registration)
//   const emailExists = (email) => {
//     return allUsers.some(u => u.email === email);
//   };

//   return (
//     <UserContext.Provider value={{
//       allUsers,
//       addUser,
//       updateUsers,
//       findUserByEmail,
//       emailExists
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// // custom hook to use the context
// export function useUsers() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUsers must be used within UserProvider');
//   }
//   return context;
// }