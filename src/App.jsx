// Import the core React library and the useState hook
import React, { useState } from 'react'; 
// Import the Firestore database instance (`db`) that we configured in firebaseConfig.js
import { db } from './firebaseConfig ';
// Import the necessary Firestore functions to interact with the database
import { collection, addDoc } from 'firebase/firestore';

const App = () => {
  // State variables to store the values from the form inputs
// `name` will hold the name input, `setName` is the function to update it
const [name, setName] = useState(''); 

// `email` will hold the email input, `setEmail` is the function to update it
const [email, setEmail] = useState(''); 

// `message` will hold the message input, `setMessage` is the function to update it
const [message, setMessage] = useState(''); 

// Function to handle the form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior, which would cause the page to reload

  try {
    // Attempt to add a new document to the Firestore collection named "records"
    // The document will contain the `name`, `email`, and `message` fields, populated with the current state values
    const docRef = await addDoc(collection(db, "records"), {
      name: name,       // The 'name' field in Firestore will be set to the current value of the `name` state
      email: email,     // The 'email' field in Firestore will be set to the current value of the `email` state
      message: message, // The 'message' field in Firestore will be set to the current value of the `message` state
    });

    // If the document is successfully added, log the document's ID to the console
    alert("Data send succesfully");
  } catch (e) {
    // If there's an error while adding the document, log the error to the console
    alert("Error adding document");
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className='my-5 font-bold text-xl'>Form data</h1>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
      ></textarea>
    </div>
    
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </div>
  </form>
  
  );
};

export default App;
