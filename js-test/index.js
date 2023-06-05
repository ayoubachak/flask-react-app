const axios = require('axios');

// // Get all users
axios.get('http://127.0.0.1:5000/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// // Create a new user
// const newUser = { name: 'John Doe' };

// axios.post('http://127.0.0.1:5000/users', newUser)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Update a user with a specific ID
// const updatedUser = { name: 'Updated Name' };
// const userId = 123; // Replace with the actual user ID

// axios.put(`http://127.0.0.1:5000/users/${userId}`, updatedUser)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Delete a user with a specific ID
// const userIdToDelete = 1; // Replace with the actual user ID

// axios.delete(`http://127.0.0.1:5000/users/${userIdToDelete}`)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
